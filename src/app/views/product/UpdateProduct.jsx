import React, { useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import MultiSelectChip from "./Components/MultipleSelection";

const UpdateProduct = ({ productId }) => {
  const [formData, setFormData] = useState({
    productId: "",
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
    roomType: [],
    finish: "GLOSS",
    productTypes: [],
    surfaces: [],
    positions: [],
    productFeatures: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const positions = ["EXTERIOR",
    "INTERIOR",
    "EXTERIOR_AND_INTERIOR"];

  const surfaces = ["BLUESTONE",
    "DOORS",
    "FURNITURE",
    "METAL",
    "WALLS",
    "WINDOWS",
    "WOOD"];

  const productType = ["CLEANER",
    "PAINT",
    "UNDERCOAT",
    "VARNISH",
    "WATERPROOFING"]
  

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

  const handleFieldChange = (field) => (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prevData) => ({
      ...prevData,
      [field]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "productFeatures" 
          ? value.split(",").map((item) => item.trim())
          : value,
    });
  };

  
  // Fetch product details when component loads
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/read/29`);
        const product = response.data;

        setFormData({
          productId: product.productId,
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
          roomType: product.roomType || [],
          finish: product.finish || "GLOSS",
          productTypes: product.productType || [],
          surfaces: product.surfaces || [],
          positions: product.positions || [],
          productFeatures: product.productFeatures || []
        });

        setSelectedImages(product.images || []); // Assuming `product.images` contains base64 strings
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      productImages: selectedImages,
    };

    try {
      console.log("Payload being sent:", JSON.stringify(updatedProduct));
      await axios.put(`http://localhost:8080/product/update?productId=29`, updatedProduct, {
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
        Update Product
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
          label="Product Size (L)"
          name="productSize"
          type="number"
          value={formData.productSize}
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
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Product Discount"
          name="productDiscount"
          type="number"
          value={formData.productDiscount}
          onChange={handleChange}
          margin="normal"
        />
        </Grid>
        </Grid>
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

          <MultiSelectChip
          label="Room Type"
          value={formData.roomType}
          onChange={handleFieldChange("roomType")}
          options={roomTypes}
        />

        <MultiSelectChip
          label="Product Types"
          value={formData.productTypes}
          onChange={handleFieldChange("productTypes")}
          options={productType}
        />

        <MultiSelectChip
          label="Surfaces"
          value={formData.surfaces}
          onChange={handleFieldChange("surfaces")}
          options={surfaces}
        />

        <MultiSelectChip
          label="Positions"
          value={formData.positions}
          onChange={handleFieldChange("positions")}
          options={positions}
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
      </Box>
    </Container>
  );
};

export default UpdateProduct;
