export type Preferences = {
  language: string;
  canReceiveMessage: boolean;
};

export type Owner = {
  id: string;
  email: string;
  username: string;
  name: string;
  birthdate?: string | null;
  biograph?: string | null;
  picture?: string | null;
  preferences: Preferences;
  lovelyCategoriesIds: string[];
  createdAt: string;
  updatedAt: string;
};
