import { composeWithDevTools } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

import transactionSlice from '../features/transactionSlice';
import loginSlice from '../features/authSlice';

const rootReducer = combineReducers({
  transactions: transactionSlice,
  login: loginSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['transactions', 'login'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
}, composeWithDevTools());

const persistor = persistStore(store);

export { store, persistor };