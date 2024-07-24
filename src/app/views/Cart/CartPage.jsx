
import React from "react";
import { Container, Typography, Grid, Button, TextField, Box, useTheme } from "@mui/material";
import CartItem from "../../components/CartPage/CartItem";
import CartSummary from "../../components/CartPage/CartSummary";
import TableHeader from "../../components/CartPage/TableHeader";



const CartPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <br></br>
          <Typography variant="h4" gutterBottom>
            Cart
          </Typography>
        <Box
        sx={{
          borderRadius: '4px',
          boxShadow: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)',
          backgroundColor: 'background.paper',
          display: 'flex',
          marginTop: { xs: '10px', md: '20px' },
          marginRight: { xs: theme.spacing(2.5), md: theme.spacing(50) },
          flexDirection: 'column',
          fontSize: '16px',
          color: 'text.primary',
          fontWeight: 400,
          lineHeight: 1.5,
          padding: { xs: '0 20px', md: '24px 40px' },
        }}
      >
        <TableHeader />
      </Box>
      </Grid>
        <Grid item xs={12} md={8}>
          <CartItem
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/ecaf71de30ae2ffbd2324a014bf37809c3b4a887c259439b1ee178a68c5e8be2?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
            name="Item 1"
            price={650}
            quantity={1}
          />
          <CartItem
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/765f612835b33f4074d36487bb64ddecf771224817c937a3cdad122532bda994?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
            name="Item 2"
            price={550}
            quantity={2}
          />
          <Grid container spacing={2} justifyContent="space-between" mt={3}>
            <Grid item>
              <Button variant="outlined">Return To Shop</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Update Cart</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Coupon Code"
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth>
            Apply Coupon
          </Button>
          <CartSummary subtotal={1750} shipping="Free" total={1750} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
