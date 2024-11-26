import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QRCodeIcon from '@mui/icons-material/QrCode';


const NavBar = () => {
  // Replace with actual order number
  const orderNumber = "ORD123456";

  return (
<AppBar
  position="static"
  sx={{
    backgroundColor: '#ffffff', // White background// Strong black shadow with high opacity
    height: '80px',
    zIndex: 10, // Ensure it stays above other elements
  }}
>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',height: '80px',boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)' }}>
        
        {/* Left: Logo */}
        <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'bold' }}>
          <img src="/assets/images/logos/HH01.png" alt="Logo" style={{ height: '40px' }} />
        </Typography>

        {/* Center: Search Bar and QR Code Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
  {/* Input Base */}
  <InputBase
    placeholder="Search Paint Items Or Accessories..."
    sx={{
      backgroundColor: '#f1f1f1',
      padding: '5px 10px',
      flex: 1,
     fontFamily: `'Roboto', sans-serif`,
     fontWeight: 700
      
    }}
  />

  {/* Icon Button */}
  <IconButton
    sx={{
      backgroundColor: '#FF1493', // Background for the icon button
      width: '39px', // Square size
      height: '39px',
      padding: '0',
      borderTopLeftRadius: '0', // No rounding on left side
      borderBottomLeftRadius: '0',
      borderTopRightRadius: '0', // Rounded on the right side
      borderBottomRightRadius: '0',
       // Add a border to separate
    }}
    onClick={() => console.log('Search clicked')}
  >
    <SearchIcon sx={{ color: '#000000' }} />
  </IconButton>
</div>

          
          <IconButton sx={{ color: '#000000', marginLeft: '16px', backgroundColor: '#FF1493', // Background for the icon button
      width: '39px', // Square size
      height: '39px',borderTopLeftRadius: '0', // No rounding on left side
      borderBottomLeftRadius: '0',
      borderTopRightRadius: '0', // Rounded on the right side
      borderBottomRightRadius: '0' }}>
            <QRCodeIcon />
          </IconButton>
        </div>

        {/* Right: Order Number */}
       
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

