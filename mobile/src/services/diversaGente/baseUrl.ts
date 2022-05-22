import axios from 'axios';

import { apiBaseUrl } from '@src/configs';

const diversagenteBaseApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { diversagenteBaseApi };
