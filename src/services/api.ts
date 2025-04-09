import axios, { type InternalAxiosRequestConfig } from 'axios';
import { devPrint } from '../utils';
import { LOCAL_API_ENDPOINT, PROD_API_ENDPOINT } from '../constants';

const api = axios.create({
  baseURL: import.meta.env.DEV ? LOCAL_API_ENDPOINT : PROD_API_ENDPOINT,
  withCredentials: true,
});

export const getCSRF = async (config: InternalAxiosRequestConfig<any>) => {
  try {
    const response = await api.get('/auth/csrf/');
    const csrfToken = response.headers['x-csrftoken'];
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
      devPrint('CSRF token updated:', csrfToken);
    }
  } catch (error) {
    devPrint('Failed to fetch CSRF token:', error);
  }
  return config;
};
let cond = false;
api.interceptors.request.use(async (config) => {
  if (config.url === '/auth/csrf/') {
    return config;
  }
  if (!cond && !api.defaults.headers.common['X-CSRFToken']) {
    cond = true;
    return await getCSRF(config);
  }
  return config;
});

export default api;
