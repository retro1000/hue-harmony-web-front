
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";

const products = [
  {
    name: "Breed Dry Dog Food",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3c12ea0786641f91e95fc0a31f6460ec3fe1cdfa36d1fdd1f953cbffe2437290?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d",
    price: "$100",
    rating: 3.5,
    reviews: 35,
  },
  {
    name: "CANON EOS DSLR Camera",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0914327819b09c9d27502a0a584483b2bbe31caeea3ea24fc5607f2fcffd7080?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d",
    price: "$360",
    rating: 4.5,
    reviews: 95,
  },
  {
    name: "ASUS FHD Gaming Laptop",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/96db7b1c5a7248dd827659dec35ff9143d4536ae98a4c7e0f04188c8c179e424?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d",
    price: "$700",
    rating: 4,
    reviews: 325,
  },
  {
    name: "Curology Product Set",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bf66fa24e1ffeb5433ef3218a1871c40b5195e68ea7e0b830d6e8ae285aadcc3?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d",
    price: "$500",
    rating: 4,
    reviews: 145,
  },
];

const PopularProducts = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Popular Now
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Rating value={product.rating} readOnly precision={0.5} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({product.reviews})
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularProducts;
