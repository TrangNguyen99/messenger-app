import axiosClient from './axiosClient';
import {ApiResponse} from './model';

const getMe = async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.get('/users/me');
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

const getAllOtherUsers = async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.get(
      '/users/get-all-other-users',
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

const updateFcmToken = async (param: {
  fcmToken: string;
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.post('/users/fcm', param);
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

export const userApi = {getMe, getAllOtherUsers, updateFcmToken};
