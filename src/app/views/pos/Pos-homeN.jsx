import React, { useState, useEffect } from "react";
import NavBar from "app/components/Pos/PosNavNew";
import { AppBar, Toolbar, Typography, Grid, Box, IconButton } from '@mui/material';  // Add IconButton here
import HomeIcon from '@mui/icons-material/Home';
import OrderIcon from '@mui/icons-material/Receipt';
import MenuIcon from '@mui/icons-material/Menu';
import WalletIcon from '@mui/icons-material/Wallet';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PosProductCard from '../../components/ProductCard/posProductCard';

const products = [
    { id: 'P3452', name: 'HP LAPTOP', price: 75000, availability: '170,000.667 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: 'P3453', name: 'RAM 4GB', price: 7000, availability: '58.000 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: '0013', name: 'test for qu..', price: 0, availability: '7.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '0036', name: 'test for ch..', price: 0, availability: '10.000 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: '009', name: 'TEST FOR GR..', price: 0, availability: '87.000 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: '010', name: 'Test For GR..', price: 0, availability: '14.000 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: '012', name: 'Test for GR..', price: 0, availability: '188.000 Kg', imageUrl: '/assets/images/sample.jpeg' },
    { id: '012365', name: 'test for ro..', price: 0, availability: '99.000 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: '013', name: 'test for cr..', price: 0, availability: '80.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '013', name: 'test for cr..', price: 0, availability: '80.000 Nos', imageUrl: '/assets/images/dulux.png' },
    { id: '013', name: 'test for cr..', price: 0, availability: '80.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
];

function PosHomeN() {
  return (
    <>
      <NavBar />
      <Grid container sx={{ height: `calc(100vh - 80px)` }}>
        <Grid item xs={2.2} sx={{ backgroundColor: '#ffffff' }}>
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            backgroundColor: '#fff',
            padding: '20px',
            
          }}>
            
            <Box sx={{
  position: 'absolute',
  top: '45px',
  width: '150px',
  height: '150px',
  overflow: 'hidden',
  borderRadius: '5%',
  backgroundColor: 'transparent', // Corrected backgroundColor
}}>
  <img src="assets/images/cashier5.png" alt="Employee" style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />
</Box>
            <Typography variant="h7" sx={{ marginTop: '80px', fontWeight: 'bold', color: '#000' }}>
              John Doe
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '40px',
              justifyItems: 'center',
              width: '70%',
            }}>
              <IconButton sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#FF1493',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}>
                <HomeIcon sx={{ color: '#fff' }} />
              </IconButton>
              <IconButton sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#FF1493',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}>
                <OrderIcon sx={{ color: '#fff' }} />
              </IconButton>
              <IconButton sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#FF1493',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}>
                <MenuIcon sx={{ color: '#fff' }} />
              </IconButton>
              <IconButton sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#FF1493',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}>
                <WalletIcon sx={{ color: '#fff' }} />
              </IconButton>
              <IconButton sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#FF1493',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}>
                <HistoryIcon sx={{ color: '#fff' }} />
              </IconButton>
              <IconButton sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#FF1493',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}>
                <PersonIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Box>
            <Box
  sx={{
    position: 'relative',
    top: '10px',
    width: '230px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '5%',
    zIndex: 5,
    backgroundColor: 'trasparent', // Ensure container has no background color
  }}
>
  <img
    src="assets/images/cashier4.png"
    alt="Employee"
    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} // Ensure image has no background color
  />
</Box>


            <Box sx={{ marginTop:'50px' }}>
      <IconButton
        sx={{
          backgroundColor: '#D32F2F',
          color: '#fff',
          width: '150px', // Long button width
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => console.log('Logout clicked')}
      >
        <ExitToAppIcon sx={{ marginRight: '10px' }} />
        <Typography sx={{ fontWeight: 'bold' }}>Logout</Typography>
      </IconButton>
    </Box>
          </Box>
        </Grid>
        <Grid item xs={6.3} sx={{ backgroundColor: '#ffffff', height: '100%' }}>
  <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        justifyItems: 'center',
        width: '95%',
        height: 'calc(100vh - 100px)', // This makes sure it fits within the height of the page minus some padding/margin
        overflowY: 'auto', // Enable scrolling only for the product section
        padding: '16px' // Optional: add some padding to the content
      }}>
        {products.map((product) => (
          <PosProductCard key={product.id} product={product} />
        ))}
    </Box>
  </Box>
</Grid>

        <Grid item xs={3.5} sx={{ backgroundColor: '#ffffff' }}>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Right Section
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PosHomeN;
