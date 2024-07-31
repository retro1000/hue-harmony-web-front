import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';

const PosProductCard = ({ product }) => {
    return (
        <Card elevation={8} sx={{ maxWidth: 345, height: 250, marginTop: 0, marginRight: 0, backgroundColor: 'grey.200', padding: 0.5, display: 'flex', flexDirection: 'column', boxShadow: '10px 10px 10px rgba(0, 0, 0, 1)' }}>
      <CardMedia
        component="img"
        image={product.imageUrl} // Add the image URL here
        alt={product.name}
        sx={{ 
          flex: '0 0 70%', 
          height: '70%', 
          objectFit: 'contain', // Ensure the full image is visible
          objectPosition: 'center'
        }}
      />
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h8" color="primary" fontWeight={600}>
          {product.id} - {product.name}
        </Typography>
        <Typography variant="body2" color="error" fontWeight={500}>
          LKR {product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="green" fontWeight={500}>
          Available: {product.availability}
        </Typography>
      </CardContent>
    </Card>
    );
};

export default PosProductCard;

