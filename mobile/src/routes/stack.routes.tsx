import { createStackNavigator } from '@react-navigation/stack';

import { Locations } from '@src/screens/Locations';
import { Login } from '@src/screens/Login';

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
    </Navigator>
  );
};
