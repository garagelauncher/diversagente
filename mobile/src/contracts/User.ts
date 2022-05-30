export interface UserPreferences {
  canReceivedMessage: boolean;
  latitude: boolean;
}

export interface User {
  biograph: string;
  birthdate: string;
  createdAt: string;
  email: string;
  id: string;
  lovelyCategoriesIds: string[];
  name: string;
  picture: string;
  preferences: UserPreferences;
}
