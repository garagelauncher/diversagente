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
} from 'native-base';
import { FunctionComponent } from 'react';
import { Share } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';

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
};

export const Post: FunctionComponent<PostProps> = ({ post, isPreview }) => {
  const { user } = useAuth();
  const linkTo = useLinkTo();

  const onSuccessToggleLike = async (data: Like) => {
    const post = await diversaGenteServices.findPostById(data.postId);

    queryClient.invalidateQueries(['diversagente@posts']);
    queryClient.setQueryData(['diversagente@posts', post.id], post);
  };

  const mutationCreateLike = useMutation(diversaGenteServices.createLike, {
    onSuccess: onSuccessToggleLike,
  });
  const mutationDeleteLike = useMutation(diversaGenteServices.deleteLike, {
    onSuccess: onSuccessToggleLike,
  });

  const isLiking = mutationCreateLike.isLoading || mutationDeleteLike.isLoading;
  const hasLiked = post.likes.length > 0;

  const userInitials = getUsernameInitials(post.owner.username);
  const contentPreview = post.content.slice(0, 255);

  const formattedCreatedAtDate = formatDateSocialMedia(post.createdAt);

  const handleTogglePostLike = async () => {
    try {
      console.debug(`toggled by ${user?.id}`);

      if (!hasLiked) {
        console.debug(`Liked by ${user?.id}`);
        await mutationCreateLike.mutateAsync({
          postId: post.id,
          ownerId: String(user?.id),
        });
      } else {
        console.debug(`Unliked by ${user?.id}`);
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

  const handleSharePost = async () => {
    console.debug('share post');

    try {
      const result = await Share.share({
        message: `https://www.diversagente.com/posts/${post.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert('shared with activity type of ' + result.activityType);
        } else {
          alert('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        alert('dismissed');
      }
    } catch (error: any) {
      alert(error.message);
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
      <Flex direction="row">
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

      <Flex marginTop={3}>
        <TouchableOpacity onPress={handleNavigateToPostDetails}>
          <Heading>{post.title}</Heading>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToPostDetails}>
          <Text color="gray.500" marginTop={4} fontSize={'md'}>
            {isPreview ? contentPreview : post.content}
            {isPreview && (
              <Text color="blue.500" marginTop={7} underline fontSize={'md'}>
                ...Ver mais
              </Text>
            )}
          </Text>
        </TouchableOpacity>
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
            <Text marginLeft={2} fontSize={18}>
              {post._count.likes}
            </Text>
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
