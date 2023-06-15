import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchAlbumDetails} from '../redux/albumsSlice';
import {addFavorite, removeFavorite} from '../redux/favoritesSlice';
import {Card, CardContent, CardMedia, Grid, IconButton, Typography, Box, CardActions } from '@mui/material';
import {Skeleton} from '@mui/lab';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import SideNav from '../components/SideNav';

interface RootState {
    albums: any;
}

const Album: React.FC = () => {
    const dispatch = useDispatch();
    const {albumId} = useParams<{ albumId: string }>();
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

                return (
                    <Grid item xs={10} sm={5} md={3} key={photo.id}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <Box position="relative">
                                {!loadedImages.includes(photo.id) ? (
                                    <Skeleton variant="rectangular" width="100%" height={308}/>
                                ) : (
                                    <CardMedia
                                        component="img"
                                        image={photo.url}
                                        alt={photo.title}
                                    />
                                )}
                                <CardActions sx={{position: 'absolute', top: 0, right: 0}}>
                                    <IconButton
                                        aria-label="add to favorites"
                                        onClick={() => handleFavoritesClick(photo.id, isFavorite)}
                                    >
                                        {isFavorite ? <StarIcon/> : <StarBorderIcon/>}
                                    </IconButton>
                                </CardActions>
                            </Box>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="body1">{photo.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>)
            })}
        </Grid>

    );
};

export default Album;