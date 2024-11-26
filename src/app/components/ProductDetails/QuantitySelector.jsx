
import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(2);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
