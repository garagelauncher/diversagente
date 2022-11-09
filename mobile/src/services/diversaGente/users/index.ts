/* eslint-disable @typescript-eslint/no-explicit-any */
import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { User, UserEditProps } from '@src/contracts/User';
import { parseQueryOptions } from '@src/utils/parseQuery';

export const findAllUsers = async (options: QueryOptions = {}) => {
  try {
    const response = await diversagenteBaseApi.get<User[]>('/users', {
      params: parseQueryOptions(options),
    });
    const users = response.data;
    // console.debug('users', categories);
    return { results: users };
  } catch (error: any) {
    console.error('error when fetchin all users');

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const findUserByUsername = async (username?: string) => {
  try {
    const response = await diversagenteBaseApi.get<User>(`/users/${username}`);

    const user = response.data;
    console.info('USER!', response.data);
    return user;
  } catch (error: any) {
    console.error('error when fetching user info', username);

    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await diversagenteBaseApi.delete<User>(
      `/users/${userId}/`,
    );

    return response.data;
  } catch (error: any) {
    console.error('error when delete user');
    console.error(userId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const updateUserData = async ({
  username,
  ...data
}: Partial<UserEditProps>): Promise<UserEditProps> => {
  try {
    const response = await diversagenteBaseApi.patch<UserEditProps>(
      `/users/${username}`,
      data,
    );

    return response.data;
  } catch (error: any) {
    console.error('error when patch user');
    console.error(username);

    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const updateUserAvatar = async (
  username?: string,
  body: any,
) => {
  try {
    const response = await diversagenteBaseApi.patch(`/users/${username}/avatar`, {
      body,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    const user = response.data;
    console.info('user avatar!', response.data);
    return user;
  } catch (error: any) {
    console.error('error when patching user avatar info', username);

    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};
