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

const getOthers = async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.get('/users/others');
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

const getPublicUser = async (param: {userId: string}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.get(
      `/users/public/${param.userId}`,
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
    const response: ApiResponse = await axiosClient.patch('/users/fcm', param);
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

export const userApi = {getMe, getOthers, getPublicUser, updateFcmToken};
