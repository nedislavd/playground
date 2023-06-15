import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import albumsReducer from './albumsSlice';
import favoritesReducer from './favoritesSlice';

/*TODO: move this to a "stores" directory*/
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        albums: albumsReducer,
        favorites: favoritesReducer,
    })
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)