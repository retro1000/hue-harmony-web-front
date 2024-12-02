import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Container,
} from "@mui/material";
import AddBookRequest from "../../models/AddProductRequest";
import MultipleSelectChip from "./Components/MultipleSelection";

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
      formData.productQuantity,
      formData.onlineLimit,
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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Description"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          required
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Price"
          name="productPrice"
          type="number"
          value={formData.productPrice}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Discount"
          name="productDiscount"
          type="number"
          value={formData.productDiscount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Coat"
          name="coat"
          type="number"
          value={formData.coat}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Drying Time"
          name="dryingTime"
          value={formData.dryingTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Coverage"
          name="coverage"
          type="number"
          value={formData.coverage}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="productQuantity"
          type="number"
          value={formData.productQuantity}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Online Order Limit"
          name="onlineLimit"
          type="number"
          value={formData.onlineLimit}
          onChange={handleChange}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Product Status</InputLabel>
          <Select
            name="productStatus"
            value={formData.productStatus}
            onChange={handleChange}
          >
            <MenuItem value="AVAILABLE">Available</MenuItem>
            <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Brand</InputLabel>
          <Select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          >
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Room Type</InputLabel>
          <Select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
          >
            {roomTypes.map((roomType) => (
              <MenuItem key={roomType} value={roomType}>
                {roomType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Finish</InputLabel>
          <Select
            name="finish"
            value={formData.finish}
            onChange={handleChange}
          >
            {finishes.map((finish) => (
              <MenuItem key={finish} value={finish}>
                {finish}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Product Types (Comma-separated)"
          name="productTypes"
          value={formData.productTypes.join(",")}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Surfaces (Comma-separated)"
          name="surfaces"
          value={formData.surfaces.join(",")}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Positions (Comma-separated)"
          name="positions"
          value={formData.positions.join(",")}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Features (Comma-separated)"
          name="productFeatures"
          value={formData.productFeatures.join(",")}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Upload Product Images
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Product
        </Button>
        <MultipleSelectChip/>
      </Box>
    </Container>
  );
};

export default AddProduct;
