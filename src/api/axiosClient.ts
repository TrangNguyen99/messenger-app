import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {storage} from '../storage/storage';
import {storageFactory} from '../storage/storageFactory';

const axiosClient = axios.create({
  baseURL: 'https://clone-messengerr.herokuapp.com/api',
  headers: {
    'content-type': 'application/json',
  },
  timeout: 5000,
});

let refreshTokenRequest: any = null;

const refreshTokenFn = async () => {
  const refreshToken = await storage.getData(storageFactory.refreshToken.key);
  try {
    const response = await axios.post(
      'https://clone-messengerr.herokuapp.com/api/auth/refresh-token',
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
    const defaultHeader: any = config.headers?.common;
    if (defaultHeader?.Authorization) {
      const accessToken = defaultHeader.Authorization.split('Bearer ')[1];
      const decoded: any = jwt_decode(accessToken);
      const exp = decoded.exp;
      if (Date.now() > exp * 1000) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : refreshTokenFn();

        const newAccessToken = await refreshTokenRequest;
        refreshTokenRequest = null;

        defaultHeader.Authorization = 'Bearer ' + newAccessToken;
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
      console.log(error.response.data.message);
      return error.response.data;
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
