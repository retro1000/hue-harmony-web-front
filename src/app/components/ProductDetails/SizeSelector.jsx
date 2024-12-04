import React from "react";
import { Box, Typography, Button } from "@mui/material";

const SizeSelector = ({ productSize }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Typography variant="h6">Size:</Typography>
      <Box display="flex" gap={2}>
        <Button
          variant={ "outlined"} // Example condition
          color={"primary"} // Example condition
          sx={{ minWidth: 32, height: 32, p: 0 }}
        >
          {productSize + "L"}
        </Button>
      </Box>
    </Box>
  );
};

export default SizeSelector;
