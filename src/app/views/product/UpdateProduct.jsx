import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";

const UpdateProduct = ({ productId }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productDiscount: 0,
    coat: 0,
    productQuantity: 0,
    onlineLimit: 0,
    dryingTime: "",
    coverage: 0,
    productStatus: "AVAILABLE",
    brand: "DULUX",
    roomType: "BEDROOM",
    finish: "GLOSS",
    productTypes: [],
    surfaces: [],
    positions: [],
    productFeatures: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const brands = ["DULUX", "ROBBIALAC", "NIPPON_PAINT", "ASIAN_PAINTS", "KANSAI_PAINT"];
  const finishes = [
    "GLOSS",
    "GLOSS_SEMI_GLOSS_MATTE",
    "HIGH_GLOSS",
    "LOW_SHEEN",
    "MATT",
    "MID_SHEEN",
    "SEMI_GLOSS",
  ];
  const roomTypes = [
    "BATHROOM",
    "BEDROOM",
    "CHILDRENS_ROOM",
    "KITCHEN",
    "LIVING_ROOM",
    "HOME_OFFICE",
    "HALLWAY",
    "DINING_ROOM",
  ];

  // Fetch product details when component loads
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${productId}`);
        const product = response.data;

        setFormData({
          productName: product.productName || "",
          productDescription: product.productDescription || "",
          productPrice: product.productPrice || 0,
          productDiscount: product.productDiscount || 0,
          coat: product.coat || 0,
          productQuantity: product.productQuantity || 0,
          onlineLimit: product.onlineLimit || 0,
          dryingTime: product.dryingTime || "",
          coverage: product.coverage || 0,
          productStatus: product.productStatus || "AVAILABLE",
          brand: product.brand || "DULUX",
          roomType: product.roomType || "BEDROOM",
          finish: product.finish || "GLOSS",
          productTypes: product.productTypes || [],
          surfaces: product.surfaces || [],
          positions: product.positions || [],
          productFeatures: product.productFeatures || [],
        });

        setSelectedImages(product.images || []); // Assuming `product.images` contains base64 strings
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "surfaces" || name === "positions" || name === "productFeatures" || name === "productTypes"
          ? value.split(",").map((item) => item.trim())
          : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    base64ConversionForImages(files);
  };

  async function base64ConversionForImages(files) {
    const base64Strings = [];
    for (const file of files) {
      base64Strings.push(await getBase64(file));
    }
    setSelectedImages(base64Strings);
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      images: selectedImages,
    };

    try {
      console.log("Payload being sent:", JSON.stringify(updatedProduct));
      await axios.put(`http://localhost:8080/product/update/${productId}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };


    const StyledPaper = styled(Paper)(({ theme }) => ({
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
      },
    }));

    const StyledTextField = styled(TextField)(({ theme }) => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      },
    }));

    const StyledSelect = styled(Select)(({ theme }) => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      },
    }));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Update Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                label="Product Description"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Product Price"
                name="productPrice"
                type="number"
                value={formData.productPrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Product Discount"
                name="productDiscount"
                type="number"
                value={formData.productDiscount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Coat"
                name="coat"
                type="number"
                value={formData.coat}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Drying Time"
                name="dryingTime"
                value={formData.dryingTime}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Coverage"
                name="coverage"
                type="number"
                value={formData.coverage}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Quantity"
                name="productQuantity"
                type="number"
                value={formData.productQuantity}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <StyledSelect
                fullWidth
                value={formData.productStatus}
                onChange={handleChange}
                name="productStatus"
                required
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
              </StyledSelect>
            </Grid>

            <Grid item xs={12}>
              <StyledSelect
                fullWidth
                value={formData.brand}
                onChange={handleChange}
                name="brand"
                required
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid item xs={12}>
              <StyledSelect
                fullWidth
                value={formData.roomType}
                onChange={handleChange}
                name="roomType"
                required
              >
                {roomTypes.map((roomType) => (
                  <MenuItem key={roomType} value={roomType}>
                    {roomType}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid item xs={12}>
              <StyledSelect
                fullWidth
                value={formData.finish}
                onChange={handleChange}
                name="finish"
                required
              >
                {finishes.map((finish) => (
                  <MenuItem key={finish} value={finish}>
                    {finish}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ position: "relative" }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{
                    py: 1.5,
                    borderRadius: "8px",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Update Product
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default UpdateProduct;
