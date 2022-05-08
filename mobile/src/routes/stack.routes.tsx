import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '@src/screens/Login';
import { Profile } from '@src/screens/Profile';

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

export const StackPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile"
    >
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};
