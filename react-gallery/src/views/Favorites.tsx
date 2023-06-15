import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {RootState} from '../redux/store';
import SideNav from '../components/SideNav';

type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

const Favorites: React.FC = () => {
    const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);
    const favoritesIds = useSelector((state: RootState) => state.favorites.favorites);

    useEffect(() => {
        const fetchFavoritePhotos = async () => {
            const responses = await Promise.all(favoritesIds.map(id =>
                fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
            ));
            const photos = await Promise.all(responses.map(res => res.json()));
            setFavoritePhotos(photos);
        };

        fetchFavoritePhotos();
    }, [favoritesIds]);

    return (
        /*<Grid container spacing={3}>
            {favoritePhotos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            image={photo.url}
                            alt={photo.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="body1">{photo.title}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>*/


        <Grid container spacing={2}>
            <Grid item xs={2} sm={8} md={10}>
                <SideNav/>
            </Grid>
            {favoritePhotos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <CardMedia
                            component="img"
                            image={photo.url}
                            alt={photo.title}
                        />
                        <CardContent sx={{flexGrow: 1}}>
                            <Typography variant="body1">{photo.title}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Favorites;