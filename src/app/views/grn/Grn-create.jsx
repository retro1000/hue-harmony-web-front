import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAxios } from "app/hooks/useAxios";

const GRNCreateForm = ({ onSubmit }) => {
  const [products, setProducts] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const { api } = useAxios();
  const { apiNonAuth } = useAxios();

  useEffect(() => {
    fetchPurchaseOrders();
    fetchProducts();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await apiNonAuth.get("/purchase-order/getall");
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiNonAuth.get("/purchase-order/getall");
      const productIds = response.data
        ?.flatMap((item) => item.purchaseOrderProduct || [])
        .map((product) => product.productId)
        .filter((productId) => productId !== undefined);

      setProducts(productIds || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createGRN = async (grnData) => {
    try {
      const response = await apiNonAuth.post("/grn/create", grnData);
      return response.data;
    } catch (error) {
      console.error("Error creating Goods Received Note (GRN):", error);
      throw error;
    }
  };

  const [formData, setFormData] = useState({
    purchaseOrderId: "",
    receivedDate: "",
    remarks: "",
    isComplete: false,
    receivedProducts: [{ productId: "", quantityReceived: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...formData.receivedProducts];
    updatedProducts[index][key] = value;
    setFormData((prev) => ({ ...prev, receivedProducts: updatedProducts }));
  };

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      receivedProducts: [
        ...prev.receivedProducts,
        { productId: "", quantityReceived: "" },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.receivedProducts];
    updatedProducts.splice(index, 1);
    setFormData((prev) => ({ ...prev, receivedProducts: updatedProducts }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.purchaseOrderId ||
      !formData.receivedDate ||
      formData.receivedProducts.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const grnData = {
      purchaseOrderId: parseInt(formData.purchaseOrderId), // Make sure it's a number
      receivedProducts: formData.receivedProducts.map((product) => ({
        productId: parseInt(product.productId), // Ensure it's a number
        quantityReceived: parseInt(product.quantityReceived), // Ensure it's a number
      })),
      receivedDate: formData.receivedDate,
      remarks: formData.remarks || "No remarks",
      isComplete: formData.isComplete,
    };

    try {
      await createGRN(grnData);
      alert("Goods Received Note (GRN) Created Successfully");
      setFormData({
        purchaseOrderId: "",
        receivedDate: "",
        remarks: "",
        isComplete: false,
        receivedProducts: [{ productId: "", quantityReceived: "" }],
      });
    } catch (error) {
      alert("Failed to create Goods Received Note (GRN). Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create Goods Received Note (GRN)
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          select
          label="Purchase Order ID"
          name="purchaseOrderId"
          value={formData.purchaseOrderId}
          onChange={handleInputChange}
          margin="normal"
          required
        >
          {purchaseOrders.map((po) => (
            <MenuItem key={po.id} value={po.id}>
              {po.description}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Received Date"
          type="date"
          name="receivedDate"
          value={formData.receivedDate}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <TextField
          fullWidth
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          margin="normal"
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Received Products
        </Typography>
        {formData.receivedProducts.map((product, index) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={index}
            sx={{ mt: 1 }}
          >
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Product"
                value={product.productId}
                onChange={(e) =>
                  handleProductChange(index, "productId", e.target.value)
                }
                required
              >
                {products.map((p) => (
                  <MenuItem key={p} value={p}>
                    {`Product ${p}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={product.quantityReceived}
                onChange={(e) =>
                  handleProductChange(index, "quantityReceived", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                color="error"
                onClick={() => handleRemoveProduct(index)}
                disabled={formData.receivedProducts.length === 1}
              >
                <RemoveCircleIcon />
              </IconButton>
              {index === formData.receivedProducts.length - 1 && (
                <IconButton color="primary" onClick={handleAddProduct}>
                  <AddCircleIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit GRN
        </Button>
      </Box>
    </Paper>
  );
};

export default GRNCreateForm;
