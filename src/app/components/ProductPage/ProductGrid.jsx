
import React from "react";
import {
  Grid
} from "@mui/material";
import { ProductCard } from "..";

const products = [
  {
    id: 1,
    name: "Multilac Wall Finish",
    price: "$360",
    rating: 4.5,
    reviews: 95,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
  },
  {
    id: 2,
    name: "Causeway wall filler",
    price: "$700",
    rating: 4.8,
    reviews: 325,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",

  },
  {
    id: 3,
    name: "Jat Brilliant White",
    price: "$500",
    rating: 4.2,
    reviews: 145,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",

  },
  {
    id: 4,
    name: "Nippon Super gloss",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
  },
  {
    id: 5,
    name: "Dulux White and Space",
    price: "$660",
    rating: 4.5,
    reviews: 55,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
    isNew: true,
  },
  {
    id: 6,
    name: "Dulux Wood care",
    price: "$660",
    rating: 4.5,
    reviews: 55,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
  },
];

const ProductGrid = () => {
  return (
    <Grid
      container
      spacing={2.5}
      sx={{ width: "100%", maxWidth: 1170, mt: 7.5 }}
    >
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
