/* eslint-disable @typescript-eslint/no-explicit-any */
import { diversagenteBaseApi } from '../baseUrl';

import { Complaint } from '@src/contracts/Complaint';

export const createComplaint = async ({
  ownerId,
  reason,
  resource,
  resourceId,
  data,
  message,
}: Complaint) => {
  try {
    const response = await diversagenteBaseApi.post<Complaint>(`/complaints`, {
      ownerId,
      reason,
      resource,
      resourceId,
      data,
      message,
    });

    return response.data;
  } catch (error: any) {
    console.error('error when create complaints');
    console.error(ownerId);
    console.error(reason);
    console.error(resourceId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
