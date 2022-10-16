import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';

import { LoadingFallback } from '@src/components/LoadingFallback';
import { Post, UserHasInteracted } from '@src/components/Post';
import { userIdHelper } from '@src/configs';
import { usePostDetails } from '@src/hooks/queries/details/usePostDetails';
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

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const handleAddComment = () => {
    alert('Comentário adicionado');
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor="gray.100"
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 100 }}
    >
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
        {data && <Post post={data} />}
      </LoadingFallback>

      <VStack width="100%" padding={6} space={4}>
        <Heading>Comentários</Heading>
        <Flex
          backgroundColor="white"
          borderRadius={6}
          paddingX={6}
          paddingY={5}
          width="100%"
        >
          <Flex direction="row">
            <Avatar borderRadius={6} backgroundColor={'primary.500'}>
              JD
            </Avatar>
            <Flex marginLeft={5}>
              <Text fontWeight={'bold'}>John Doe</Text>
              <Text color="gray.500">4h atrás</Text>
            </Flex>
          </Flex>

          <Text color="gray.500" marginTop={4} fontSize={'md'}>
            Muito bom o conteúdo, parabéns!
          </Text>

          <Flex direction="row" alignItems="center" marginTop={4}>
            <Icon as={Feather} name="message-circle" size={7} />
            <Text marginLeft={2} fontSize={18}>
              2
            </Text>
          </Flex>
        </Flex>

        <Input
          type="text"
          backgroundColor="gray.100"
          variant="rounded"
          width="100%"
          InputRightElement={
            <Button
              size="xs"
              variant="solid"
              colorScheme="blue"
              onPress={handleAddComment}
              marginRight={4}
            >
              Enviar
            </Button>
          }
          placeholder="Adicione aqui seu comentário"
        />
      </VStack>
    </ScrollView>
  );
};
