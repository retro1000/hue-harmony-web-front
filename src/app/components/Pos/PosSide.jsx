import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import HomeIcon from '@mui/icons-material/Home';
import OrderIcon from '@mui/icons-material/Receipt';
import MenuIcon from '@mui/icons-material/Menu';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cashier5Image from '../../../images/cashier5.png';
import Cashier4Image from '../../../images/cashier4.png';

const ProfileSidebar = () => {
  return (
    <Grid item xs={2.2} sx={{ backgroundColor: "#ffffff" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        {/* Profile Image */}
        <Box
          sx={{
            position: "relative",
            width: "150px",
            height: "150px",
            overflow: "hidden",
            borderRadius: "5%",
            backgroundColor: "transparent",
          }}
        >
          <img
            src={Cashier5Image}
            alt="Employee"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
          />
        </Box>
        <Typography
          variant="h7"
          sx={{
            fontWeight: "bold",
            color: "#000",
            font: "Roboto, Arial, sans-serif",
          }}
        >
          Jhon Doe
        </Typography>

        {/* Icon Buttons with Routes */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            marginTop: "20px",
            justifyItems: "center",
            width: "70%",
          }}
        >
          <Link to="/pos-home" style={linkStyle}>
            <IconButton sx={iconStyle}>
              <HomeIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
          <Link to="/pos/order-list" style={linkStyle}>
            <IconButton sx={iconStyle}>
              <OrderIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
         
          <Link to="/pos/sales-summary" style={linkStyle}>
            <IconButton sx={iconStyle}>
              <WalletIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
          <Link to="/pos/order-details" style={linkStyle}>
            <IconButton sx={iconStyle}>
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
          <Link to="/history" style={linkStyle}>
            <IconButton sx={iconStyle}>
              <HistoryIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
          <Link to="/profile" style={linkStyle}>
            <IconButton sx={iconStyle}>
              <PersonIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
        </Box>

        {/* Second Image (Employee) */}
        <Box
          sx={{
            position: "relative",
            top: "6px",
            width: "210px",
            height: "190px",
            overflow: "hidden",
            borderRadius: "5%",
            zIndex: 5,
            backgroundColor: "transparent",
          }}
        >
          <img
            src={Cashier4Image}
            alt="Employee"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
            }}
          />
        </Box>

        {/* Logout Button */}
        <Box sx={{ marginTop: "17px" }}>
          <IconButton
            sx={{
              backgroundColor: "#D32F2F",
              color: "#fff",
              width: "150px",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => console.log("Logout clicked")}
          >
            <ExitToAppIcon sx={{ marginRight: "10px" }} />
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, Arial, sans-serif !important",
              }}
            >
              Logout
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
};

// Common style for IconButton
const iconStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#E40087",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  '&:hover': {
    backgroundColor: "#E40087",
  }
};

// Link style
const linkStyle = {
  textDecoration: 'none', // Remove underline
  color: 'inherit', // Preserve button colors
};

export default ProfileSidebar;
