import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";

const FillData = () => {
  // Use state to hold the form data
  const [formData, setFormData] = useState({
    orderDate: "",
    orderNotes: "",
    discountAmount: 0,
    billingAddress: "",
    shipmentVariationStatus: "PENDING", // Default value
    shipmentDate: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create JSON object from form data
    const jsonData = {
      orderDate: formData.orderDate,
      orderNotes: formData.orderNotes,
      discountAmount: formData.discountAmount,
      billingAddress: formData.billingAddress,
      totalAmount: formData.totalAmount,
      shipmentVariationStatus: formData.shipmentVariationStatus,
      shipmentDate: formData.shipmentDate,
    };

    console.log(jsonData); // Log the JSON data or submit it to your backend
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Please Fill Data
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Order Date */}
          <Grid item xs={4}>
            <TextField
              label="Order Date" // Uncomment this if you want the label to show
              fullWidth
              required
              name="orderDate"
              value={formData.orderDate}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input even when the input is not focused
              }}
             
            />
          </Grid>

          {/* Order Notes */}
          <Grid item xs={4}>
            <TextField
              label="Order Notes"
              fullWidth
              name="orderNotes"
              value={formData.orderNotes}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Discount Amount */}
          <Grid item xs={4}>
            <TextField
              label="Discount Amount"
              fullWidth
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Billing Address */}
          <Grid item xs={4}>
            <TextField
              label="Billing Address"
              fullWidth
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Total Amount */}
          <Grid item xs={4}>
            <TextField
              label="Total Amount"
              fullWidth
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>

          {/* Shipment Date */}
          <Grid item xs={4}>
            <TextField
              label="Shipment Date" // Uncomment this if you want the label to show
              fullWidth
              required
              name="shipmentDate"
              value={formData.shipmentDate}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{
                shrink: true, // Ensures the label stays above the input even when the input is not focused
              }}
              
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FillData;
