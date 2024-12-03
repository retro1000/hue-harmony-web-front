import React from "react";
import { Box, Typography, Grid, Breadcrumbs, Link } from "@mui/material";

const ProductImages = ({ images }) => {
  if (!images || images.length === 0) {
    return <Typography>No images available</Typography>;
  }

  return (
    <Box maxWidth="700px">
      <Box sx={{ margin: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href="/my-account">
            Product
          </Link>
          <Typography color="textPrimary">Product Details</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column" gap={2}>
            {images.map((image, index) => (
              <Box
                key={index}
                borderRadius={1}
                overflow="hidden"
                height={138}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
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
            <img
              src={images[0]}
              alt="Main product"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductImages;
