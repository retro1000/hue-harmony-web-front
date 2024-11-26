
import React, { useState } from "react";
import { Box ,Grid, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";



const CartItem = ({ image, name, price, subtotal }) => {


    const [quantity, setQuantity] = useState(2);
  
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    
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
      <Grid item xs={2} >
      <Box
            display="flex"
            alignItems="center"
            border="1px solid rgba(0, 0, 0, 0.23)"
            borderRadius={1}
            sx={{ maxWidth: 140}}
          >
            <IconButton onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 2, minWidth: 20, textAlign: "center" }}>
              {quantity}
            </Typography>
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">{subtotal}</Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;
