import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumDetails } from '../redux/albumsSlice';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { Grid } from '@mui/material';
import SideNav from '../components/SideNav';
import PhotoCard from '../components/PhotoCard';

interface RootState {
    albums: any;
}

const Album: React.FC = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams<{ albumId: string }>();
    const album = useSelector((state: RootState) => state.albums.albumDetails[albumId]);
    const [loadedImages, setLoadedImages] = useState<number[]>([]);
    const favoriteIds = useSelector((state: RootState) => state.favorites.favorites);

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

    const handleFavoritesClick = (id: number, isFavorite: boolean) => {
        if (isFavorite) {
            dispatch(removeFavorite(id));
        } else {
            dispatch(addFavorite(id));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} sm={8} md={10}>
                <SideNav/>
            </Grid>
            {album.photos.map((photo) => {
                const isFavorite = favoriteIds.includes(photo.id);
                const isLoaded = loadedImages.includes(photo.id);

                return (
                    <Grid item xs={12} sm={6} md={3} key={photo.id}>
                        <PhotoCard
                            photo={photo}
                            isFavorite={isFavorite}
                            isLoaded={isLoaded}
                            onFavoritesClick={handleFavoritesClick}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Album;
