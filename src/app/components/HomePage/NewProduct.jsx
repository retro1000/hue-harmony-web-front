/**
 * This code was generated by Builder.io.
 */
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const NewProduct = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://cdn.builder.io/api/v1/image/assets/TEMP/e477afba0e69bc61757769efeb03dba60902ae6de038d772f1a1f0e4f9ff16bb?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "346px",
        display: "flex",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Container>
        <Box maxWidth="485px" ml="auto">
          <Typography variant="h4" gutterBottom>
            New Dulux SuperKote
          </Typography>
          <Typography variant="body1" paragraph>
            Dulux SuperKote Interior now not only has beautiful and brighter
            colours, with new added benefits also protect colour and paint of
            your home for longer
          </Typography>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewProduct;
