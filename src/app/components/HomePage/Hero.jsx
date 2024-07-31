
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://cdn.builder.io/api/v1/image/assets/TEMP/9f1e55589bae5f2b6b62d8b7ada31a3fc9289dfcc5af803202e7b746204f8606?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "508px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Box maxWidth="711px">
          <Typography variant="h2" color="white" gutterBottom>
            Paint Colours and Wall Paints
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="contained" color="primary">
              I have some colours in mind
            </Button>
            <Button variant="contained" color="secondary">
              I'm not sure where to start
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
