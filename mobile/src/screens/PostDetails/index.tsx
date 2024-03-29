import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Skeleton,
  VStack,
} from 'native-base';
import { useState } from 'react';

import { AppBar } from '@src/components/AppBar';
import { ConditionallyRender } from '@src/components/ConditionallyRender';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { ModalNewComment } from '@src/components/ModalNewComment';
import { Post, UserHasInteracted } from '@src/components/Post';
import { UserComment } from '@src/components/UserComment';
import { userIdHelper } from '@src/configs';
import { CommentOwner } from '@src/contracts/Comment';
import { usePostDetails } from '@src/hooks/queries/details/usePostDetails';
import { useComments } from '@src/hooks/queries/useComments';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

export type PostDetailsScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'PostDetails'
>;

export const PostDetails = () => {
  const { user } = useAuth();
  const navigation = useNavigation<PostDetailsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'PostDetails'>>();
  const { postId } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, isLoading } = usePostDetails<UserHasInteracted>(postId, {
    include: {
      likes: {
        select: { id: true },
        where: { ownerId: user?.id ?? userIdHelper },
      },
      comments: {
        select: { id: true },
        where: { ownerId: user?.id ?? userIdHelper },
      },
    },
  });

  const { data: commentData, isLoading: isCommentLoading } = useComments<{
    owner: CommentOwner;
  }>({
    postId,
    perPage: 1,
    range: [0, 0],
    sort: ['createdAt', 'DESC'],
    filter: {
      postId,
      isActive: true,
    },
    include: {
      owner: true,
    },
  });
  const lastComment = commentData?.pages[0]?.results[0] || null;

  const isLoadedNoComment = !isCommentLoading && !lastComment;

  const handleNavigateToForum = () => {
    navigation.navigate('Forum');
  };

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToCommentList = () => {
    navigation.navigate('Comments', { postId });
  };

  const handleOpenAddCommentModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor="gray.100"
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 100 }}
    >
      <AppBar position="absolute" top={0} left={0} right={0} zIndex={1} />
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={4}
        zIndex={1}
      />
      <LoadingFallback
        fallback={<Skeleton width="100%" height={200} />}
        isLoading={isLoading || !data}
      >
        {data && <Post post={data} onDeletedPost={handleNavigateToForum} />}
      </LoadingFallback>

      <VStack width="100%" padding={6} space={6}>
        <LoadingFallback
          fallback={<Skeleton width="100%" height={50} />}
          isLoading={isLoading || !data}
        >
          <Input
            type="text"
            backgroundColor="gray.100"
            variant="rounded"
            width="100%"
            onFocus={handleOpenAddCommentModal}
            placeholder="Adicione aqui seu comentário"
          />
        </LoadingFallback>

        <ConditionallyRender
          condition={isLoading}
          trueComponent={<></>}
          falseComponent={
            <ConditionallyRender
              condition={isLoadedNoComment}
              trueComponent={<></>}
              falseComponent={<Heading>Último comentário</Heading>}
            />
          }
        />

        <ConditionallyRender
          condition={isLoadedNoComment}
          trueComponent={<></>}
          falseComponent={
            <LoadingFallback
              fallback={<Skeleton width="100%" height={150} />}
              isLoading={isCommentLoading || !lastComment}
            >
              <>{lastComment && <UserComment comment={lastComment} />}</>
            </LoadingFallback>
          }
        />

        <ConditionallyRender
          condition={isLoadedNoComment}
          trueComponent={<></>}
          falseComponent={
            <Button
              colorScheme={'blue'}
              size={'lg'}
              fontSize={'lg'}
              variant={'outline'}
              onPress={handleNavigateToCommentList}
            >
              Ver mais comentários
            </Button>
          }
        />
      </VStack>
      <ModalNewComment
        headerTitle="Adicionar comentário"
        isOpen={isModalVisible}
        onClose={handleCloseModal}
        author={String(data?.owner.name)}
        postId={postId}
      />
    </ScrollView>
  );
};
