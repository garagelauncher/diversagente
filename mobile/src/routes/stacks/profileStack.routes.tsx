import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '@src/screens/Profile';
import { EditProfile } from '@src/screens/Profile/EditProfile';

export type StackProfileNavigatorParamList = {
  Messages: undefined;
  Profile: { userId: string };
  EditProfile: undefined;
};

const { Navigator, Screen } =
  createStackNavigator<StackProfileNavigatorParamList>();

export const StackProfilePrivateRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Profile" component={Profile} />
    <Screen name="EditProfile" component={EditProfile} />
  </Navigator>
);
