import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {chatApi} from '../../../api/chatApi';

interface Participant {
  _id: string;
  name: string;
  avatar: string | null;
}

interface FinalMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  type: 'text' | 'image';
  text: string | null;
  image: string | null;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  type: 'private' | 'group';
  participants: Participant[];
  finalMessage: Partial<FinalMessage>;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string | null;
  type: 'text' | 'image';
  text: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Partner {
  _id: string;
  name: string;
  avatar: string | null;
}

interface ChatState {
  conversations: Conversation[];
  focusConversationId: string | null;
  partner: Partial<Partner>;
  messages: Message[];
}

const initialState: ChatState = {
  conversations: [],
  focusConversationId: null,
  partner: {},
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
  async (_, thunkApi) => {
    const rootState: any = thunkApi.getState();
    const conversationId = rootState.chat.focusConversationId;
    const result = await chatApi.getMessages({conversationId});
    return result;
  },
);

const createMessage = createAsyncThunk(
  'chat/createMessage',
  async (params: any, thunkApi) => {
    const rootState: any = thunkApi.getState();
    const conversationId = rootState.chat.focusConversationId;
    const receiverId = rootState.chat.partner._id;
    const result = await chatApi.createMessage({
      conversationId,
      receiverId,
      text: params.text,
    });

    const account = rootState.account;
    const participants = [
      {_id: account._id, name: account.name, avatar: account.avatar},
      rootState.chat.partner,
    ];

    return {
      ...result,
      extraData: {participants},
    };
  },
);

const receiveMessage = createAsyncThunk(
  'chat/receiveMessage',
  async (params: any, thunkApi) => {
    const rootState: any = thunkApi.getState();
    const account = rootState.account;
    const participants = [
      {_id: account._id, name: account.name, avatar: account.avatar},
      {...params.from},
    ];

    return {
      conversationId: params.to.conversationId,
      participants,
      message: params.message,
    };
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPartner: (state, action) => {
      state.partner._id = action.payload._id;
      state.partner.name = action.payload.name;
      state.partner.avatar = action.payload.avatar;
    },
    setConversationId: (state, action) => {
      state.focusConversationId = action.payload.conversationId;
    },
    leaveConversation: state => {
      state.focusConversationId = null;
      state.partner = {};
      state.messages = [];
    },
    clearChatState: state => {
      state.conversations = [];
      state.focusConversationId = null;
      state.partner = {};
      state.messages = [];
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
          state.messages.unshift(action.payload.data);

          const conversationIndex = state.conversations.findIndex(
            conversation => conversation._id === state.focusConversationId,
          );
          if (conversationIndex === -1) {
            const newConversation: Conversation = {
              _id: `${state.focusConversationId}`,
              type: 'private',
              participants: action.payload.extraData.participants,
              finalMessage: action.payload.data,
            };
            state.conversations.unshift(newConversation);
          } else {
            const conversation = state.conversations.splice(
              conversationIndex,
              1,
            )[0];
            conversation.finalMessage = action.payload.data;
            state.conversations.unshift(conversation);
          }
        }
      })
      .addCase(receiveMessage.fulfilled, (state, action) => {
        const conversationId = action.payload.conversationId;
        const conversationIndex = state.conversations.findIndex(
          conversation => conversation._id === conversationId,
        );
        if (conversationIndex === -1) {
          const newConversation: Conversation = {
            _id: conversationId,
            type: 'private',
            participants: action.payload.participants,
            finalMessage: action.payload.message,
          };
          state.conversations.unshift(newConversation);
        } else {
          const conversation = state.conversations.splice(
            conversationIndex,
            1,
          )[0];
          conversation.finalMessage = action.payload.message;
          state.conversations.unshift(conversation);
        }

        if (state.focusConversationId === conversationId) {
          state.messages.unshift(action.payload.message);
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
