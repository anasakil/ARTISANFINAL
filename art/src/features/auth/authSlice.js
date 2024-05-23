import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveToken, saveUserRole, clearToken, clearUserRole } from '../../utils/auth';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', userData);
      saveToken(response.data.token);
      saveUserRole(response.data.role);
      return { user: response.data.user, token: response.data.token, role: response.data.role };
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to login. Please try again later.';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', userData);
      saveToken(response.data.token);
      saveUserRole(response.data.role);
      return { user: response.data.user, token: response.data.token, role: response.data.role };
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to register. Please try again later.';
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      clearToken();
      clearUserRole();
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = 'idle';
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
