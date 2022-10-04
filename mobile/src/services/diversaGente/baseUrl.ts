import axios from 'axios';

import { apiBaseUrl } from '@src/configs';

const diversagenteBaseApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

async function clearAuthToken() {
  diversagenteBaseApi.defaults.headers.common['Authorization'] = '';
  delete diversagenteBaseApi.defaults.headers.common['Authorization'];
}

async function setAuthToken(token: string | null) {
  await clearAuthToken();

  diversagenteBaseApi.defaults.headers.common['Authorization'] = `${token}`;
}

export { diversagenteBaseApi, setAuthToken, clearAuthToken };
