import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userApi} from '../../../api/userApi';

interface AccountState {
  _id: string;
  name: string;
}

const initialState: Partial<AccountState> = {};

const getMe = createAsyncThunk('account/getMe', async () => {
  const result = await userApi.getMe();
  return result;
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccountState: state => {
      state._id = undefined;
      state.name = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      if (action.payload.type === 'success') {
        state._id = action.payload.data._id;
        state.name = action.payload.data.name;
      }
    });
  },
});

export const accountAction = {...accountSlice.actions, getMe};

export default accountSlice.reducer;
