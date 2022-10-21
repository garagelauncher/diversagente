import { diversagenteBaseApi } from '../baseUrl';

import { Device } from '@src/contracts/Device';

export const createDevice = async ({
  token,
  platform = 'mobile',
  ownerId,
}: Device) => {
  try {
    const response = await diversagenteBaseApi.post<Comment>(
      `/users/${ownerId}/devices/`,
      {
        token,
        platform,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('error when create device');
    console.error(ownerId);
    console.error(token);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
