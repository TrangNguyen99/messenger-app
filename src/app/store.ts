import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import accountSlice from '../feature/account/slice/accountSlice';
import authSlice from '../feature/auth/slice/authSlice';
import chatSlice from '../feature/chat/slice/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    account: accountSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
