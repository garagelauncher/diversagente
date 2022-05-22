import { createStackNavigator } from '@react-navigation/stack';

import { LocationDetails } from '@src/screens/LocationDetails';
import { Locations } from '@src/screens/Locations';

export type StackLocationNavigatorParamList = {
  Locations: undefined;
  LocationDetails: { id: string };
};

const { Navigator, Screen } =
  createStackNavigator<StackLocationNavigatorParamList>();

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
