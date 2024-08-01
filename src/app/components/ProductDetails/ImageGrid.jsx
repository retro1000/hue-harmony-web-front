import React from "react";
import { Box, Typography, Grid,Breadcrumbs, Link } from "@mui/material";

const ProductImages = () => {
  return (
    <Box maxWidth="700px">
      <Box
        sx={{
          margin : 3
        }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Account
            </Link>
            <Link color="inherit" href="/my-account">
              My Account
            </Link>
            <Link color="inherit" href="/product">
              Product
            </Link>
            <Link color="inherit" href="/view-cart">
              View Cart
            </Link>
            <Typography color="textPrimary">CheckOut</Typography>
          </Breadcrumbs>
          </Box>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              borderRadius={1}
              overflow="hidden"
              height={138}
            >
              <img src="assets/images/2099.jpg" alt="Thumbnail 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box
              borderRadius={1}
              overflow="hidden"
              height={138}
            >
              <img src="assets/images/2099.jpg" alt="Thumbnail 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box
              borderRadius={1}
              overflow="hidden"
              height={138}
            >
              <img src="assets/images/2099.jpg" alt="Thumbnail 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box
              borderRadius={1}
              overflow="hidden"
              height={138}
            >
              <img src="assets/images/2099.jpg" alt="Thumbnail 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            borderRadius={1}
            overflow="hidden"
            width="100%"
            height={600}
            maxWidth={500}
            mx="auto"
          >
            <img src="assets/images/2099.jpg" alt="Main product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductImages;
