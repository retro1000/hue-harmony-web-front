import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Alert } from "@mui/material";
import { ProductCard } from "..";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/product/read/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data1 = await response.json();
        const data = data1;
        setMapData(data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const data = mapData.map((product) => ({
      id: product.productId,
      name: product.productName, // Product Name
      productDescription: product.productDescription, // Product Description
      productPrice: product.productPrice, // Product Price
      productDiscount: product.productDiscount, // Product Discount
      image: product.imageIds[1], // Product Image
    }));

    setProducts(data);
  }, [mapData]);

  if (loading) {
    return <CircularProgress sx={{ mt: 4 }} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  

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
