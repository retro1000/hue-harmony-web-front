import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantitySelector = ({ qty, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(qty);

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      onQuantityChange(newQuantity); // Notify parent
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : 1;
      onQuantityChange(newQuantity); // Notify parent
      return newQuantity;
    });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid rgba(0, 0, 0, 0.23)"
      borderRadius={1}
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
  );
};

export default QuantitySelector;
