import { createStackNavigator } from '@react-navigation/stack';
import { FirstLogin } from '@src/screens/FirstLogin';

import { LocationDetails } from '@src/screens/LocationDetails';
import { Locations } from '@src/screens/Locations';
import { Login } from '@src/screens/Login';
import { RecoverAccount } from '@src/screens/RecoverAccount';

export type StackNavigatorParamList = {
  Locations: undefined;
  LocationDetails: { id: string };
};

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Screen name="Login" component={Login} />
      <Screen name="RecoverAccount" component={RecoverAccount} />
      <Screen name="FirstLogin" component={FirstLogin} />
    </Navigator>
  );
};

export const StackLocationPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Locations" component={Locations} />
      <Screen name="LocationDetails" component={LocationDetails} />
    </Navigator>
  );
};
