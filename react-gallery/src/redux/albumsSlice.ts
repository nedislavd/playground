import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AlbumDetails {
  userId: number;
  id: number;
  title: string;
  photos: Array<{ id: number; title: string; url: string; thumbnailUrl: string }>;
}

interface AlbumsState {
  albums: { [key: string]: AlbumDetails };
  albumDetails: { [key: string]: AlbumDetails };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AlbumsState = {
  albums: {},
  albumDetails: {},
  status: 'idle',
};

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
  return response.data;
});

export const fetchAlbumDetails = createAsyncThunk('albums/fetchAlbumDetails', async (albumId: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  return { id: albumId, photos: response.data };
});

/*TODO: move this to a "slices" directory */
export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'idle';
        action.payload.forEach((album) => {
          state.albums[album.id] = album;
        });
      })
      .addCase(fetchAlbumDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbumDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.albumDetails[action.payload.id] = action.payload;
      });
  },
});

export default albumsSlice.reducer;