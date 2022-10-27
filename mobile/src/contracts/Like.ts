export type Like = {
  createdAt: string;
  id: string;
  ownerId: string;
  postId: string;
};

export type LikeOwnerPreferences = {
  canReceiveMessage: boolean;
  language: string;
};

export type LikeOwner = {
  id: string;
  biograph: null | string;
  birthdate: null | string;
  createdAt: string;
  email: string;
  lovelyCategoriesIds: string[];
  name: string;
  picture: string;
  preferences: LikeOwnerPreferences;
  updatedAt: string;
  username: string;
};
