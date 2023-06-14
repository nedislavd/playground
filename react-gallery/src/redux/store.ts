import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';
import albumsReducer from './albumsSlice';

/*TODO: move this to a "stores" directory*/
const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  albums: albumsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)