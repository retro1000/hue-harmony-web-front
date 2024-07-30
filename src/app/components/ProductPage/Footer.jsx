
import React from "react";
import { Box, Typography, TextField, Grid, IconButton } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        width: "100%",
        mt: 5,
        p: "80px 0 24px",
      }}
    >
      <Grid
        container
        spacing={2.5}
        sx={{ maxWidth: 1167, mx: "auto", px: 2.5 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            sx={{ color: "#fafafa", fontWeight: 700, mb: 3.375 }}
          >
            Exclusive
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fafafa", fontWeight: 500, mb: 3 }}
          >
            Subscribe
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Get 10% off your first order
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              p: 1.5,
              border: "2px solid #fafafa",
              borderRadius: 0.5,
            }}
          >
            <TextField
              variant="standard"
              placeholder="Enter your email"
              InputProps={{ disableUnderline: true }}
              sx={{ flex: 1, color: "#fafafa" }}
            />
            <IconButton>
              <img
                src="http://b.io/ext_38-"
                alt="Send"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fafafa", fontWeight: 500, mb: 3 }}
          >
            Support
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            email@gmail.com
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            +88015-88888-9999
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fafafa", fontWeight: 500, mb: 3 }}
          >
            Account
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            My Account
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Login / Register
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Cart
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Wishlist
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Shop
          </Typography>
          
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fafafa", fontWeight: 500, mb: 3 }}
          >
            Quick Link
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Terms Of Use
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            FAQ
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Contact
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fafafa", fontWeight: 500, mb: 3 }}
          >
            Quick Link
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Terms Of Use
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            FAQ
          </Typography>
          <Typography variant="body2" sx={{ color: "#fafafa", mb: 2 }}>
            Contact
          </Typography>
        </Grid>
      </Grid>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4.5,
          color: "#fff",
        }}
      >
        
        <Typography variant="body2">
        &copy; Copyright Paints 2024. All right reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
