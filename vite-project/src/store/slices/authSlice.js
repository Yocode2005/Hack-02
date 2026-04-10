import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
 try {
    const { data } = await api.post('/auth/login', credentials);
 localStorage.setItem('token', data.token);
 return data;
 } catch (err) {
 return rejectWithValue(err.response?.data?.message || 'Login failed');
 }
});
export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
 try {
 const { data } = await api.get('/auth/me');
 return data;
 } catch (err) {
 return rejectWithValue(err.response?.data?.message);
 }
});
const authSlice = createSlice({
 name: 'auth',
 initialState: { user: null, token: localStorage.getItem('token'), loading: false, error: null },
 reducers: {
 logout: (state) => {
 state.user = null;
 state.token = null;
 localStorage.removeItem('token');
 },
 },
 extraReducers: (builder) => {
 builder
 .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
 .addCase(loginUser.fulfilled, (state, { payload }) => {
 state.loading = false; state.user = payload.user; state.token = payload.token;
 })
 .addCase(loginUser.rejected, (state, { payload }) => {
 state.loading = false; state.error = payload;
 })
 .addCase(fetchMe.fulfilled, (state, { payload }) => { state.user = payload.user; });
 },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;