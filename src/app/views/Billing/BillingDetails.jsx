
import React, {useEffect, useState} from "react";
import { Container, Grid, Paper } from "@mui/material";
import BillingDetailsHeader from "../../components/BillingDetails/BillingDetailsHeader";
import BillingForm from "../../components/BillingDetails/BillingForm";
import OrderSummary from "../../components/BillingDetails/OrderSummary";
import Footer from "../../components/ProductPage/Footer";
import {useLocation} from "react-router-dom";
import {useAxios} from "../../hooks/useAxios";

const BillingDetails = () => {

  const [products, setProduct] = useState({})

  const [cardDetails, setCardDetails] = useState({
    cardType: '',
    offset: '',
    expireDate: '',
    token: ''
  })

  const [orderDetails, setOrderDetails] = useState({
    firstName: '',
    lastName: '',
    orderNote: '',
    shippingAddress: '',
    billingAddress: '',
    emailAddress: '',
    contactNos: [],
    paymentMethod: ''
  })

  const location = useLocation();
  const { state } = location || {};

  const { api } = useAxios()

  useEffect(() => {
    if(!state || Object.keys(state).length===0){
      //nav to 404
      return
    }

    setProduct(state?.products)
  }, []);

  const isObjectEmpty = (obj) => {
    return Object.values(obj).every(value => {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return value === '' || value === null || value === undefined || value.length === 0;
    });
  };

  const placeOrder = () => {
    !isObjectEmpty(orderDetails) &&
    orderDetails.paymentMethod === 'CARD' &&
    !isObjectEmpty(cardDetails) &&
        api.post(
            '/place-order/online',
            {
              ...orderDetails,
              ...(orderDetails.paymentMethod === 'CARD' ? {linkedCardDto : cardDetails} : {}),
              ...(state?.type === 'cart' ? {cartItems: products} : products)
            })
              .then(response => {
                if(response.status===200){

                }
              })
              .catch(error => {

              })
              .finally(() => {})
  }

  return (
    <>
      <Container maxWidth="lg">
        <BillingDetailsHeader />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <BillingForm orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <OrderSummary
                  products={products}
                  setProducts={setProduct}
                  placeOrder={placeOrder}
                  cardDetails={cardDetails}
                  setCardDetails={setCardDetails}
              />
            </Paper>
          </Grid>
        </Grid>

      </Container>
      <Footer/>
    </>
  );
};

export default BillingDetails;
