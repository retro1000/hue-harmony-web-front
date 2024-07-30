
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  IconButton,
} from "@mui/material";

const products = [
  {
    id: 1,
    name: "CANON EOS DSLR Camera",
    price: "$360",
    rating: 4.5,
    reviews: 95,
    image: "http://b.io/ext_27-",
  },
  {
    id: 2,
    name: "ASUS FHD Gaming Laptop",
    price: "$700",
    rating: 4.8,
    reviews: 325,
    image: "http://b.io/ext_31-",
  },
  {
    id: 3,
    name: "Curology Product Set",
    price: "$500",
    rating: 4.2,
    reviews: 145,
    image: "http://b.io/ext_33-",
  },
  {
    id: 4,
    name: "Jr. Zoom Soccer Cleats",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    image: "http://b.io/ext_34-",
  },
];

const ProductGrid = () => {
  return (
    <Grid
      container
      spacing={2.5}
      sx={{ width: "100%", maxWidth: 1500, mt: 3 }}
    >
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 250, objectFit: "cover" }}
              />
              {product.isNew && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    backgroundColor: "#00c950",
                    color: "#fafafa",
                    padding: "4px 12px",
                    borderRadius: 0.5,
                  }}
                >
                  NEW
                </Typography>
              )}
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <IconButton sx={{ backgroundColor: "white" }}>
                  <img
                    src="http://b.io/ext_28-"
                    alt="Wishlist"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
                <IconButton sx={{ backgroundColor: "white" }}>
                  <img
                    src="http://b.io/ext_29-"
                    alt="Compare"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
              </Box>
            </Box>
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {product.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" color="error">
                  {product.price}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={product.rating} readOnly size="small" />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    ({product.reviews})
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
