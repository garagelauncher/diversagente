import { diversagenteBaseApi } from '../baseUrl';

import { Location, SearchLocationByProximity } from '@src/contracts/Location';
import { Review } from '@src/contracts/Review';

export const getLocationsByProximity = async ({
  latitude,
  longitude,
  distanceInKilometer,
  limit,
}: SearchLocationByProximity) => {
  try {
    const response = await diversagenteBaseApi.get<Location[]>(`/locations`, {
      params: {
        latitude,
        longitude,
        distanceInKilometer,
        limit,
      },
    });

    const locations = response.data;
    console.info('locations');
    console.info(locations);
    return locations;
  } catch (error: any) {
    console.info('error when fetching locations');
    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const getLocationById = async (id: string) => {
  try {
    const response = await diversagenteBaseApi.get<Location>(
      `/locations/${id}`,
    );

    const location = response.data;
    console.info('location');
    console.info(location);
    return location;
  } catch (error: any) {
    console.info('error when fetching location');
    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const getReviewsByLocationId = async (id: string) => {
  try {
    const response = await diversagenteBaseApi.get<Review[]>(
      `/locations/${id}/reviews`,
    );

    const reviews = response.data;
    console.info('reviews from a location');
    console.info(reviews);
    return reviews;
  } catch (error: any) {
    console.info('error when fetching reviews from a location', error);
    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const createLocation = async (location: Partial<Location>) => {
  try {
    const response = await diversagenteBaseApi.post<Location>(
      `/locations`,
      location,
    );

    const createdLocation = response.data;
    console.info('created location');
    console.info(createdLocation);
    return createdLocation;
  } catch (error: any) {
    console.info('error when creating location');
    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};
