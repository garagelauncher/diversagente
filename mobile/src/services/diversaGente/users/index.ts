import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { Category } from '@src/contracts/Category';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { User } from '@src/contracts/User';
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

export const updateUserData = async <GenericIncluded extends object = object>(
  username?: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.patch<
      IncludeInto<User, GenericIncluded>
    >(`/users/${username}`, {
      params: {
        ...parseQueryOptions(options),
      },
    });

    const user = response.data;
    console.info('CATEGORY!', response.data);
    return user;
  } catch (error: any) {
    console.error('error when fetching category info', username);

    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};

export const updateUserAvatar = async <GenericIncluded extends object = object>(
  username?: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.patch<
      IncludeInto<User, GenericIncluded>
    >(`/users/${username}/avatar`, {
      params: {
        ...parseQueryOptions(options),
      },
    });

    const user = response.data;
    console.info('CATEGORY!', response.data);
    return user;
  } catch (error: any) {
    console.error('error when fetching category info', username);

    if (error.isAxiosError) {
      console.error(error.response);
    }
    throw error;
  }
};
