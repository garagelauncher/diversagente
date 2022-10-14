import { diversagenteBaseApi } from '../baseUrl';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { parseQueryOptions } from '@src/utils/parseQuery';


export const findAllComments = async (postId: string, options: QueryOptions = {}) => {
    try {
      const response = await diversagenteBaseApi.get<any[]>(`/posts/${postId}/comments/`, {
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
  