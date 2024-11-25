import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Grid, Container, styled } from "@mui/material";
import { BiPackage } from "react-icons/bi";
import { motion } from "framer-motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  margin: "10px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)"
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)"
  }
}));

const OrderDetails = () => {
  const orderData = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      image: "images.unsplash.com/photo-1633332755192-727a05c4013d"
    },
    delivery: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    products: [
      { id: 1, name: "Wireless Headphones", quantity: 1, price: 199.99 },
      { id: 2, name: "Smart Watch", quantity: 1, price: 299.99 },
      { id: 3, name: "Bluetooth Speaker", quantity: 2, price: 89.99 }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            mb: 4
          }}
        >
          <BiPackage style={{ marginRight: "10px", verticalAlign: "middle" }} />
          Order Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  src={`https://${orderData.user.image}`}
                  alt={orderData.user.name}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" component="h2">
                    {orderData.user.name}
                  </Typography>
                  <Typography color="text.secondary">{orderData.user.email}</Typography>
                  <Typography color="text.secondary">{orderData.user.phone}</Typography>
                </Box>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" component="h2" gutterBottom>
                Delivery Address
              </Typography>
              <Typography paragraph>
                {orderData.delivery.address}<br />
                {orderData.delivery.city}, {orderData.delivery.state} {orderData.delivery.zipCode}<br />
                {orderData.delivery.country}
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>

        <StyledPaper elevation={3} sx={{ mt: 3 }}>
          <TableContainer>
            <Table aria-label="order products table">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle1" fontWeight="bold">Product</Typography></TableCell>
                  <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Quantity</Typography></TableCell>
                  <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Price</Typography></TableCell>
                  <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Total</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.products.map((product) => (
                  <StyledTableRow key={product.id}>
                    <TableCell component="th" scope="row">{product.name}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right">${(product.quantity * product.price).toFixed(2)}</TableCell>
                  </StyledTableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Typography variant="subtitle1" fontWeight="bold">Total Amount:</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${orderData.products.reduce((sum, product) => sum + (product.quantity * product.price), 0).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>
      </motion.div>
    </Container>
  );
};

export default OrderDetails;