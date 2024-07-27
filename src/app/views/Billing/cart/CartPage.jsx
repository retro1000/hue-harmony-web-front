
import React from "react";
import { Container, Typography, Grid, Button, Divider } from "@mui/material";
import CartItem from "../../../components/CartPage/CartItem";
import CouponForm from "../../../components/CartPage/CouponForm";
import CartTotal from "../../../components/CartPage/CartTotal";

const CartPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CartItem
            image=""
            name="Item 1"
            price="$650"
            quantity={1}
            subtotal="$650"
          />
        </Grid>
        <Grid item xs={12}>
          <CartItem
            image=""
            name="Item 2"
            price="$550"
            quantity={2}
            subtotal="$1100"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" color="primary">
            Return To Shop
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button variant="outlined" color="primary">
            Update Cart
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "40px" }}>
        <Grid item xs={12} md={6}>
          <CouponForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <CartTotal subtotal="$1750" shipping="Free" total="$1750" />
        </Grid>
      </Grid>
      <Divider style={{ margin: "40px 0" }} />
    </Container>
  );
};

export default CartPage;
