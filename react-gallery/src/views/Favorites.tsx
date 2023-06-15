import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { RootState } from '../redux/store';
import SideNav from '../components/SideNav';
import { removeFavorite } from "../redux/favoritesSlice";
import PhotoCard from '../components/PhotoCard';

type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

const Favorites: React.FC = () => {
    const dispatch = useDispatch();
    const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);
    const [loadedImages, setLoadedImages] = useState<number[]>([]);
    const favoritesIds = useSelector((state: RootState) => state.favorites.favorites);

    useEffect(() => {
        const fetchFavoritePhotos = async () => {
            const responses = await Promise.all(favoritesIds.map(id =>
                fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
            ));
            const photos = await Promise.all(responses.map(res => res.json()));

            photos.forEach((photo: Photo) => {
                const img = new Image();
                img.src = photo.url;
                img.onload = () => {
                    setLoadedImages((prev) => [...prev, photo.id]);
                };
            });

            setFavoritePhotos(photos);
        };

        fetchFavoritePhotos();
    }, [favoritesIds]);

    const handleFavoritesClick = (id: number, isFavorite: boolean) => {
        if (isFavorite) {
            dispatch(removeFavorite(id));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} sm={8} md={10}>
                <SideNav/>
            </Grid>
            {favoritePhotos.map((photo) => {
                const isFavorite = favoritesIds.includes(photo.id);
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

export default Favorites;