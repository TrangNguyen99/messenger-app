import axiosClient from './axiosClient';
import {ApiResponse} from './model';

const getConversations = async (): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.get('/conversations');
    return response;
  } catch (error: any) {
    return {
      type: 'error',
      message: error.message,
      data: null,
    };
  }
};

const createPrivateConversation = async (param: {
  partnerId: string;
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.post(
      '/conversations/private',
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

const getMessages = async (param: {
  conversationId: string;
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.get(
      `/messages/conversation/${param.conversationId}`,
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

const createMessage = async (param: {
  conversationId: string;
  receiverId: string;
  text: string;
}): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosClient.post(
      `/messages/conversation/${param.conversationId}`,
      {
        receiverId: param.receiverId,
        text: param.text,
      },
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

export const chatApi = {
  getConversations,
  createPrivateConversation,
  getMessages,
  createMessage,
};
