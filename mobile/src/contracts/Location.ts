export interface Location {
  id: string;
  title: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SearchLocationByProximity {
  latitude: number;
  longitude: number;
  distanceInKilometer: number;
  limit: number;
}
