/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feather } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  FavouriteIcon,
  Pressable,
  useToast,
} from 'native-base';
import { FunctionComponent, useState } from 'react';
import { Share } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';

import { ConditionallyRender } from '../ConditionallyRender';
import { PostEdit } from './PostEdit';
import { PostMoreActions } from './PostMoreActions';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { Like } from '@src/contracts/Like';
import type { Post as PostData } from '@src/contracts/Post';
import { useAuth } from '@src/hooks/useAuth';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { formatDateSocialMedia } from '@src/utils/time';

export type UserHasLiked = {
  likes: { id: string }[];
};

export type UserHasCommented = {
  comments: { id: string }[];
};

export type UserHasInteracted = UserHasLiked & UserHasCommented;

export type PostProps = {
  post: IncludeInto<PostData, UserHasInteracted>;
  isPreview?: boolean;
  onDeletedPost?: () => void;
};

export const Post: FunctionComponent<PostProps> = ({
  post,
  isPreview,
  onDeletedPost,
}) => {
  const { user } = useAuth();
  const linkTo = useLinkTo();

  const onSuccessToggleLike = async (data: Like) => {
    const post = await diversaGenteServices.findPostById(data.postId);

    queryClient.invalidateQueries(['diversagente@posts']);
    queryClient.invalidateQueries(['diversagente@post']);
    queryClient.invalidateQueries(['diversagente@likes', post.id]);
    queryClient.setQueryData(['diversagente@posts', post.id], post);
  };

  const mutationCreateLike = useMutation(diversaGenteServices.createLike, {
    onSuccess: onSuccessToggleLike,
  });
  const mutationDeleteLike = useMutation(diversaGenteServices.deleteLike, {
    onSuccess: onSuccessToggleLike,
  });

  const [isEditModeActive, setIsEditModeActive] = useState(false);

  const isOwner = user?.id === post.owner.id;
  const isLiking = mutationCreateLike.isLoading || mutationDeleteLike.isLoading;
  const hasLiked = post.likes.length > 0;

  const userInitials = getUsernameInitials(post.owner.username);
  const contentPreview = post.content.slice(0, 255);

  const formattedCreatedAtDate =
    post.createdAt !== post.updatedAt
      ? formatDateSocialMedia(post.updatedAt) + ' (editado)'
      : formatDateSocialMedia(post.createdAt);

  const handleActivePostEditMode = () => {
    setIsEditModeActive(true);
  };

  const handleDeactivatePostEditMode = () => {
    setIsEditModeActive(false);
  };

  const handleTogglePostLike = async () => {
    try {
      if (!hasLiked) {
        await mutationCreateLike.mutateAsync({
          postId: post.id,
          ownerId: String(user?.id),
        });
      } else {
        await mutationDeleteLike.mutateAsync({
          postId: post.id,
          likeId: post.likes[0]?.id,
        });
      }
    } catch (error) {
      console.error('error when toggling post like');
      console.error(error);
    }
  };

  const handleNavigateToPostDetails = () => {
    linkTo(`/posts/${post.id}`);
  };

  const handleNavigateToPostComments = () => {
    linkTo(`/posts/${post.id}/comments`);
  };

  const handleNavigateToPostLikes = () => {
    linkTo(`/posts/${post.id}/likes`);
  };

  const handleSharePost = async () => {
    console.debug('share post');

    try {
      const result = await Share.share({
        message: `https://dev-diversagente.herokuapp.com/mobile/posts/${post.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert('shared with activity type of ' + result.activityType);
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Flex
      backgroundColor="white"
      borderRadius={6}
      paddingX={6}
      paddingY={5}
      width="100%"
    >
      <Flex
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Flex direction="row" alignItems="center">
          <Avatar
            borderRadius={6}
            backgroundColor={post.owner.picture ? 'transparent' : 'primary.500'}
            source={{
              uri: String(post.owner.picture),
            }}
          >
            {userInitials}
          </Avatar>
          <Flex marginLeft={5}>
            <Text fontWeight={'bold'}>{post.owner.name}</Text>
            <Text color="gray.500">{formattedCreatedAtDate}</Text>
          </Flex>
        </Flex>
        <Flex>
          <PostMoreActions
            isOwner={isOwner}
            postId={post.id}
            onActivatePostEditMode={handleActivePostEditMode}
            onDeletedPost={onDeletedPost}
          />
        </Flex>
      </Flex>

      <Flex marginTop={3}>
        <ConditionallyRender
          condition={isEditModeActive}
          trueComponent={
            <PostEdit
              isEditModeActive={isEditModeActive}
              onDeactiveEditMode={handleDeactivatePostEditMode}
              postId={post.id}
              previousTitle={post.title}
              previousContent={post.content}
            />
          }
          falseComponent={
            <>
              <TouchableOpacity onPress={handleNavigateToPostDetails}>
                <Heading>{post.title}</Heading>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNavigateToPostDetails}>
                <Text color="gray.500" marginTop={4} fontSize={'md'}>
                  {isPreview ? contentPreview : post.content}
                  {isPreview && (
                    <Text
                      color="blue.500"
                      marginTop={7}
                      underline
                      fontSize={'md'}
                    >
                      ...Ver mais
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </>
          }
        />
      </Flex>

      <Flex
        width="100%"
        marginTop={3}
        direction="row"
        justifyContent="space-between"
      >
        <HStack space={5}>
          <Flex direction="row" alignItems="center">
            {hasLiked ? (
              <Pressable
                onPress={handleTogglePostLike}
                _pressed={{ backgroundColor: 'gray.100' }}
                borderRadius={6}
                disabled={isLiking}
              >
                <FavouriteIcon size={7} color="red.500" />
              </Pressable>
            ) : (
              <Pressable
                onPress={handleTogglePostLike}
                _pressed={{ backgroundColor: 'gray.100' }}
                borderRadius={6}
                disabled={isLiking}
              >
                <Icon
                  as={Feather}
                  name="heart"
                  size={7}
                  color="muted.400"
                  borderRadius={6}
                />
              </Pressable>
            )}
            <Pressable
              onPress={handleNavigateToPostLikes}
              _pressed={{ backgroundColor: 'gray.100' }}
              borderRadius={6}
            >
              <Text marginLeft={2} fontSize={18}>
                {post._count.likes}
              </Text>
            </Pressable>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Icon
              as={Feather}
              name="message-circle"
              size={7}
              onPress={handleNavigateToPostComments}
            />
            <Text
              marginLeft={2}
              fontSize={18}
              onPress={handleNavigateToPostComments}
            >
              {post._count.comments}
            </Text>
          </Flex>
        </HStack>
        <Icon as={Feather} name="share-2" size={7} onPress={handleSharePost} />
      </Flex>
    </Flex>
  );
};
