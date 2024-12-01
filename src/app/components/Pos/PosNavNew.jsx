import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QRCodeIcon from '@mui/icons-material/QrCode';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBar = () => {
  const location = useLocation(); // Get current route
  const orderNumber = "ORD123456";

  // Check if the current route is the "pos-home" page
  const isPosHomePage = location.pathname === "/pos-home"; 

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff', // White background
        height: '80px',
        zIndex: 10, // Ensure it stays above other elements
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)' }}>
        
        {/* Left: Logo (clickable to go to home) */}
        <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'bold' }}>
            <img src="/assets/images/logos/HH01.png" alt="Logo" style={{ height: '40px' }} />
          </Typography>
        </Link>

        {/* Center: Search Bar and QR Code Button (only shown on pos-home page) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          {isPosHomePage && (
            <>
              {/* Search Bar */}
              <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                <InputBase
                  placeholder="Search Paint Items Or Accessories..."
                  sx={{
                    backgroundColor: '#f1f1f1',
                    padding: '5px 10px',
                    flex: 1,
                    fontFamily: `'Roboto', sans-serif`,
                    fontWeight: 700,
                  }}
                />

                {/* Icon Button for Search */}
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
                  }}
                  onClick={() => console.log('Search clicked')}
                >
                  <SearchIcon sx={{ color: '#000000' }} />
                </IconButton>
              </div>

              {/* QR Code Button */}
              <IconButton
                sx={{
                  color: '#000000',
                  marginLeft: '16px',
                  backgroundColor: '#FF1493',
                  width: '39px', // Square size
                  height: '39px',
                  borderTopLeftRadius: '0', // No rounding on left side
                  borderBottomLeftRadius: '0',
                  borderTopRightRadius: '0', // Rounded on the right side
                  borderBottomRightRadius: '0',
                }}
              >
                <QRCodeIcon />
              </IconButton>
            </>
          )}
        </div>

        {/* Right: Order Number */}
        {/* Add the order number if needed */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
