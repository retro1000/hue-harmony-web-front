import React, { useState, useEffect } from "react";
import NavBar from "app/components/Pos/PosNavNew";
import { Typography, Grid, Box, IconButton, Button } from "@mui/material"; // Add IconButton here
import HomeIcon from "@mui/icons-material/Home";
import OrderIcon from "@mui/icons-material/Receipt";
import MenuIcon from "@mui/icons-material/Menu";
import WalletIcon from "@mui/icons-material/Wallet";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PosProductCard from "../../components/ProductCard/posProductCard";
import PaintIcon from "@mui/icons-material/Brush"; // Example icon for "Paint" category
import ColorLensIcon from "@mui/icons-material/ColorLens"; // Example icon for "Color" category
import PaletteIcon from "@mui/icons-material/Palette"; // Example icon for "Palette" category
import FilterHdrIcon from "@mui/icons-material/FilterHdr"; // Example icon for "Finish" category
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Save, Payment, Cancel } from "@mui/icons-material";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

const products = [
  {
    id: "P3452",
    name: "HP LAPTOP",
    price: 75000,
    availability: "170,000.667 Nos",
    imageUrl: "/assets/images/dulux.png",
    discount: 10,
  },
  {
    id: "P3454",
    name: "HP LAPTOP",
    price: 65000,
    availability: "170,000.667 Nos",
    imageUrl: "/assets/images/dulux.png",
    discount: 0,
  },
];

function PosHomeN() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // Format the date (MM/DD/YYYY or based on locale)
    const formattedTime = now.toLocaleTimeString(); // Format the time (HH:MM AM/PM)
    setCurrentDate(`${formattedDate}, ${formattedTime}`);
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product already exists in the cart, update quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new product, add it to the cart
        const discountAmount = product.discount
          ? (product.price * product.discount) / 100
          : 0;
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
            discountAmount,
          },
        ];
      }
    });
  };

  // Increase item quantity
  const increaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      subtotal: calculateSubtotal(),
      totalDiscount: calculateTotalDiscount(),
      total: getTotal(),
      paymentMethod: selectedPaymentMethod,
    };

    // try {
    //   const response = await axios.post("/api/checkout", checkoutData);
    //   console.log("Checkout successful:", response.data);
    // } catch (error) {
    //   console.error("Checkout failed:", error.response?.data || error.message);
    // }
  };


  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const [openCashDialog, setOpenCashDialog] = useState(false);
  const [openCardDialog, setOpenCardDialog] = useState(false);

  const handleOpenCashDialog = () => setOpenCashDialog(true);
  const handleCloseCashDialog = () => setOpenCashDialog(false);

  const handleOpenCardDialog = () => setOpenCardDialog(true);
  const handleCloseCardDialog = () => setOpenCardDialog(false);

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateSubtotal = () =>
    cartItems.reduce(
      (acc, item) => acc + item.quantity * (item.price - item.discountAmount),
      0
    );

  const calculateTotalDiscount = () => {
    return cartItems
      .reduce(
        (acc, item) => acc + item.quantity * (item.discountAmount || 0),
        0
      )
      .toFixed(2);
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <>
      <NavBar />
      <Grid container sx={{ height: `calc(100vh - 90px)` }}>
        <Grid item xs={2.2} sx={{ backgroundColor: "#ffffff" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              backgroundColor: "#fff",
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
                backgroundColor: "transparent", // Corrected backgroundColor
              }}
            >
              <img
                src="assets/images/cashier5.png"
                alt="Employee"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <HomeIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <OrderIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MenuIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <WalletIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <HistoryIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <PersonIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                position: "relative",
                top: "6px",
                width: "210px",
                height: "190px",
                overflow: "hidden",
                borderRadius: "5%",
                zIndex: 5,
                backgroundColor: "trasparent", // Ensure container has no background color
              }}
            >
              <img
                src="assets/images/cashier4.png"
                alt="Employee"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }} // Ensure image has no background color
              />
            </Box>

            <Box sx={{ marginTop: "17px" }}>
              <IconButton
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "#fff",
                  width: "150px", // Long button width
                  padding: "10px 20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => console.log("Logout clicked")}
              >
                <ExitToAppIcon sx={{ marginRight: "10px" }} />
                <Typography sx={{ fontWeight: "bold" }}>Logout</Typography>
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6.3} sx={{ backgroundColor: "#ffffff", height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              borderLeft: "4px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                padding: "14px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2, // Adding elevation for shadow effect
                marginTop: "20px",
                width: "90%",
                // Optional: Adjust top margin if needed
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "16px",
                  fontFamily: "Roboto, Arial, sans-serif",
                }}
              >
                Choose Category
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: 3, // Simulating elevation (elevation 3)
                    "&:hover": {
                      boxShadow: 6, // Elevation on hover
                    },
                    border: "none", // Remove the blue border
                  }}
                  startIcon={<PaintIcon />}
                >
                  Paint
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                    border: "none",
                  }}
                  startIcon={<ColorLensIcon />}
                >
                  Color
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                    border: "none",
                  }}
                  startIcon={<PaletteIcon />}
                >
                  Palette
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                    border: "none",
                  }}
                  startIcon={<FilterHdrIcon />}
                >
                  Finish
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                    border: "none",
                  }}
                  startIcon={<FormatPaintIcon />}
                >
                  Wall Paint
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                justifyItems: "center",
                width: "95%",
                height: "calc(100vh - 170px)", // This makes sure it fits within the height of the page minus some padding/margin
                overflowY: "auto", // Enable scrolling only for the product section
                padding: "16px",
                marginTop: "20px",
                marginBottom: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                // Optional: add some padding to the content
              }}
            >
              {products.map((product) => (
                <PosProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={3.5} sx={{ backgroundColor: "#ffffff" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
              borderLeft: "4px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                borderRadius: "8px",
                padding: "5px",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: 1, // Adding elevation for shadow effect
                width: "95%",
                marginTop: "15px",
                // Optional: Adjust top margin if needed
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                New Order Bill
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "grey", marginLeft: "10px" }}
              >
                {currentDate} {/* Display current date and time */}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "65vh",
                width: "97%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              {cartItems.length === 0 ? (
                <Box
                  sx={{
                    height: "50vh",
                    overflowY: "auto",
                    padding: "16px",
                    width: "95%",
                    marginTop: "1px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4" color="textSecondary">
                    Add items to cart
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "50vh",
                    overflowY: "auto",
                    padding: "16px",
                    width: "95%",
                    marginTop: "1px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "7px",
                  }}
                >
                  {cartItems.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        padding: "3px 10px 3px 13px",
                        backgroundColor: "grey.400",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-around"
                      >
                        <Grid item xs={6} sx={{ paddingLeft: "30px" }}>
                          <Typography variant="body1">{item.name}</Typography>
                          <Typography variant="body1">{item.name}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "right" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #e0e0e0",
                                borderRadius: "20px", // Makes the border elliptical
                                padding: "3px 6px",
                              }}
                            >
                              <IconButton
                                onClick={() => decreaseQuantity(item.id)}
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "50%", // Round background
                                  padding: "2px",
                                  "&:hover": { backgroundColor: "#e0e0e0" },
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography
                                component="span"
                                sx={{
                                  fontWeight: "bold",
                                  margin: "0 10px",
                                  minWidth: "40px",
                                  textAlign: "center", // Align text in center
                                }}
                              >
                                {item.quantity}
                              </Typography>
                              <IconButton
                                onClick={() => increaseQuantity(item.id)}
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "50%", // Round background
                                  padding: "5px",
                                  "&:hover": { backgroundColor: "#e0e0e0" },
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>
                            <IconButton
                              onClick={() => removeItem(item.id)}
                              color="error"
                              sx={{
                                marginLeft: "10px",
                                backgroundColor: "#fff",
                                borderRadius: "50%", // Round background
                                padding: "5px",
                                "&:hover": { backgroundColor: "#e0e0e0" },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              )}
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  maxWidth: 800,
                  marginTop: "1px",
                }}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  sx={{ marginBottom: 0.5 }}
                >
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="body1">Rs{getTotal()}</Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  sx={{ marginBottom: 1 }}
                >
                  <Typography variant="subtitle1">Discount</Typography>
                  <Typography variant="body1">
                    Rs{calculateTotalDiscount()}
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  sx={{ marginBottom: 1 }}
                >
                  <Typography variant="subtitle1">VAT</Typography>
                  <Typography variant="body1">Rs 00.00</Typography>
                </Grid>
                <Typography
                  sx={{ borderBottom: "1px dashed #ddd", marginBottom: 1 }}
                />
                <Grid container justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">
                    Sub Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    Rs{calculateSubtotal()}
                  </Typography>
                </Grid>
                <Typography
                  sx={{ borderBottom: "2px dashed #ddd", marginTop: 0.5 }}
                />
              </Box>
              <Box sx={{ height: "10vh", marginTop: "3px" }}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent="center"
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent="space-between"
                    width={"60%"}
                  >
                    {/* Debit Card Button */}
                    <Button
                      variant={
                        selectedPaymentMethod === "Debit Card"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handlePaymentMethodSelect("Debit Card")}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        minWidth: "100px",
                        borderRadius: "12px",
                        boxShadow:
                          selectedPaymentMethod === "Debit Card" ? 4 : 0,
                      }}
                    >
                      <CreditCardIcon
                        sx={{ fontSize: "40px", marginBottom: "8px" }}
                      />
                      Debit Card
                    </Button>

                    {/* Cash Button */}
                    <Button
                      variant={
                        selectedPaymentMethod === "Cash"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handlePaymentMethodSelect("Cash")}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        minWidth: "100px",
                        borderRadius: "12px",

                        boxShadow: selectedPaymentMethod === "Cash" ? 4 : 0, // Highlight selected button
                        backgroundColor:
                          selectedPaymentMethod === "Cash"
                            ? "#d32f2f"
                            : "transparent", // Red for selected Cash
                        color:
                          selectedPaymentMethod === "Cash"
                            ? "#ffffff"
                            : "#d32f2f", // Text color
                        borderColor:
                          selectedPaymentMethod === "Cash"
                            ? "#d32f2f"
                            : "#d32f2f",
                        "&:hover": {
                          backgroundColor: "#d32f2f", // Blue on hover
                          color: "#ffffff", // White text on hover
                          borderColor: "#1976d2", // Blue border on hover
                        },
                      }}
                    >
                      <AttachMoneyIcon
                        sx={{ fontSize: "40px", marginBottom: "8px" }}
                      />
                      Cash
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                    width:'90%',
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#43a047",
                      },
                      width:'90%',
                    }}
                    onClick={handleCheckout}
                    disabled={!selectedPaymentMethod}
                  >
                    Place Order
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PosHomeN;
