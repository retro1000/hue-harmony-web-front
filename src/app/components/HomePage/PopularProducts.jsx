import React from "react";
import {
  Grid,
  Typography,
  Box,
} from "@mui/material";

import { ProductCard, TButton } from ".."; 

const products = [
  {
    id: 1,
    name: "CANON EOS DSLR Camera",
    price: "$360",
    rating: 4.5,
    reviews: 95,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
    wishList: true
  },
  {
    id: 2,
    name: "ASUS FHD Gaming Laptop",
    price: "$700",
    rating: 4.8,
    reviews: 325,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
    wishList: false

  },
  {
    id: 3,
    name: "Curology Product Set",
    price: "$500",
    rating: 4.2,
    reviews: 145,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
    wishList: true

  },
  {
    id: 4,
    name: "Jr. Zoom Soccer Cleats",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    image: "https://paints.lk/wp-content/uploads/2022/02/Podium-background-Made-with-PosterMyWall-24.jpg",
    wishList: false

  },
];

const ProductGrid = ({Title}) => {
  return (
    <>
      <Typography variant="h4">{Title}</Typography>
      <Grid
        container
        spacing={2.5}
        sx={{ width: "100%", maxWidth: 1500, mt: 3 }}
      >
        {
          products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard
                product={product}
              ></ProductCard>
            </Grid>
          ))
        }
      </Grid>
      <br></br>
      <Box width={"100%"} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <TButton 
          label={"View All Products"} 
          variant="contained" 
          title={"View All Products"}
          sx={{width: "180px", height: "50px"}}
          style={{textTransform: "none"}}
        >
        </TButton>
      </Box>
    </>
  );
};

export default ProductGrid;
