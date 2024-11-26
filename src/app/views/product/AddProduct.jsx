import React, { useState } from "react";
import axios from "axios";
import AddBookRequest from "../../models/AddProductRequest";   
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
  Slider,
  InputAdornment,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";


const AddProduct = () => {
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
  

  async function base64ConversionForImages(files) {
    const base64Strings = [];
    for (const file of files) {
      base64Strings.push(await getBase64(file));
    }
    setSelectedImages(base64Strings);
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    base64ConversionForImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productRequest = new AddBookRequest(
      formData.brand,
      formData.coat,
      formData.coverage,
      formData.dryingTime,
      formData.finish,
      formData.positions,
      formData.productDescription,
      formData.productDiscount,
      formData.productName,
      formData.productPrice,
      formData.productStatus,
      formData.productTypes,
      formData.roomType,
      formData.surfaces,
      formData.productFeatures,
      formData.productQuantity,
      formData.onlineLimit,
      selectedImages // Array of image Base64 strings
    );

    try {
      console.log("Payload being sent:", JSON.stringify(productRequest));
      const response = await axios.post(
        "http://localhost:8080/product/create",
        JSON.stringify(productRequest),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }



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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Add Product
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

            <Grid item xs={12}>
              <Typography gutterBottom>Quantity</Typography>
              <Slider
                value={formData.productQuantity}
                onChange={(e, value) =>
                  handleChange({
                    target: { name: "productQuantity", value },
                  })
                }
                valueLabelDisplay="auto"
                min={1}
                max={100}
                sx={{ mt: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  {roomTypes.map((roomType) => (
                    <MenuItem key={roomType} value={roomType}>
                      {roomType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Finish</InputLabel>
                <Select
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  required
                >
                  {finishes.map((finish) => (
                    <MenuItem key={finish} value={finish}>
                      {finish}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Product Types (Comma-separated)"
                name="productTypes"
                value={formData.productTypes.join(",")}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Surfaces (Comma-separated)"
                name="surfaces"
                value={formData.surfaces.join(",")}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Positions (Comma-separated)"
                name="positions"
                value={formData.positions.join(",")}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Product Features (Comma-separated)"
                name="productFeatures"
                value={formData.productFeatures.join(",")}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Product Images</Typography>
              <input
                type="file"
                name="productImages"
                multiple
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ position: "relative" }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{
                    py: 1.5,
                    mt: 2,
                    borderRadius: "8px",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default AddProduct;


