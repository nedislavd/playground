import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumDetails } from '../redux/albumsSlice';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

interface RootState {
  albums: any;
}

const Album: React.FC = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams<{ albumId: string }>();
  const album = useSelector((state: RootState) => state.albums.albumDetails[albumId]);

  useEffect(() => {
    if (!album) {
      dispatch(fetchAlbumDetails(albumId));
    }
  }, [album, albumId, dispatch]);

  if (!album) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {album.photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} key={photo.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
              image={photo.url}
              alt={photo.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{photo.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Album;