import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi} from '../../../api/authApi';
import {jwt} from '../../../jwt/jwt';
import socket from '../../../socket/socket';
import {storage} from '../../../storage/storage';
import {storageFactory} from '../../../storage/storageFactory';
import {accountAction} from '../../account/slice/accountSlice';
import {chatAction} from '../../chat/slice/chatSlice';
import messaging from '@react-native-firebase/messaging';
import {userApi} from '../../../api/userApi';

interface AuthState {
  loggedIn: boolean | null;
}

const initialState: AuthState = {
  loggedIn: null,
};

const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, thunkApi) => {
    const refreshToken = await storage.getData(storageFactory.refreshToken.key);
    const result = await authApi.refreshToken({refreshToken});
    if (result.type === 'success') {
      await thunkApi.dispatch(accountAction.getMe());

      socket.auth = jwt.decodeRefreshToken(refreshToken);
      socket.connect();

      const fcmToken = await messaging().getToken();
      await userApi.updateFcmToken({fcmToken});
    }
    return result;
  },
);

const register = createAsyncThunk('auth/register', async (params: any) => {
  const result = await authApi.register(params);
  return result;
});

const login = createAsyncThunk('auth/login', async (params: any, thunkApi) => {
  const result = await authApi.login(params);
  if (result.type === 'success') {
    await storage.setData(
      storageFactory.refreshToken.key,
      storageFactory.refreshToken.value.string(result.data.refreshToken),
    );
    await thunkApi.dispatch(accountAction.getMe());

    socket.auth = jwt.decodeRefreshToken(result.data.refreshToken);
    socket.connect();

    const fcmToken = await messaging().getToken();
    await userApi.updateFcmToken({fcmToken});
  }
  return result;
});

const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  await storage.removeData(storageFactory.refreshToken.key);

  thunkApi.dispatch(accountAction.clearAccountState());
  thunkApi.dispatch(chatAction.clearChatState());

  socket.disconnect();

  const result = await authApi.logout();
  return result;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload.type === 'success') {
          state.loggedIn = true;
        } else {
          state.loggedIn = false;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.type === 'success') {
          state.loggedIn = true;
        }
      })
      .addCase(logout.fulfilled, state => {
        state.loggedIn = false;
      });
  },
});

export const authAction = {checkAuthState, register, login, logout};

export default authSlice.reducer;
