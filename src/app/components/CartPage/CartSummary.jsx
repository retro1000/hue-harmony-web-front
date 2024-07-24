
import React from "react";
import { Paper, Typography, Divider, Button, Box } from "@mui/material";

const CartSummary = ({ subtotal, shipping, total }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cart Total
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Subtotal:</Typography>
        <Typography variant="body1">${subtotal}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Shipping:</Typography>
        <Typography variant="body1">{shipping}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body1" fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ${total}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" fullWidth>
        Proceed to checkout
      </Button>
    </Paper>
  );
};

export default CartSummary;
