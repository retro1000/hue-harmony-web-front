import React, { useState } from "react";
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
} from "@mui/material";
import { AddCircle, RemoveCircle, Delete } from "@mui/icons-material";

const suppliers = [
  {
    id: "SUP001",
    name: "Supplier A",
    products: [
      {
        id: "P001",
        name: "Product 1",
        image: "https://via.placeholder.com/50",
      },
      {
        id: "P002",
        name: "Product 2",
        image: "https://via.placeholder.com/50",
      },
    ],
  },
  {
    id: "SUP002",
    name: "Supplier B",
    products: [
      {
        id: "P003",
        name: "Product 3",
        image: "https://via.placeholder.com/50",
      },
      {
        id: "P004",
        name: "Product 4",
        image: "https://via.placeholder.com/50",
      },
    ],
  },
];

function PurchaseOrderForm() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cart, setCart] = useState([]);

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Purchase Order Form
      </Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
        />
        <Autocomplete
          options={suppliers}
          getOptionLabel={(option) =>
            `${option.id} - ${option.name} (${option.products.length} products)`
          }
          onChange={(e, value) => setSelectedSupplier(value)}
          renderInput={(params) => (
            <TextField {...params} label="Supplier" variant="outlined" />
          )}
        />
      </Box>

      {selectedSupplier && (
        <Box>
          <Typography variant="h6">
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
              >
                <img src={product.image} alt={product.name} width="50" />
                <Typography variant="body1">{product.name}</Typography>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleAddProduct(product)}
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
          <Typography variant="h6">Selected Products</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
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
    </Container>
  );
}

export default PurchaseOrderForm;
