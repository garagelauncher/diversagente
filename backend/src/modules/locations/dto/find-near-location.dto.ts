import { Coordinates } from 'src/shared/contracts/Coordinates';

export type NearDTO = {
  distanceInKilometer: number;
  limit: number;
} & Coordinates;
