import { createStackNavigator } from '@react-navigation/stack';

import { FormCreatePost } from '@src/screens/FormCreatePost';
import { Home } from '@src/screens/Home';

export type StackHomeNavigatorParamList = {
  FormCreatePost: undefined;
  Home: undefined;
};

const { Navigator, Screen } =
  createStackNavigator<StackHomeNavigatorParamList>();

export const StackChatPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="FormCreatePost" component={FormCreatePost} />
    </Navigator>
  );
};
