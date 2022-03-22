import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {chatApi} from '../../../api/chatApi';
import {notifeeNotification} from '../../../notification/notifeeNotification';

interface Participant {
  _id: string;
  name: string;
}

interface FinalMessage {
  senderId: string;
  text: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  type: 'private' | 'group';
  participants: Participant[];
  finalMessage: FinalMessage;
}

interface Message {
  _id: string;
  senderId: string;
  text: string;
}

interface ChatState {
  conversations: Conversation[];
  focusConversationId: string;
  messages: Message[];
}

const initialState: Partial<ChatState> = {
  conversations: [],
  messages: [],
};

const getConversations = createAsyncThunk('chat/getConversations', async () => {
  const result = await chatApi.getConversations();
  return result;
});

const createPrivateConversation = createAsyncThunk(
  'chat/createPrivateConversation',
  async (params: any) => {
    const result = await chatApi.createPrivateConversation(params);
    return result;
  },
);

const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (params: any) => {
    const result = await chatApi.getMessages(params);
    return result;
  },
);

const createMessage = createAsyncThunk(
  'chat/createMessage',
  async (params: any, thunkApi) => {
    const result = await chatApi.createMessage({
      conversationId: params.conversationId,
      text: params.text,
    });

    const rootState: any = thunkApi.getState();
    const extraData = [
      {
        _id: rootState.account._id,
        name: rootState.account.name,
      },
      {
        _id: params.partnerId,
        name: params.partnerName,
      },
    ];

    return {
      ...result,
      extraData,
    };
  },
);

const receiveMessage = createAsyncThunk(
  'chat/receiveMessage',
  async (params: any, thunkApi) => {
    const {from, to, message} = params;

    const rootState: any = thunkApi.getState();

    const conversationId = to.conversationId;
    const participants = [
      {
        _id: rootState.account._id,
        name: rootState.account.name,
      },
      {
        _id: from.userId,
        name: from.name,
      },
    ];
    const finalMessage = {
      senderId: from.userId,
      text: message.text,
      updatedAt: message.updatedAt,
    };

    if (rootState.chat.focusConversationId !== conversationId) {
      await notifeeNotification.displayNotification({
        from: {
          userId: from.userId,
          name: from.name,
        },
        to: {
          conversationId,
        },
        message: {
          text: message.text,
        },
      });
    }

    return {
      participants,
      conversationId,
      finalMessage,
      message: {
        _id: message._id,
        senderId: from.userId,
        text: message.text,
      },
    };
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    joinConversation: (state, action) => {
      state.focusConversationId = action.payload.conversationId;
    },
    leaveConversation: state => {
      state.focusConversationId = undefined;
      state.messages?.splice(0, state.messages.length);
    },
    clearChatState: state => {
      state.conversations?.splice(0, state.conversations.length);
      state.focusConversationId = undefined;
      state.messages?.splice(0, state.messages.length);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getConversations.fulfilled, (state, action) => {
        if (action.payload.type === 'success') {
          state.conversations = action.payload.data;
        }
      })
      .addCase(createPrivateConversation.fulfilled, (state, action) => {
        if (action.payload.type === 'success') {
          state.focusConversationId = action.payload.data.conversationId;
        }
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        if (action.payload.type === 'success') {
          const messages = action.payload.data;
          state.messages = messages;
        }
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        if (action.payload.type === 'success') {
          state.messages?.unshift(action.payload.data);

          const conversationId = state.focusConversationId;
          if (!conversationId) {
            return;
          }
          const conversationIndex = state.conversations?.findIndex(
            c => c._id === conversationId,
          );
          if (conversationIndex === undefined) {
            return;
          }

          if (conversationIndex === -1) {
            state.conversations?.unshift({
              _id: conversationId,
              type: 'private',
              participants: action.payload.extraData,
              finalMessage: {
                senderId: action.payload.data.senderId,
                text: action.payload.data.text,
                updatedAt: action.payload.data.updatedAt,
              },
            });
          } else {
            const conversation = state.conversations?.splice(
              conversationIndex,
              1,
            )[0];
            if (conversation) {
              conversation.finalMessage.senderId = action.payload.data.senderId;
              conversation.finalMessage.text = action.payload.data.text;
              conversation.finalMessage.updatedAt =
                action.payload.data.updatedAt;

              state.conversations?.unshift(conversation);
            }
          }
        }
      })
      .addCase(receiveMessage.fulfilled, (state, action) => {
        const conversationId = action.payload.conversationId;

        const conversationIndex = state.conversations?.findIndex(
          c => c._id === conversationId,
        );
        if (conversationIndex === undefined) {
          return;
        }

        if (conversationIndex === -1) {
          state.conversations?.unshift({
            _id: conversationId,
            type: 'private',
            participants: action.payload.participants,
            finalMessage: action.payload.finalMessage,
          });
        } else {
          const conversation = state.conversations?.splice(
            conversationIndex,
            1,
          )[0];
          if (conversation) {
            conversation.finalMessage.senderId =
              action.payload.finalMessage.senderId;
            conversation.finalMessage.text = action.payload.finalMessage.text;
            conversation.finalMessage.updatedAt =
              action.payload.finalMessage.updatedAt;

            state.conversations?.unshift(conversation);
          }
        }

        if (state.focusConversationId === conversationId) {
          state.messages?.unshift(action.payload.message);
        }
      });
  },
});

export const chatAction = {
  ...chatSlice.actions,
  getConversations,
  createPrivateConversation,
  getMessages,
  createMessage,
  receiveMessage,
};

export default chatSlice.reducer;
