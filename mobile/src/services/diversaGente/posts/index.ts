import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { PostForm, Post } from '@src/contracts/Post';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { parseQueryOptions } from '@src/utils/parseQuery';

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
  options: QueryOptions = {},
) => {
  try {
    console.info('finding all posts', options);
    const response = await diversagenteBaseApi.get<
      IncludeInto<Post, GenericIncluded>[]
    >(`/posts`, {
      params: {
        ...parseQueryOptions(options),
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

export const findPostById = async <GenericIncluded extends object = object>(
  id: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.get<
      IncludeInto<Post, GenericIncluded>
    >(`/posts/${id}`, {
      params: {
        ...parseQueryOptions(options),
      },
    });

    const post = response.data;
    return post;
  } catch (error: any) {
    console.error('error when fetch post', id);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const updatePostById = async (postId: string, data: Partial<Post>) => {
  try {
    const response = await diversagenteBaseApi.patch<Post>(`/posts/${postId}`);

    return response.data;
  } catch (error: any) {
    console.error('error when patch post');
    console.error(postId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
}

export const deletePostById = async (postId: string) => {
  try {
    const response = await diversagenteBaseApi.delete<Post>(`/posts/${postId}`);

    return response.data;
  } catch (error: any) {
    console.error('error when delete post');
    console.error(postId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
