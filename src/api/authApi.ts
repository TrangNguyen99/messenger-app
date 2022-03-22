import axiosClient from './axiosClient';
import {ApiResponse} from './model';

const register = async (param: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.post(
      '/auth/register',
      param,
    );
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

const login = async (param: {
  email: string;
  password: string;
  deviceId: string;
  platform: 'android' | 'ios';
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.post('/auth/login', param);
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

const refreshToken = async (param: {
  refreshToken: string;
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.post(
      '/auth/refresh-token',
      param,
    );
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

const logout = async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.delete('/auth/logout');
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

export const authApi = {register, login, refreshToken, logout};
