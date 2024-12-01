
import React, {useState} from "react";
import {
    Typography, Grid, Divider, Button, TextField, FormControlLabel,
    Radio,
    RadioGroup, Dialog,
} from "@mui/material";
import PaymentMethod from "../../views/Billing/component/PaymentMethod";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import StripePaymentForm from "../StripeGatewayForm/StripePaymentForm";

const OrderSummary = () => {

    const [paymentType, setPaymentType] = useState('CARD')

    const [addNewCard, setAddNewCard] = useState(false)

    const [cardDetails, setCardDetails] = useState({})

    const onAddNewCardClose = () => {
        setAddNewCard(false)
    }

  return (
      <>
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
              <PaymentMethod paymentType={paymentType} setPaymentType={setPaymentType} onAddNewCard={(val) => setAddNewCard((val))} setCardDetails={setCardDetails}/>
            {/*<RadioGroup defaultValue="card" name="payment-method">*/}
            {/*  <FormControlLabel value="card" control={<Radio />} label="Credit or Debit Card" />*/}
            {/*  <FormControlLabel*/}
            {/*    value="cod"*/}
            {/*    control={<Radio />}*/}
            {/*    label="Cash on delivery"*/}
            {/*  />*/}
            {/*</RadioGroup>*/}
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: '#ED005D', color: '#fff' }} fullWidth>
              Place Order
            </Button>
          </Grid>
        </Grid>

          <Dialog open={addNewCard} onClose={onAddNewCardClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add new card</DialogTitle>

              <DialogContent>
                  <StripePaymentForm setCardDetails={setCardDetails}/>
              </DialogContent>
          </Dialog>
      </>
  );
};

export default OrderSummary;
