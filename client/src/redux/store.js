// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/authReducer"
const store = configureStore({
  reducer: authReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
});

export default store;
