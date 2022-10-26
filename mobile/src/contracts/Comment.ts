export type Comment = {
  id: string;
  createdAt: string;
  ownerId: string;
  postId: string;
  replyId: null | string;
  text: string;
  updatedAt: string;
};

export type CommentOwner = {
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
};

export type CommentOwnerPreferences = {
  canReceiveMessage: boolean;
  language: string;
};

export type CreateCommentDTO = {
  text: string;
  ownerId: string;
  postId: string;
};

export type UpdateCommentDTO = {
  text: string;
  postId: string;
  commentId: string;
};

export type CreateCommentForm = Pick<CreateCommentDTO, 'text'>;
export type UpdateCommentForm = Pick<UpdateCommentDTO, 'text'>;
