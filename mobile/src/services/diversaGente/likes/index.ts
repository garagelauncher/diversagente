import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { parseQueryOptions } from '@src/utils/parseQuery';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { Like } from '@src/contracts/Like';

export type CreateLikeDTO = {
  postId: string;
  ownerId: string;
};

export type DeleteLikeDTO = {
  postId: string;
  likeId: string;
};

export const findAllLikes = async <GenericIncluded extends object = object>(
  postId: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.get<
      IncludeInto<Like, GenericIncluded>[]
    >(`/posts/${postId}/likes/`, {
      params: parseQueryOptions(options),
    });
    const likes = response.data;

    return { results: likes };
  } catch (error: any) {
    console.error('error when fetch all likes');
    console.error(postId);
    console.error(options);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const createLike = async ({ postId, ownerId }: CreateLikeDTO) => {
  try {
    const response = await diversagenteBaseApi.post(`/posts/${postId}/likes`, {
      ownerId,
    });

    return response.data;
  } catch (error: any) {
    console.error('error when creating like');
    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const deleteLike = async ({ postId, likeId }: DeleteLikeDTO) => {
  try {
    const response = await diversagenteBaseApi.delete(
      `/posts/${postId}/likes/${likeId}`,
    );

    return response.data;
  } catch (error: any) {
    console.error('error when deleting like');
    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};
