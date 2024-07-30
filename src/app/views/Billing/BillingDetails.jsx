
import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import BillingDetailsHeader from "../../components/BillingDetails/BillingDetailsHeader";
import BillingForm from "../../components/BillingDetails/BillingForm";
import OrderSummary from "../../components/BillingDetails/OrderSummary";
import Footer from "../../components/ProductPage/Footer";

const BillingDetails = () => {
  return (
    <>
    <Container maxWidth="lg">
      <BillingDetailsHeader />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <BillingForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <OrderSummary />
          </Paper>
        </Grid>
      </Grid>
      
    </Container>
    <Footer/>
    </>
  );
};

export default BillingDetails;
