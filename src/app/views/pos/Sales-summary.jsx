import React, { useEffect, useState } from "react";
import PosNav from "app/components/Pos/PosNav";
import ProfileSidebar from "app/components/Pos/PosSide";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { IconButton, Button } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { styled } from "@mui/system";
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
import { useAxios } from "../../hooks/useAxios";
import useAuth from "app/hooks/useAuth";

function SalesSummary() {
  const [salesData, setSalesData] = useState({
    totalSales: "0.00",
    cashSales: "0.00",
    cardPayments: "0.00",
    discounts: "0.00",
  });
  const { api, apiNonAuth } = useAxios();

  const { user, role } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNonAuth.get(
          "http://localhost:8080/pos/get-sales-summary/123"
        );
        const data = response.data;
        setSalesData({
          totalSales: data.total+".0" || "0.00",
          cashSales: data.cash+".0"  || "0.00",
          cardPayments: data.debit+".0" || "0.00",
          discounts: data.discount || "0.00",
        });
      } catch (error) {
        console.error("Error fetching sales summary:", error);
      }
    };

    fetchData();
  }, []);

  const DataBox = styled(Box)(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  }));

  const data = [
    {
      value: salesData.totalSales,
      label: "TOTAL SALES (TODAY)",
      icon: "💰",
      bgcolor: "#D1E7DD",
      gridProps: { xs: 12 },
    },
    {
      value: salesData.cashSales,
      label: "CASH SALES (TODAY)",
      icon: "💵",
      bgcolor: "#FFC0CB",
      gridProps: { xs: 12, sm: 6 },
    },
    {
      value: salesData.cardPayments,
      label: "CARD PAYMENTS (TODAY)",
      icon: "💳",
      bgcolor: "#FBEAEF",
      gridProps: { xs: 12, sm: 6 },
    },
    {
      value: salesData.discounts,
      label: "LOYALTY/DISCOUNTS (TODAY)",
      icon: "➖",
      bgcolor: "#D6E9F3",
      gridProps: { xs: 12 },
    },
  ];

  return (
    <>
      <NavBar />
      <Grid container sx={{ height: `calc(100vh - 80px)`, overflow: "hidden" }}>
       <ProfileSidebar/>
        <Grid item xs={9.8} sx={{ backgroundColor: "#ffffff",height:"100%" }}>
          <Box
            sx={{
              p: { xs: 4, sm: 8, md: 12 }, // Responsive padding
              height: "100%",
              borderLeft: "4px solid #e0e0e0",
              bgcolor: "#f9f9f9",
              display:'flex',
              justifyContent:'flex-start',
              flexDirection:'column' // Subtle background color
            }}
          >
            <Box>
            {/* Title Section */}
            <Typography 
              variant="h3" 
              sx={{
                fontWeight: 'bold', 
                mb: 4, 
                color: 'primary.main', 
                textAlign: 'center',
                width: '100%',
              }}
            >
              Sales Summary
            </Typography>
            </Box>

            <Grid container spacing={6}>
              {" "}
              {/* Increased spacing between items */}
              {data.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6} // Two boxes per row
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 4, // Increased padding for larger size
                      borderRadius: 3,
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)", // Soft shadow
                      bgcolor: item.bgcolor || "white", // Dynamic background color
                      width: "100%",
                      maxWidth: 600, // Larger maximum width
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)", // Bigger hover effect
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
                      },
                    }}
                  >
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        color: "primary.main",
                        marginRight: 4,
                        fontSize: { xs: "2.5rem", sm: "3.5rem" }, // Larger font size
                      }}
                    >
                      {item.icon}
                    </Typography>
                    <Box>
                      <Typography
                        variant="h4" // Larger value text
                        component="div"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        {item.value}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default SalesSummary;
