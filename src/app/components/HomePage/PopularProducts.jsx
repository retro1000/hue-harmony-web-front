import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ProductCard, TButton } from "..";

const ProductGrid = ({ Title }) => {
  const [mapData, setMapData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = `http://localhost:8080/product/read/popular`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong in products fetching");
        }

        const responseJson = await response.json();
        const responseData = responseJson.content;

        console.log("responseData", responseData);

        setMapData(responseData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Transform `mapData` to `products` when `mapData` changes
  useEffect(() => {
    const data = mapData.map((product) => ({
      id: product.productId,
      name: product.productName, // Product Name
      productDescription: product.productDescription, // Product Description
      productPrice: product.productPrice, // Product Price
      productDiscount: product.productDiscount, // Product Discount
      image: product.imageIds[0], // Product Image
    }));
    setProducts(data);
  }, [mapData]);

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4">{Title}</Typography>
      <Grid
        container
        spacing={2.5}
        sx={{ width: "100%", maxWidth: 1500, mt: 3 }}
      >
        {/* Select 4 random products */}
        {products
          .sort(() => 0.5 - Math.random()) // Shuffle the array
          .slice(0, 4) // Take the first 4 items
          .map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
      <br />
      <Box
        width={"100%"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
      </Box>
    </>
  );
  
  
};

export default ProductGrid;
