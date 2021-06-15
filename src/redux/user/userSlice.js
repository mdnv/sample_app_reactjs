import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../shared/api'

const initialState = {
  loading: false,
  users: [],
  error: ''
};

export const fetchUsers = createAsyncThunk('user/fetchCount', async () => {
  const response = await new API().getHttpClient().get('/sessions', { withCredentials: true })
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.user;
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      });
  },
});

export const { decrement } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.users

export default userSlice.reducer;
