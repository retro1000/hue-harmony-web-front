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
              top: '65px',
              width: '90px',
              height: '90px',
              overflow: 'hidden',
              borderRadius: '5%',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
            }}>
              <img src="https://via.placeholder.com/120" alt="Employee" style={{ width: '100%', height: '100%' }} />
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
            <Box sx={{
              position: 'relative',
              top: '30px',
              width: '160px',
              height: '160px',
              overflow: 'hidden',
              borderRadius: '5%',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
              zIndex: 5,
            }}>
              <img src="https://via.placeholder.com/120" alt="Employee" style={{ width: '100%', height: '100%' }} />
            </Box>
            <Box sx={{ marginTop:'80px' }}>
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
        <Grid item xs={6.3} sx={{ backgroundColor: '#ffffff' }}>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Middle Section
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
