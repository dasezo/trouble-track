import { API_URL } from '@/config';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './useAuth';

export const useAxiosPrivate = () => {
  const { token, updateToken, onLogout } = useAuth();
  const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // withCredentials: true,
  });

  /**
   * * Refresh Token after it expires and resieves 401 status code
   *
   */

  axiosPrivate.interceptors.request.use(
    async function (config) {
      if (token === null) return config;
      const currentToken = jwtDecode(token);
      const isExpired =
        dayjs.unix(currentToken.exp as number).diff(dayjs()) < 1;
      if (!isExpired) return config;

      try {
        const response: AxiosResponse = await axios.get(
          `${API_URL}auth/refresh`,
          { withCredentials: true },
        );

        updateToken(response?.data.accessToken);
        config.headers.Authorization = `Bearer ${response?.data.accessToken}`;
      } catch (err) {
        onLogout();
        throw new Error(err.message);
      }
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  return axiosPrivate;
};
