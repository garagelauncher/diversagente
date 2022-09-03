import { createStackNavigator } from '@react-navigation/stack';

import { Forum } from '@src/screens/Forum';

export type StackForumNavigatorParamList = {
  Forum: undefined;
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
    </Navigator>
  );
};
