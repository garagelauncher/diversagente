import { createStackNavigator } from '@react-navigation/stack';

import { AddSubCategories } from '@src/screens/Forums/AddSubCategories';
import { LocationDetails } from '@src/screens/LocationDetails';
import { Locations } from '@src/screens/Locations';
import { Login } from '@src/screens/Login';

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
