import React, { useState } from "react";
import {
  Typography,
  Grid,
  Divider,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import { useFormatter } from "../../hooks/useFormatter";

const OrderSummary = ({
                        cardDetails,
                        products,
                        setProducts,
                        placeOrder,
                        setCardDetails,
                        setOrderDetails,
                        orderDetails,
                      }) => {

    const { formatToLKR } = useFormatter();

    // Handle increment
    const incrementQuantity = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    // Handle decrement
    const decrementQuantity = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    // Handle delete
    const deleteProduct = (id) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    // Calculate subtotal
    const calculateSubtotal = () =>
        products && products.length > 0
            ? products.reduce((sum, product) => sum + product.price * product.quantity, 0)
            : 0;

  return (
      <>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                      Order Summary
                  </Typography>
              </Grid>
              {products &&
                  products.length > 0 &&
                  products.map((product) => (
                      <React.Fragment key={product.id}>
                          <Grid item xs={12} sm={6} display="flex" alignItems="center">
                              <Box
                                  component="img"
                                  src={product.productImage}
                                  alt={product.productName}
                                  sx={{ width: 50, height: 50, marginRight: 2 }}
                              />
                              <Typography>{product.productName}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                              <Grid container alignItems="center">
                                  <IconButton
                                      onClick={() => decrementQuantity(product.id)}
                                      color="primary"
                                      size="small"
                                  >
                                      <RemoveIcon />
                                  </IconButton>
                                  <Typography variant="body1">{product.quantity}</Typography>
                                  <IconButton
                                      onClick={() => incrementQuantity(product.id)}
                                      color="primary"
                                      size="small"
                                  >
                                      <AddIcon />
                                  </IconButton>
                              </Grid>
                          </Grid>
                          <Grid item xs={12} sm={3} display="flex" justifyContent="space-between" alignItems="center">
                              <Typography align="right" sx={{ marginRight: 2 }}>
                                  {formatToLKR(product.price * product.quantity)}
                              </Typography>
                              <IconButton
                                  onClick={() => deleteProduct(product.id)} // Add delete button
                                  color="error"
                                  size="small"
                              >
                                  <DeleteIcon />
                              </IconButton>
                          </Grid>
                      </React.Fragment>
                  ))}
              <Grid item xs={12}>
                  <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography>Subtotal:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography align="right">{formatToLKR(calculateSubtotal())}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography>Shipping:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography align="right">{formatToLKR(400)}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Typography variant="h6" align="right">
                      {formatToLKR(calculateSubtotal()+400)}
                  </Typography>
              </Grid>
              {/*<Grid item xs={12}>*/}
              {/*  <Button*/}
              {/*      variant="contained"*/}
              {/*      sx={{ backgroundColor: "#ED005D", color: "#fff" }}*/}
              {/*      fullWidth*/}
              {/*  >*/}
              {/*    Apply Coupon*/}
              {/*  </Button>*/}
              {/*</Grid>*/}
          </Grid>
      </>
  );
};

export default OrderSummary;
