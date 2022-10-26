export interface UserPreferences {
  canReceivedMessage: boolean;
  language: string;
}

export interface User {
  id: string,
  email: string,
  username: string,
  name: string,
  isActive: boolean,
  birthdate?: string | null,
  biograph: string
  picture?: string | null,
  deactivationReason?: string | null,
  preferences: UserPreferences;
  lovelyCategoriesIds: string[];
  createdAt: string, 
}


export type UserEditForm = Partial<Omit<User, 'id' | 'createdAt' | 'isActive'>>;

  