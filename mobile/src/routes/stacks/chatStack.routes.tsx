import { createStackNavigator } from '@react-navigation/stack';

import { Chat } from '@src/screens/Chat';
import { Messages } from '@src/screens/Messages';

export type StackChatNavigatorParamList = {
  Messages: undefined;
  Chat: { userId: string };
};

const { Navigator, Screen } =
  createStackNavigator<StackChatNavigatorParamList>();

export const StackChatPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Messages" component={Messages} />
      <Screen name="Chat" component={Chat} />
    </Navigator>
  );
};
