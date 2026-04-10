import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
export const triggerSOS = createAsyncThunk('alerts/triggerSOS',
 async ({ latitude, longitude, type }, { rejectWithValue }) => {
 try {
 const { data } = await api.post('/sos/trigger', { latitude, longitude, type });
 return data;
 } catch (err) { return rejectWithValue(err.response?.data?.message); }
 }
);
export const fetchActiveIncidents = createAsyncThunk('alerts/fetchActive',
 async (_, { rejectWithValue }) => {
 try {
 const { data } = await api.get('/sos/active');
 return data.incidents;
 } catch (err) { return rejectWithValue(err.response?.data?.message); }
 }
);
const alertSlice = createSlice({
 name: 'alerts',
 initialState: { incidents: [], activeIncident: null, loading: false, error: null },
 reducers: {
 addIncident: (state, { payload }) => { state.incidents.unshift(payload); },
 setActiveIncident: (state, { payload }) => { state.activeIncident = payload; },
 removeIncident: (state, { payload }) => {
 state.incidents = state.incidents.filter(i => i._id !== payload);
 },
 },
 extraReducers: (builder) => {
 builder
 .addCase(triggerSOS.fulfilled, (state, { payload }) => {
 state.activeIncident = payload.incident;
 })
 .addCase(fetchActiveIncidents.fulfilled, (state, { payload }) => {
 state.incidents = payload;
 });
 },
});
export const { addIncident, setActiveIncident, removeIncident } = alertSlice.actions;
export default alertSlice.reducer;
