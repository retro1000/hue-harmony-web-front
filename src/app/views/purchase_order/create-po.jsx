import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Autocomplete,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import { AddCircle, RemoveCircle, Delete } from "@mui/icons-material";
import { useAxios } from "app/hooks/useAxios";

function PurchaseOrderForm() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [description, setDescription] = useState("");
  const [cart, setCart] = useState([]);
  const { api } = useAxios();
  const { apiNonAuth } = useAxios();

  const fetchSuppliers = async () => {
    try {
      const response = await apiNonAuth.get(`/supplier/getall`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  };

  const createPurchaseOrder = async (orderData) => {
    try {
      const response = await apiNonAuth.post(
        "/purchase-order/create",
        orderData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating purchase order:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error loading suppliers:", error);
      }
    };
    loadSuppliers();
  }, []);

  const handleSubmit = async () => {
    console.log(description, selectedSupplier, cart.length);
    if (!description || !selectedSupplier || cart.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    const orderData = {
      description,
      supplier: {
        supplierId: selectedSupplier.id,
      },
      purchaseOrderProduct: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await createPurchaseOrder(orderData);
      alert("Purchase Order Created Successfully");
      setDescription("");
      setSelectedSupplier(null);
      setCart([]);
    } catch (error) {
      alert("Failed to create Purchase Order");
    }
  };

  // const suppliers = [
  //   {
  //     id: "SUP001",
  //     name: "Supplier A",
  //     products: [
  //       {
  //         id: "P001",
  //         name: "Product 1",
  //         image:
  //           "https://storage.googleapis.com/hueharmony-1a8c2.appspot.com/images/28315531-7ca2-4983-9cb1-d89009dd4e2b.jpg?GoogleAccessId=firebase-adminsdk-vdbux@hueharmony-1a8c2.iam.gserviceaccount.com&Expires=1733685073&Signature=RbCJkLF6TUKpELeLNWWI8xKRkhf0gVjwro8E9V%2BM%2F8WAjlVpExanlIV%2FoElL4ybqwq94pRjLFWq%2B5G747%2B5c45oy8dpQF4tYM0spzTytQDNvuESvwSLzqiRWplghyjnbQ%2Ba1a3Y5QAyBN4L47z4pVZHxAVaUzf3zz3Hguhev2MW2uFoutj1PsjKmSoWYob2dF%2FcrfCSc721WuUE6Ez2e8M25oexLguZ00iKunYrBJnHTHR3uI7%2FL3ApydH5HdqOWGWWYykQnBzh0M4ZaAzGi4KrUL0pkZ07Mb%2ByLL%2B6F5koVTi119I%2BXeyZjQYT51T3r0E5RdrfT7hKCdivm%2FmMR%2FQ%3D%3D",
  //       },
  //       {
  //         id: "P002",
  //         name: "Product 2",
  //         image:
  //           "https://storage.googleapis.com/hueharmony-1a8c2.appspot.com/images/28315531-7ca2-4983-9cb1-d89009dd4e2b.jpg?GoogleAccessId=firebase-adminsdk-vdbux@hueharmony-1a8c2.iam.gserviceaccount.com&Expires=1733685073&Signature=RbCJkLF6TUKpELeLNWWI8xKRkhf0gVjwro8E9V%2BM%2F8WAjlVpExanlIV%2FoElL4ybqwq94pRjLFWq%2B5G747%2B5c45oy8dpQF4tYM0spzTytQDNvuESvwSLzqiRWplghyjnbQ%2Ba1a3Y5QAyBN4L47z4pVZHxAVaUzf3zz3Hguhev2MW2uFoutj1PsjKmSoWYob2dF%2FcrfCSc721WuUE6Ez2e8M25oexLguZ00iKunYrBJnHTHR3uI7%2FL3ApydH5HdqOWGWWYykQnBzh0M4ZaAzGi4KrUL0pkZ07Mb%2ByLL%2B6F5koVTi119I%2BXeyZjQYT51T3r0E5RdrfT7hKCdivm%2FmMR%2FQ%3D%3D",
  //       },
  //     ],
  //   },
  //   {
  //     id: "SUP002",
  //     name: "Supplier B",
  //     products: [
  //       {
  //         id: "P003",
  //         name: "Product 3",
  //         image:
  //           "https://storage.googleapis.com/hueharmony-1a8c2.appspot.com/images/28315531-7ca2-4983-9cb1-d89009dd4e2b.jpg?GoogleAccessId=firebase-adminsdk-vdbux@hueharmony-1a8c2.iam.gserviceaccount.com&Expires=1733685073&Signature=RbCJkLF6TUKpELeLNWWI8xKRkhf0gVjwro8E9V%2BM%2F8WAjlVpExanlIV%2FoElL4ybqwq94pRjLFWq%2B5G747%2B5c45oy8dpQF4tYM0spzTytQDNvuESvwSLzqiRWplghyjnbQ%2Ba1a3Y5QAyBN4L47z4pVZHxAVaUzf3zz3Hguhev2MW2uFoutj1PsjKmSoWYob2dF%2FcrfCSc721WuUE6Ez2e8M25oexLguZ00iKunYrBJnHTHR3uI7%2FL3ApydH5HdqOWGWWYykQnBzh0M4ZaAzGi4KrUL0pkZ07Mb%2ByLL%2B6F5koVTi119I%2BXeyZjQYT51T3r0E5RdrfT7hKCdivm%2FmMR%2FQ%3D%3D",
  //       },
  //       {
  //         id: "P004",
  //         name: "Product 4",
  //         image:
  //           "https://storage.googleapis.com/hueharmony-1a8c2.appspot.com/images/28315531-7ca2-4983-9cb1-d89009dd4e2b.jpg?GoogleAccessId=firebase-adminsdk-vdbux@hueharmony-1a8c2.iam.gserviceaccount.com&Expires=1733685073&Signature=RbCJkLF6TUKpELeLNWWI8xKRkhf0gVjwro8E9V%2BM%2F8WAjlVpExanlIV%2FoElL4ybqwq94pRjLFWq%2B5G747%2B5c45oy8dpQF4tYM0spzTytQDNvuESvwSLzqiRWplghyjnbQ%2Ba1a3Y5QAyBN4L47z4pVZHxAVaUzf3zz3Hguhev2MW2uFoutj1PsjKmSoWYob2dF%2FcrfCSc721WuUE6Ez2e8M25oexLguZ00iKunYrBJnHTHR3uI7%2FL3ApydH5HdqOWGWWYykQnBzh0M4ZaAzGi4KrUL0pkZ07Mb%2ByLL%2B6F5koVTi119I%2BXeyZjQYT51T3r0E5RdrfT7hKCdivm%2FmMR%2FQ%3D%3D",
  //       },
  //     ],
  //   },
  // ];

  // function PurchaseOrderForm() {
  //   const [selectedSupplier, setSelectedSupplier] = useState(null);
  //   const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveProduct = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Purchase Order Form
        </Typography>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            value={description}
            onChange={handleDescriptionChange}
            sx={{ mb: 2 }}
          />
          <Autocomplete
            options={
              suppliers.length > 0
                ? suppliers
                : [{ id: null, name: "No Suppliers", products: [] }]
            }
            getOptionLabel={(option) =>
              option && option.products
                ? `${option.id}-${option.name} (${option.products.length})`
                : "No Suppliers"
            }
            getOptionDisabled={(option) => option.id === null} // Disable "No Suppliers" option
            onChange={(e, value) => setSelectedSupplier(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Supplier"
                variant="outlined"
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
          />
        </Box>

        {selectedSupplier && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
              Products from {selectedSupplier.name}
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
              {selectedSupplier.products.map((product) => (
                <Box
                  key={product.id}
                  p={2}
                  border="1px solid #ccc"
                  borderRadius="4px"
                  textAlign="center"
                  width="150px"
                  sx={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <img src={product.image} alt={product.name} width="50" />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAddProduct(product)}
                    sx={{ mt: 1 }}
                  >
                    Add
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {cart.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
              Selected Products
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img src={item.image} alt={item.name} width="50" />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <AddCircle />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        <RemoveCircle />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveProduct(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
        <Box mt={4} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Submit Order
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default PurchaseOrderForm;
