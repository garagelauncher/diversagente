import axios from 'axios';

import { apiBaseUrl } from '@src/configs';

const maxTimeout = 1000 * 30; // 30 seconds

const diversagenteBaseApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: maxTimeout,
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
