import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '@src/screens/Profile';
import { EditPersonalInformation } from '@src/screens/Profile/EditPersonalInformation';
import { EditProfile } from '@src/screens/Profile/EditProfile';

export type StackProfileNavigatorParamList = {
  Messages: undefined;
  Profile: { userId: string };
};

const { Navigator, Screen } =
  createStackNavigator<StackProfileNavigatorParamList>();

export const StackProfilePrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Screen name="Profile" component={Profile} /> */}
      {/* <Screen name="Profile" component={EditProfile} /> */}
      <Screen name="Profile" component={EditPersonalInformation} />
    </Navigator>
  );
};
