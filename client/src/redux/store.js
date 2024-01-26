// src/redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/authReducer"
import { persistReducer, persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({ authReducer });

const  persistConfig = {
  key: "userRoot",
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export  const  persistor = persistStore(store)
