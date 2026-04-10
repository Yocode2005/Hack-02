import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import locationReducer from './slices/locationSlice';
export const store = configureStore({
 reducer: {
 auth: authReducer,
 alerts: alertReducer,
 location: locationReducer,
 },
});