import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {storage} from '../storage/storage';
import {storageFactory} from '../storage/storageFactory';

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.30:5000/api',
  headers: {
    'content-type': 'application/json',
  },
  timeout: 5000,
});

let refreshTokenRequest: any = null;

export const refreshTokenFn = async () => {
  const refreshToken = await storage.getData(storageFactory.refreshToken.key);
  try {
    const response = await axios.post(
      'http://192.168.1.30:5000/api/auth/refresh-token',
      {refreshToken},
      {
        headers: {'content-type': 'application/json'},
        timeout: 5000,
      },
    );

    return response.data.data.accessToken;
  } catch (error) {
    return null;
  }
};

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (config.headers?.Authorization) {
      const accessToken =
        config.headers.Authorization.toString().split('Bearer ')[1];
      const decoded: any = jwt_decode(accessToken);
      const exp = decoded.exp;
      if (Date.now() > exp * 1000) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : refreshTokenFn();

        const newAccessToken = await refreshTokenRequest;
        refreshTokenRequest = null;

        config.headers.Authorization = 'Bearer ' + newAccessToken;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.data?.accessToken) {
      axiosClient.defaults.headers.common.Authorization =
        'Bearer ' + response.data.data.accessToken;
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data) {
      return error.response.data;
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
