import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { PaginateOptions } from '@src/contracts/PaginateOptions';
import { PostForm, Post } from '@src/contracts/Post';
import { parsePagination } from '@src/utils/parsePagination';

export const createPost = async (post: PostForm) => {
  try {
    const response = await diversagenteBaseApi.post<PostForm>(`/posts`, post);

    const createdPost = response.data;
    console.info('created post');
    console.info(createdPost);
    return createdPost;
  } catch (error: any) {
    console.info('error when creating post');
    if (error.isAxiosError) {
      console.warn(error.response);
    }
    throw error;
  }
};

export const findAllPosts = async <GenericIncluded extends object = object>(
  options: PaginateOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.get<
      IncludeInto<Post, GenericIncluded>[]
    >(`/posts`, {
      params: {
        ...parsePagination(options),
      },
    });

    const posts = response.data;
    return { results: posts };
  } catch (error: any) {
    console.error('error when fetching posts');

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
