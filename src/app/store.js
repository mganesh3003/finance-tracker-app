import { composeWithDevTools } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

import transactionSlice from '../features/transactionSlice'

const rootReducer = combineReducers({
  transactions: transactionSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['transactions'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
}, composeWithDevTools());

// Create a persistor object to persist the store
const persistor = persistStore(store);

export { store, persistor };