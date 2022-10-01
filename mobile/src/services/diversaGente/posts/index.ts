import { diversagenteBaseApi } from '../baseUrl';

import { Post } from '@src/contracts/Post';

export const createPost = async (post: Post) => {
  try {
    const response = await diversagenteBaseApi.post<Post>(`/posts`, post);

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
