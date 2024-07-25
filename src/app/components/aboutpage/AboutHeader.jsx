
import React from "react";
import { Box, Typography } from "@mui/material";

const AboutHeader = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 4,
            height: 40,
            bgcolor: "primary.main",
            borderRadius: "0 4px 4px 0",
          }}
        />
        <Typography variant="subtitle1" color="primary">
          About
        </Typography>
      </Box>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
        About Dulux
      </Typography>
    </Box>
  );
};

export default AboutHeader;
