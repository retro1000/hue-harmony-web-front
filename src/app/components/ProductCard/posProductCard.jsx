import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';

const PosProductCard = ({ product, addToCart }) => {
  return (
    <Card 
      sx={{
        maxWidth: 400, 
        width: '100%', 
        height: 180,
        backgroundColor: 'white', 
        padding: 0.5, 
        display: 'flex',
        flexDirection: 'column',   
        margin: '5px',
        alignItems: 'center',
        boxShadow: 4,
        cursor: 'pointer',  // Change cursor to pointer to indicate it's clickable
      }} 
      onClick={() => addToCart(product)} // Add to cart when the card is clicked
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.imageUrl} 
        alt={product.name}
        sx={{ 
          width: 100,   
          height: '90%', 
          objectFit: 'contain', 
          objectPosition: 'center'
        }}
      />
      
      {/* Product Details */}
      <CardContent sx={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',  
        alignItems: 'center',
        paddingLeft: '16px',  
        paddingBottom: '0 !important' 
      }}>
        <Typography variant="h6" color="grey.800" fontWeight={600}>
          {product.name}
        </Typography>
        <Typography 
          variant="body1" 
          color="error" 
          fontWeight={500} 
          sx={{ marginTop: '1px' }} 
        >
          LKR {product.price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PosProductCard;
