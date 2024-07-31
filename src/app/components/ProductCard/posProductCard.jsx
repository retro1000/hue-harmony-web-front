import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';

const PosProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 345, marginTop: 0,marginRight:1.5 }}>
            <CardMedia
                component="img"
                height="100"
                image={product.imageUrl} // Add the image URL here
                alt={product.name}
                sx={{mb:0.1}}
            />
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography variant="h8" color="primary">
                    {product.id} - {product.name}
                </Typography>
                <Typography variant="body2" color="error">
                    LKR {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="green">
                    Available: {product.availability}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PosProductCard;

