import { IncludeInto } from "@src/@types/generics/includeInto";
import { QueryOptions } from "@src/contracts/QueryOptions";
import { Review } from "@src/contracts/Review";
import { parseQueryOptions } from "@src/utils/parseQuery";
import { diversagenteBaseApi } from "../baseUrl";

export const getReviewsByLocationId = async   <GenericIncluded extends object = object>(
    locationId: string,
    options: QueryOptions = {},
  ) => {
    try {
      const response = await diversagenteBaseApi.get<IncludeInto<Review, GenericIncluded>[]>(
        `/locations/${locationId}/reviews`,
        {
            params: parseQueryOptions(options),
        },
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

export const createReviewToLocation = async (
    locationId: string,
    review: Partial<Review>,
  ) => {
    try {
      const response = await diversagenteBaseApi.post<Review>(
        `/locations/${locationId}/reviews`,
        review,
      );
  
      const createdReview = response.data;
      console.info('created review');
      console.info(createdReview);
      return createdReview;
    } catch (error: any) {
      console.info('error when creating review');
      if (error.isAxiosError) {
        console.error(error.response);
      }
      throw error;
    }
  };
  