import { diversagenteBaseApi } from './baseUrl';

import { Location, SearchLocationByProximity } from '@src/contracts/Location';

export const getLocationsByProximity = ({
  latitude,
  longitude,
  distanceInKilometer,
  limit,
}: SearchLocationByProximity) => {
  const locations = diversagenteBaseApi.get<Location[]>(`/locations`, {
    params: {
      latitude,
      longitude,
      distanceInKilometer,
      limit,
    },
  });

  return locations;
};
