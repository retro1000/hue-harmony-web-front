import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Container,
  styled,
  IconButton,
} from "@mui/material";
import NavBar from "app/components/Pos/PosNavNew";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import WalletIcon from "@mui/icons-material/Wallet";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  margin: "10px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}));

const OrderDetails = () => {
  const orderData = {
    paymentMethod: "Credit Card",
    discountAmount: 50.0,
    products: [
      { id: 1, name: "Wireless Headphones", quantity: 1, price: 199.99 },
      { id: 2, name: "Smart Watch", quantity: 1, price: 299.99 },
      { id: 3, name: "Bluetooth Speaker", quantity: 2, price: 89.99 },
    ],
  };

  const total = orderData.products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const subtotal = total - orderData.discountAmount;

  return (
    <>
      <NavBar />
      <Grid container sx={{ height: "calc(100vh - 90px)", overflow: "hidden" }}>
        <Grid item xs={2.2} sx={{ backgroundColor: "#ffffff" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "5%",
              }}
            >
              <img
                src="assets/images/cashier5.png"
                alt="Employee"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Typography
              variant="h7"
              sx={{
                fontWeight: "bold",
                color: "#000",
                font: "Roboto, Arial, sans-serif",
              }}
            >
              John Doe
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                marginTop: "20px",
                justifyItems: "center",
                width: "70%",
              }}
            >
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  borderRadius: "10px",
                }}
              >
                <HomeIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  borderRadius: "10px",
                }}
              >
                <MenuIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  borderRadius: "10px",
                }}
              >
                <WalletIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  borderRadius: "10px",
                }}
              >
                <HistoryIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  borderRadius: "10px",
                }}
              >
                <PersonIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box sx={{ marginTop: "17px" }}>
              <IconButton
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "#fff",
                  width: "150px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => console.log("Logout clicked")}
              >
                <ExitToAppIcon sx={{ marginRight: "10px" }} />
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={9.8} sx={{ backgroundColor: "#ffffff", height: "100%" }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "primary.main",
                mb: 4,
              }}
            >
              Order Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledPaper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  <Typography>Total: ${total.toFixed(2)}</Typography>
                  <Typography>Payment Method: {orderData.paymentMethod}</Typography>
                  <Typography>Discount: ${orderData.discountAmount.toFixed(2)}</Typography>
                  <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
                </StyledPaper>
              </Grid>

              <Grid item xs={12}>
                <StyledPaper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    Ordered Products
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderData.products.map((product) => (
                          <StyledTableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </StyledPaper>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetails;
