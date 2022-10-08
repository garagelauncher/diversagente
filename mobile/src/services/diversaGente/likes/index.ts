import { diversagenteBaseApi } from '../baseUrl';

export type CreateLikeDTO = {
  postId: string;
  ownerId: string;
};
export type DeleteLikeDTO = {
  postId: string;
  likeId: string;
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
