import { diversagenteBaseApi } from '../baseUrl';

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

export const findAllPosts = async (options: PaginateOptions = {}) => {
  try {
    const response = await diversagenteBaseApi.get<Post[]>(`/posts`, {
      params: {
        ...parsePagination(options),
      },
    });

    const posts = response.data;
    return posts;
  } catch (error: any) {
    console.error('error when fetching posts');

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
