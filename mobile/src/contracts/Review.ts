export type ReviewOwner = {
  id: string;
  biograph: null | string;
  birthdate: null | string;
  createdAt: string;
  email: string;
  lovelyCategoriesIds: string[];
  name: string;
  picture: string;
  preferences: ReviewOwnerPreferences;
  updatedAt: string;
  username: string;
};

export type ReviewOwnerPreferences = {
  canReceiveMessage: boolean;
  language: string;
};

export interface Review {
  owner: ReviewOwner;
  id: string;
  text: string;
  stars: number;
  locationId: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export type RatePeriod = 'week' | 'month' | 'year' | 'day';
