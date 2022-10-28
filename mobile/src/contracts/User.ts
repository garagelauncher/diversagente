export interface UserPreferences {
  canReceivedMessage: boolean;
  language: string;
}

export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  isActive: boolean;
  birthdate?: string | null;
  biograph: string;
  picture?: string | null;
  deactivationReason?: string | null;
  preferences: UserPreferences;
  lovelyCategoriesIds: string[];
  createdAt: string;
};

export type UserEditProps = Partial<
  Omit<User, 'id' | 'createdAt' | 'isActive'>
>;
