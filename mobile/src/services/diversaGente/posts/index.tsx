import { diversagenteBaseApi } from '../baseUrl';

import { PaginateOptions } from '@src/contracts/PaginateOptions';
import { Post } from '@src/contracts/Post';

export const findAllPosts = async (options: PaginateOptions = {}) => {
  try {
    const response = await diversagenteBaseApi.get<Post[]>(`/posts`, {
      params: {
        ...options,
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
