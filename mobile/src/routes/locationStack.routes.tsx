import { createStackNavigator } from '@react-navigation/stack';

import { FormCreateLocation } from '@src/screens/FormCreateLocation';
import { LocationDetails } from '@src/screens/LocationDetails';
import { Locations } from '@src/screens/Locations';

export type StackLocationNavigatorParamList = {
  Locations: undefined;
  LocationDetails: { id: string };
  FormCreateLocation: undefined;
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
      <Screen name="FormCreateLocation" component={FormCreateLocation} />
    </Navigator>
  );
};
