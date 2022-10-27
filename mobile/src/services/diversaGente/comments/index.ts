import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import {
  Comment,
  CreateCommentDTO,
  UpdateCommentDTO,
} from '@src/contracts/Comment';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { parseQueryOptions } from '@src/utils/parseQuery';

export const findAllComments = async <GenericIncluded extends object = object>(
  postId: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.get<
      IncludeInto<Comment, GenericIncluded>[]
    >(`/posts/${postId}/comments/`, {
      params: parseQueryOptions(options),
    });
    const comments = response.data;

    return { results: comments };
  } catch (error: any) {
    console.error('error when fetch all comments');
    console.error(postId);
    console.error(options);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const createComment = async ({
  postId,
  text,
  ownerId,
}: CreateCommentDTO) => {
  try {
    const response = await diversagenteBaseApi.post<Comment>(
      `/posts/${postId}/comments/`,
      {
        text,
        ownerId,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('error when create comment');
    console.error(postId);
    console.error(text);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const updateCommentById = async ({
  postId,
  commentId,
  ...data
}: UpdateCommentDTO): Promise<Comment> => {
  try {
    const response = await diversagenteBaseApi.patch<Comment>(
      `/posts/${postId}/comments/${commentId}`,
      data,
    );

    return response.data;
  } catch (error: any) {
    console.error('error when patch comment');
    console.error(commentId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const deleteCommentById = async (postId: string) => {
  try {
    const response = await diversagenteBaseApi.delete<Comment>(
      `/posts/${postId}/comments/`,
    );

    return response.data;
  } catch (error: any) {
    console.error('error when delete comment');
    console.error(postId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
