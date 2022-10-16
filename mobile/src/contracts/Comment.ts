export interface Comment {
  id: string;
  createdAt: string;
  ownerId: string;
  postId: string;
  replyId: null | string;
  text: string;
  updatedAt: string;
}

export interface CommentOwner {
  id: string;
  biograph: null | string;
  birthdate: null | string;
  createdAt: string;
  email: string;
  lovelyCategoriesIds: string[];
  name: string;
  picture: string;
  preferences: CommentOwnerPreferences;
  updatedAt: string;
  username: string;
}

export interface CommentOwnerPreferences {
  canReceiveMessage: boolean;
  language: string;
}
