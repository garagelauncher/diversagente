import { createStackNavigator } from '@react-navigation/stack';

import { FormCreateLocation } from '@src/screens/FormCreateLocation';
import { FormCreateReview } from '@src/screens/FormCreateReview';
import { LocationDetails } from '@src/screens/LocationDetails';
import { Locations } from '@src/screens/Locations';
import { Reviews } from '@src/screens/Reviews';

export type StackLocationNavigatorParamList = {
  Locations: undefined;
  LocationDetails: { id: string };
  FormCreateLocation: undefined;
  Reviews: { locationId: string };
  FormCreateReview: { locationId: string };
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
      <Screen name="Reviews" component={Reviews} />
      <Screen name="FormCreateReview" component={FormCreateReview} />
    </Navigator>
  );
};
