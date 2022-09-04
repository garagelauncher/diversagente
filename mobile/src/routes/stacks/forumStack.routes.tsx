import { createStackNavigator } from '@react-navigation/stack';

import { FormCreatePost } from '@src/screens/FormCreatePost';
import { Forum } from '@src/screens/Forum';

export type StackForumNavigatorParamList = {
  Forum: undefined;
  FormCreatePost: undefined;
};

const { Navigator, Screen } =
  createStackNavigator<StackForumNavigatorParamList>();

export const StackForumPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Forum"
    >
      <Screen name="Forum" component={Forum} />
      <Screen name="FormCreatePost" component={FormCreatePost} />
    </Navigator>
  );
};
