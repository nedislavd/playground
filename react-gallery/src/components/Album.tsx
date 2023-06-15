import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumDetails } from '../redux/albumsSlice';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Skeleton } from '@mui/lab';
import SideNav from '../components/SideNav';

interface RootState {
  albums: any;
}

const Album: React.FC = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams<{ albumId: string }>();
  const album = useSelector((state: RootState) => state.albums.albumDetails[albumId]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  useEffect(() => {
    if (!album) {
      dispatch(fetchAlbumDetails(albumId));
    } else {
      album.photos.forEach((photo: any) => {
        const img = new Image();
        img.src = photo.url;
        img.onload = () => {
          setLoadedImages((prev) => [...prev, photo.id]);
        };
      });
    }
  }, [album, albumId, dispatch]);

  if (!album) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} sm={8} md={10}>
        <SideNav />
      </Grid>
      {album.photos.map((photo) => (
        <Grid item xs={10} sm={5} md={3} key={photo.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {!loadedImages.includes(photo.id) ? (
                <Skeleton variant="rectangular" width="100%" height={308} />
            ) : (
                <CardMedia
                    component="img"
                    image={photo.url}
                    alt={photo.title}
                />
            )}
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