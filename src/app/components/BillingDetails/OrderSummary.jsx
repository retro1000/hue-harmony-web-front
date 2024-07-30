
import React from "react";
import { Typography, Grid, Divider, Button, TextField ,  FormControlLabel, 
  Radio,
  RadioGroup,} from "@mui/material";

const OrderSummary = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>LCD Monitor</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="right">$650</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>H1 Gamepad</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="right">$1100</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="right">$1750</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>Shipping:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="right">Free</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Total:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="right">
          $1750
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Coupon Code" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" sx={{ backgroundColor: '#ED005D', color: '#fff' }} fullWidth>
          Apply Coupon
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup defaultValue="bank" name="payment-method">
          <FormControlLabel value="bank" control={<Radio />} label="Bank" />
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="Cash on delivery"
          />
        </RadioGroup>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" sx={{ backgroundColor: '#ED005D', color: '#fff' }} fullWidth>
          Place Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
