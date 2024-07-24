
import React from "react";
import { Grid, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({ image, name, price, quantity }) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: "4px" }}
    >
      <Grid item xs={3}>
        <img src={image} alt={name} style={{ width: "100%", height: "auto" }} />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle1">{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">${price}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" alignItems="center">
          <IconButton size="small">
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {quantity}
          </Typography>
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">${price * quantity}</Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;
