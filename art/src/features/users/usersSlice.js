import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersAPI from './usersAPI';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await usersAPI.fetchUsersFromAPI();
  return response.data;
});

export const fetchSubscriptions = createAsyncThunk('users/fetchSubscriptions', async () => {
  const response = await usersAPI.fetchSubscriptionsFromAPI();
  return response.data.map(sub => ({
    _id: sub._id,
    status: sub.status,
    plan:sub.plan,
    sellerName: sub.sellerName,
    startDate: sub.startDate,
    endDate: sub.endDate
  })); 
});


export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }) => {
  const response = await usersAPI.updateUserInAPI({ id, user });
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await usersAPI.deleteUserFromAPI(userId);
  return userId;
});

export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  const response = await usersAPI.createUserInAPI(newUser);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if(index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload; // Assuming you want to store subscriptions in state
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
      
      ;
      
  },
});

export const usersSelector = state => state.users;
export default usersSlice.reducer;
