import React from "react";
import { Typography, Box, Rating, Button, TextField, Grid } from "@mui/material";
import ColorSelector from "../../components/ProductDetails/ColorSelector";
import SizeSelector from "../../components/ProductDetails/SizeSelector";
import QuantitySelector from "../../components/ProductDetails/QuantitySelector";
import DeliveryInfo from "../../components/ProductDetails/DeliveryInfo";
import ProductImages from "../../components/ProductDetails/ImageGrid";
import ProductGrid from "../../components/HomePage/PopularProducts";
import Footer from "../../components/ProductPage/Footer";


const ProductDetails = () => {
  return (
    <>
    <Grid container spacing={2} sx={{ padding: "0 20px" }}>
      <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: 501, ml:20 , maxHeight: 9 }}>
          <ProductImages />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: 501 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, letterSpacing: "0.72px", mb: 2 }}
          >
            Dulux Weather Guard
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Rating value={4.5} readOnly precision={0.5} />
            <Typography variant="body2">(150 Reviews)</Typography>
            <Typography variant="body2" color="success.main">
              In Stock
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 400, letterSpacing: "0.72px", mb: 3 }}
          >
            $192.00
          </Typography>
          <Typography variant="body2" mb={3}>
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </Typography>
          <Box sx={{ borderTop: "1px solid black", my: 3 }} />
          <ColorSelector />
          <SizeSelector />
          <Box display="flex" alignItems="center" gap={2} my={3}>
            <QuantitySelector />
            <Button variant="contained" color="error" sx={{ flexGrow: 1 }}>
              Buy Now
            </Button>
            <Button variant="outlined">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa9def9ca7809dc127749110b56d93aaeb78208b8aca3ad0069665c489173ab?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
                alt="Wishlist"
                width={24}
                height={24}
              />
            </Button>
          </Box>
          <DeliveryInfo />
        </Box>
      </Grid>
      <Box  maxWidth="1200px" 
      margin="0 auto" 
      padding="0 20px"
      mt={20}
      mb={10}>
      <ProductGrid Title="Related Products"/>
      </Box>
    </Grid>
    <Footer/>
    </>
  );
};

export default ProductDetails;
