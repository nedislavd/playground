import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box, CardActions } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Skeleton } from '@mui/lab';

interface PhotoCardProps {
    photo: any;
    isFavorite: boolean;
    isLoaded: boolean;
    onFavoritesClick: (id: number, isFavorite: boolean) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isFavorite, isLoaded, onFavoritesClick }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box position="relative">
                {!isLoaded ? (
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
                        onClick={() => onFavoritesClick(photo.id, isFavorite)}
                    >
                        {isFavorite ? <StarIcon/> : <StarBorderIcon/>}
                    </IconButton>
                </CardActions>
            </Box>
            <CardContent sx={{flexGrow: 1}}>
                <Typography variant="body1">{photo.title}</Typography>
            </CardContent>
        </Card>
    );
};

export default PhotoCard;
