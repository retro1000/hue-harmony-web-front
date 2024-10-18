import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';

const PosProductCard = ({ product }) => {
    return (
      <Card sx={{ 
        maxWidth: 400,  // Larger width
        width: '100%',  // Full width of its container
        height: 180,    // Height increased for content space
        backgroundColor: 'white', 
        padding: 0.5, 
        display: 'flex',
        flexDirection: 'column',   // Layout horizontally for readability // Ensure box shadow shows up
        margin: '5px',
        alignItems: 'center',
    }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          image={product.imageUrl} 
          alt={product.name}
          sx={{ 
            width: 100,   // Fixed width for image
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
          alignItems:'center',
          paddingLeft: '16px',  // Spacing between image and content
          paddingBottom: '0 !important' // Remove bottom padding
        }}>
          <Typography variant="h6" color="grey.800" fontWeight={600} fontFamily={`'lato', sans-serif`}>
            {product.name}
          </Typography>
          <Typography 
            variant="body1" 
            color="error" 
            fontWeight={500} 
            sx={{ marginTop: '1px' }} // Adjust the gap between text and price
          >
            LKR {product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    );
};

export default PosProductCard;
