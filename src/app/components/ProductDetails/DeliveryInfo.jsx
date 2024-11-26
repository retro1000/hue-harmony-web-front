
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

const DeliveryInfo = () => {
  return (
    <Box border="1px solid rgba(0, 0, 0, 0.23)" borderRadius={1} p={3}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <LocalShippingIcon />
        <Box>
          <Typography variant="subtitle1">Free Delivery</Typography>
          <Typography variant="body2">
            Enter your postal code for Delivery Availability
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" alignItems="center" gap={2}>
        <AssignmentReturnIcon />
        <Box>
          <Typography variant="subtitle1">Return Delivery</Typography>
          <Typography variant="body2">
            Free 30 Days Delivery Returns.{" "}
            <span style={{ textDecoration: "underline" }}>Details</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryInfo;
