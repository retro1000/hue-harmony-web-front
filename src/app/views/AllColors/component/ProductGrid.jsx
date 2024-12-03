import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const ProductGrid = ({ ProductColor }) => {
  // Mock data for products
  const mockProducts = [
    { id: 1, name: "Product 1", price: "$10" },
    { id: 2, name: "Product 2", price: "$20" },
    { id: 3, name: "Product 3", price: "$30" },
    { id: 4, name: "Product 4", price: "$40" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: ProductColor,
        padding: 3,
        borderRadius: 2,
        color: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Products for Color: {ProductColor}
      </Typography>
      <Grid container spacing={2}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Box
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: 1,
                padding: 2,
                textAlign: "center",
                boxShadow: 1,
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{product.price}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
