import React, { useState, useEffect } from "react";
import NavBar from "app/components/Pos/PosNavNew";
import ProfileSidebar from "app/components/Pos/PosSide";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material"; // Add IconButton here
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
import useAuth from "app/hooks/useAuth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import { useAxios } from "../../hooks/useAxios";
import "@fontsource/poppins";



function PosHomeN() {
  const [loyaltyDiscount, setLoyaltyDiscount] = React.useState(0); 
  const [loyaltyStatus, setLoyaltyStatus] = useState(null);
  const [loyaltyNumber, setLoyaltyNumber] = useState("");
  const [isLoyaltyClaimed,setIsLoyaltyClaimed] = useState(false);

  const filterOptions = {
    Color: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
    Finish: [
      { label: "Matte", value: "matte" },
      { label: "Glossy", value: "glossy" },
    ],
    Surface: [
      { label: "Wood", value: "wood" },
      { label: "Metal", value: "metal" },
    ],
    Brand: [
      { label: "Wood", value: "wood" },
      { label: "Metal", value: "metal" },
    ],
    Positon: [
      { label: "Wood", value: "wood" },
      { label: "Metal", value: "metal" },
    ],
    RoomType: [
      { label: "Wood", value: "wood" },
      { label: "Metal", value: "metal" },
    ],
    ProductType: [
      { label: "Wood", value: "wood" },
      { label: "Metal", value: "metal" },
    ],
  };

  // State to hold selected filters by category
  const [selectedFilters, setSelectedFilters] = useState({
    Color: [],
    Finish: [],
    Surface: [],
    Brand: [],
    Positon: [],
    RoomType: [],
    ProductType: [],
  });

  // Handle filter selection toggle
  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const updatedCategoryFilters = prev[category].includes(value)
        ? prev[category].filter((filter) => filter !== value) // Remove filter if already selected
        : [...prev[category], value]; // Add filter if not selected

      return { ...prev, [category]: updatedCategoryFilters };
    });
  };

  // Send filters to backend
  const sendFilters = () => {
    console.log("Filters sent to backend:", selectedFilters);
    // Use fetch/axios to send `selectedFilters` to your API endpoint.
  };

  const [isClaiming, setIsClaiming] = useState(false);

  const handleLoyaltyClaim = async () => {
    try {
      // Make API call
      const response = await apiNonAuth.get(
        `http://localhost:8080/loyalty/${phoneNumber}`
      );

      if (response.status === 200) {
        const loyaltyData = response.data; // Assuming the API returns loyalty info

        if (loyaltyData.discount) {
          setLoyaltyStatus({
            isDiscount: true,
            discountAmount: loyaltyData.discountAmount,
          });
          //alert("Loyalty claimed successfully!");
        } else {
          setLoyaltyStatus({
            isDiscount: false,
            discountAmount: null,
          });
          //alert("No loyalty discount available.");
        }
      } else {
        // Handle non-200 status codes
        // alert("Failed to claim loyalty. Please try again.");
      }
    } catch (error) {
      console.error("Error claiming loyalty:", error);
      alert("An error occurred while claiming loyalty.");
    } finally {
      // Reset claim button state
      setIsClaiming(false);
    }
  };

  const { api, apiNonAuth } = useAxios();

  const { user, role } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNonAuth.get(
          "http://localhost:8080/pos/get-products"
        );
        const transformedProducts = response.data.map((product) => ({
          id: product.productId,
          name: product.productName,
          price: product.productPrice,
          availability: "In Stock",
          imageUrl: product.productImages[0],
          discount: product.productDiscount,
        }));
        setProducts(transformedProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  const [isLoyaltyDialogOpen, setLoyaltyDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [products, setProducts] = useState([]);

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
  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirmCheckout = async () => {
    console.log("hre");

    // Prepare the order items array
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price, // Assuming `price` is available in each cart item
    }));

    // Prepare the full checkout data structure
    const checkoutData = {
      phoneNumber: phoneNumber, // Customer's phone number
      orderDate: new Date().toLocaleDateString("en-CA"), // Current date and time in ISO format
      items: orderItems,
      subTotal: calculateSubtotal(), // Function to calculate subtotal
      discount: calculateTotalDiscount(), // Function to calculate total discount
      total: getTotal(), // Function to calculate final total
      paymentMethod: selectedPaymentMethod, // Selected payment method (e.g., CASH, CARD)
      orderStatus: "COMPLETED", // Default status for a new order
      cashierId: 123,
      //loyaltyClaimStatus:isLoyaltyClaimed // Replace with actual cashier ID
    };
    console.log(checkoutData);

    try {
      // Send the request to the backend
      const response = await apiNonAuth.post(
        "http://localhost:8080/pos/create-order",
        checkoutData
      );

      // Log success
      console.log("Checkout successful:", response.data);

      // Clear cart items and close the dialog
      setCartItems([]);
      setPhoneNumber(null);
      setSelectedPaymentMethod(null);
      setOpenDialog(false);
      setIsLoyaltyClaimed(false);
      setIsClaiming(false); 
      setLoyaltyStatus(null);
      
    } catch (error) {
      // Log any errors
      console.error("Checkout failed:", error.response?.data || error.message);
    }
  };

  const handleCancelCheckout = () => {
    setOpenDialog(false); // Close the dialog without resetting the cart
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
    ) - loyaltyDiscount; 

    const calculateTotalDiscount = () => {
      return (
        cartItems.reduce(
          (acc, item) => acc + item.quantity * (item.discountAmount || 0),
          0
        ) + loyaltyDiscount // Include loyalty discount
      ).toFixed(2);
    };

    const handleClaimLoyalty = async () => {
      // Assuming `loyaltyStatus.discountAmount` contains the discount value
      const discountAmount = loyaltyStatus?.discountAmount || 0;
    
      // Update local state
      setLoyaltyDiscount(discountAmount);
      setIsClaiming(true);
      setIsLoyaltyClaimed(true);
      setLoyaltyDialogOpen(false);
      setIsClaiming(true); // Close the dialog
    
      // try {
      //   // Assuming there's an API endpoint to update the loyalty discount
      //   const response = await apiNonAuth.get(
      //     `http://localhost:8080/loyalty/claim/${phoneNumber}` // Adjust the URL to your endpoint
      //      // Pass necessary parameters like phone number
      //   );
    
      //   if (response.ok) {
      //     alert(`A loyalty discount of ${discountAmount} has been applied!`);
      //   } else {
      //     alert('Failed to claim loyalty discount. Please try again.');
      //   }
      // } catch (error) {
      //   console.error('Error claiming loyalty:', error);
      //   alert('An error occurred while claiming loyalty discount.');
      // } finally {
      //   setIsClaiming(false); // Reset claiming state
      // }
    };
    
  const handleCheckout = () => {
    setOpenDialog(true); // Open the confirmation dialog
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <>
      <NavBar />
      <Grid container sx={{ height: `calc(100vh - 90px)`, overflow: "hidden" }}>
      <ProfileSidebar/>
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
                padding: "5px", // Reduced padding to fit everything
                borderRadius: "8px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
                marginTop: "16px",
                height: "20vh", // Set height to 20vh
                overflowY: "hidden",
                width: "95%", // No overflow, everything should fit
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "4px", // Reduced margin
                  fontSize: "0.9rem", // Reduced font size
                }}
              >
                Choose Filters
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "8px", // Reduced gap between dropdowns
                  flexWrap: "wrap",
                }}
              >
                {Object.keys(filterOptions).map((category) => (
                  <FormControl key={category} sx={{ minWidth: 80 }}>
                    <InputLabel sx={{ fontSize: "0.8rem" }}>
                      {category}
                    </InputLabel>{" "}
                    {/* Reduced label font size */}
                    <Select
                      multiple
                      value={selectedFilters[category]}
                      onChange={(event) => {
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [category]: event.target.value,
                        }));
                      }}
                      renderValue={(selected) => selected.join(", ")}
                      sx={{
                        fontSize: "0.75rem", // Reduced font size of the select
                        height: "2.7rem", // Reduced height of select box
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "20vh", // Limit the dropdown height
                          },
                        },
                      }}
                    >
                      {filterOptions[category].map((filter) => (
                        <MenuItem
                          key={filter.value}
                          value={filter.value}
                          sx={{ fontSize: "0.1rem" }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small" // Make checkbox smaller
                                checked={selectedFilters[category]?.includes(
                                  filter.value
                                )}
                                onChange={() =>
                                  handleFilterChange(category, filter.value)
                                }
                              />
                            }
                            label={filter.label}
                            sx={{
                              fontSize: "0.1rem", // Reduced font size of checkbox label inside dropdown
                              marginRight: "3px", // Reduced margin for tighter spacing
                              marginLeft: "0px", // Reduced left margin
                            }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: "4px", // Reduced margin top
                  fontSize: "0.8rem", // Reduced font size of button
                  height: "2rem", // Reduced button height
                }}
                onClick={sendFilters}
              >
                Apply Filters
              </Button>
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
                height: "63vh",
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
                  <Typography variant="body1">Rs {getTotal()}</Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  sx={{ marginBottom: 1 }}
                >
                  <Typography variant="subtitle1">Discount</Typography>
                  <Typography variant="body1">
                    Rs {calculateTotalDiscount()}
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
                    Rs {calculateSubtotal()}
                  </Typography>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setLoyaltyDialogOpen(true)}
                      disabled={isClaiming}
                      sx={{
                        backgroundColor: "#FFC107", // Gold
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#FFA000", // Darker gold
                        },
                      }}
                    >
                      Claim Loyalty
                    </Button>
                  </Box>
                </Box>

                <Dialog
                  open={isLoyaltyDialogOpen}
                  onClose={() => setLoyaltyDialogOpen(false)}
                >
                  <DialogTitle>Claim Loyalty</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Phone Number"
                      type="tel"
                      fullWidth
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      sx={{ marginTop: 2 }}
                      disabled={!!loyaltyStatus} // Disable input once checked
                    />
                    {loyaltyStatus && (
                      <Typography
                        sx={{
                          marginTop: 2,
                          color: loyaltyStatus.isDiscount ? "green" : "red",
                        }}
                      >
                        {loyaltyStatus.isDiscount
                          ? `Congratulations! You received a loyalty discount of ${loyaltyStatus.discountAmount}.`
                          : "Sorry, you do not have a loyalty discount at the moment."}
                      </Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    {!loyaltyStatus ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoyaltyClaim}
                        disabled={isClaiming}
                      >
                        Check
                      </Button>
                    ) : loyaltyStatus.isDiscount ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleClaimLoyalty} // Function to claim loyalty
                        >
                          Claim
                        </Button>
                        <Button
                          onClick={() => setLoyaltyDialogOpen(false)}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setLoyaltyDialogOpen(false)}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    )}
                  </DialogActions>
                </Dialog>

                <Typography
                  sx={{ borderBottom: "2px dashed #ddd", marginTop: 0.5 }}
                />
              </Box>
              <Box sx={{ height: "8.5vh", marginTop: "3px" }}>
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
                    width: "90%",
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
                      width: "90%",
                    }}
                    onClick={handleCheckout}
                    disabled={!selectedPaymentMethod}
                  >
                    Place Order
                  </Button>
                  <Dialog open={openDialog} onClose={handleCancelCheckout}>
                    <DialogTitle>Confirm Checkout</DialogTitle>
                    <DialogContent>
                      <div>
                        <p>
                          Are you sure you want to proceed with the checkout?
                          Your cart will be reset.
                        </p>
                        {/* Input field for loyalty number */}
                        <TextField
                          label="Loyalty Number (Optional)"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={phoneNumber} // Bind the state for the input field
                          onChange={(e) => setPhoneNumber(e.target.value)} // Update state on change
                        />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelCheckout} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleConfirmCheckout} color="secondary">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
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
