import React, { useState } from "react";
import {
    Typography,
    Grid,
    Divider,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import PaymentMethod from "./PaymentMethod";


const PaymentGrid = ({
                          placeOrder,
                          setCardDetails,
                          setOrderDetails,
                          orderDetails,
                          isPlaceOrderValid
                      }) => {

    const [paymentType, setPaymentType] = useState("CARD");

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Payment Method
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <PaymentMethod
                        paymentType={paymentType}
                        setPaymentType={setPaymentType}
                        setCardDetails={setCardDetails}
                        setOrderDetails={setOrderDetails}
                        orderDetails={orderDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#ED005D", color: "#fff" }}
                        fullWidth
                        onClick={placeOrder}
                        disabled={!isPlaceOrderValid()} // Call the function and pass its result
                    >
                        Place Order
                    </Button>

                </Grid>
            </Grid>
        </>
    );
};

export default PaymentGrid;
