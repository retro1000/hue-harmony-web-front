
import React from "react";
import { Container, Typography, Grid, Button, Divider,Breadcrumbs,Link,Box } from "@mui/material";
import ProductGrid from "../../components/wishlist/WishProducts";
import Footer from "../../components/ProductPage/Footer";
import Header from "../../components/wishlist/wishHeader"

const CartPage = () => {
  return (
    <>
    <Container maxWidth="lg">
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
      <Box sx={{pt:2}}>
      <Header title={"Wishlist"}/>
      </Box>
      </Box>
      <ProductGrid/>
      <Box sx={{pt:2}}>
      <Header title={"Just for you"}/>
      </Box>
      <ProductGrid/>
    </Container>
    <Footer/>
    </>
  );
};

export default CartPage;
