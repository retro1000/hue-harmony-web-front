
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const SizeSelector = () => {
  const sizes = ["1L", "2L", "4L", "10L", "20L"];

  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Typography variant="h6">Size:</Typography>
      <Box display="flex" gap={2}>
        {sizes.map((size) => (
          <Button
            key={size}
            variant={size === "M" ? "contained" : "outlined"}
            color={size === "M" ? "error" : "primary"}
            sx={{ minWidth: 32, height: 32, p: 0 }}
          >
            {size}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SizeSelector;
