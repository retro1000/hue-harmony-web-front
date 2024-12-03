import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "../../../components/ProductPage/ProductCard";

const ProductGrid = ({ Title, productColor }) => {
  const [mapData, setMapData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      const newColor = productColor.slice(1); // Remove #

      const baseUrl = `http://localhost:8080/product/filter-color/${newColor}`;

      try {
        const response = await fetch(baseUrl, {
            headers: { Accept: "application/json" }
          });

        if (!response.ok) {
          throw new Error("Something went wrong while fetching products");
        }

        const responseData = await response.json(); 
        console.log("responseData", responseData);
        setMapData(responseData);
        setIsLoading(false);
      } catch (error) {
        setHttpError("No Products Available in this color");
        setIsLoading(false);
      }
    
    };

    fetchProducts();
  }, [productColor]); // Re-run fetch when `productColor` changes

  useEffect(() => {
    // Transform `mapData` to `products`
    const data = mapData.map((product) => ({
      id: product.productId || "N/A", // Use a fallback for null IDs
      name: product.productName, // Product Name
      productDescription: product.productDescription, // Product Description
      productPrice: product.productPrice, // Product Price
      productDiscount: product.productDiscount, // Product Discount
      image: product.imageIds[1] , // Use the first image or fallback to empty
    }));
    setProducts(data);
  }, [mapData]);

  if (isLoading) {
    return <p>No product in this color</p>;
  }

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
      ></Box>
    </>
  );
};

export default ProductGrid;
