import React from 'react';
import PosNav from 'app/components/Pos/PosNav';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Card, CardContent, Grid, Typography} from '@mui/material';
import { IconButton, Button } from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { styled } from '@mui/system';
import NavBar from "app/components/Pos/PosNavNew";
import HomeIcon from "@mui/icons-material/Home";
import OrderIcon from "@mui/icons-material/Receipt";
import MenuIcon from "@mui/icons-material/Menu";
import WalletIcon from "@mui/icons-material/Wallet";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PosProductCard from "../../components/ProductCard/posProductCard";
import PaintIcon from "@mui/icons-material/Brush"; // Example icon for "Paint" category
import ColorLensIcon from "@mui/icons-material/ColorLens"; // Example icon for "Color" category
import PaletteIcon from "@mui/icons-material/Palette"; // Example icon for "Palette" category
import FilterHdrIcon from "@mui/icons-material/FilterHdr"; // Example icon for "Finish" category
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";


 function SalesSummary(){
    const DataBox = styled(Box)(({ bgcolor }) => ({
        backgroundColor: bgcolor,
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }));
    
      const data = [
        {
          value: '0.00',
          label: 'TOTAL SALES (TODAY)',
          icon: '💰',
          bgcolor: '#4CAF50',
          gridProps: { xs: 12 },
        },
        {
          value: '0.00',
          label: 'CASH SALES (TODAY)',
          icon: '💵',
          bgcolor: '#66BB6A',
          gridProps: { xs: 12, sm: 6 },
        },
        {
          value: '0.00',
          label: 'CARD PAYMENTS (TODAY)',
          icon: '💳',
          bgcolor: '#4CAF50',
          gridProps: { xs: 12, sm: 6 },
        },
        {
          value: '0.00',
          label: 'LOYALTY/DISCOUNTS (TODAY)',
          icon: '➖',
          bgcolor: '#E57373',
          gridProps: { xs: 12 },
        },
      ];
    
    return(
      <>
     
             <NavBar/>
             <Grid container sx={{ height: `calc(100vh - 90px)` }}>
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
            <Box
              sx={{
                position: "relative",
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "5%",
                backgroundColor: "transparent", // Corrected backgroundColor
              }}
            >
              <img
                src="assets/images/cashier5.png"
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
              John Doe
            </Typography>
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
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <HomeIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <OrderIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MenuIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <WalletIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <HistoryIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <PersonIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                position: "relative",
                top: "6px",
                width: "210px",
                height: "190px",
                overflow: "hidden",
                borderRadius: "5%",
                zIndex: 5,
                backgroundColor: "trasparent", // Ensure container has no background color
              }}
            >
              <img
                src="assets/images/cashier4.png"
                alt="Employee"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }} // Ensure image has no background color
              />
            </Box>

            <Box sx={{ marginTop: "17px" }}>
              <IconButton
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "#fff",
                  width: "150px", // Long button width
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
        <Grid item xs={2.2} sx={{ backgroundColor: "#ffffff" }}>
             <Box sx={{ p: 15 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item {...item.gridProps} key={index}>
            <DataBox bgcolor={item.bgcolor}>
              <Typography variant="h2" component="div" sx={{ marginRight: 2 }}>
                {item.icon}
              </Typography>
              <Box>
                <Typography variant="h2" component="div">
                  {item.value}
                </Typography>
                <Typography variant="h6" component="div">
                  {item.label}
                </Typography>
              </Box>
            </DataBox>
          </Grid>
        ))}
      </Grid>
      </Grid>
    </Box>
    </Grid>
             </>   
    );
 }

 export default SalesSummary;