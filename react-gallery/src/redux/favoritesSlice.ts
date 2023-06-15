import {createSlice} from '@reduxjs/toolkit';

interface FavoritesState {
    favorites: string[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(id => id !== action.payload);
        },
    },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;
