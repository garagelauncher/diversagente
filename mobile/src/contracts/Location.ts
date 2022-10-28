export interface Location {
  id: string;
  title: string;
  description: string;
  address: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  coordinates: Coordinates;
  reviewCount: number;
  starsAverage: number;
  categoryId: string;
  icon: string;
  iconProvider: string;
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
