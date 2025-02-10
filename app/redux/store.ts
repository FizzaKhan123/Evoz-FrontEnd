import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import { nutritionApi } from './features/nutritionApi';
import authReducer from './features/authSlice'; 
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [nutritionApi.reducerPath]: nutritionApi.reducer,

    auth:authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware ,nutritionApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
