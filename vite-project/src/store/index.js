import { configureStore } from '@reduxjs/toolkit'; // import redux toolkit
import authReducer from './slices/authSlice'; // import slices from auth
import alertReducer from './slices/alertSlice'; // import slices from alertslice
import locationReducer from './slices/locationSlice'; // import slice from locationSlice
export const store = configureStore({
 reducer: {
 auth: authReducer,
 alerts: alertReducer,
 location: locationReducer,
 },
});
