
import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({ image, name, price, quantity, subtotal }) => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={3}>
        <img
          src={image}
          alt={name}
          style={{ width: "100%", maxWidth: "100px" }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{price}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton size="small">
          <RemoveIcon />
        </IconButton>
        <Typography
          variant="body1"
          display="inline"
          style={{ margin: "0 10px" }}
        >
          {quantity}
        </Typography>
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{subtotal}</Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;
