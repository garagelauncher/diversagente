import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Button, Text, View } from 'native-base';

import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

export type PostDetailsScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'PostDetails'
>;

export const PostDetails = () => {
  const navigation = useNavigation<PostDetailsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'PostDetails'>>();
  const { postId } = route.params;

  return (
    <View>
      <Text>Post details {postId}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}>
        Go back
      </Button>
    </View>
  );
};
