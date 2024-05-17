import axios from '../api/axios';
import { useAuth } from './useAuth';

export const useRefreshToken = () => {
  const { updateToken } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get('auth/refresh', {
        withCredentials: true,
      });
      updateToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  return refresh;
};
