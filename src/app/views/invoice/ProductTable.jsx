import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, IconButton, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProductTable = () => {
  // Initialize state for rows and total sum of net totals
  const [rows, setRows] = useState([
    {
      id: 1,
      product: 'DIS 001: Demo Product (11534.102)',
      unitPrice: 27960.00,
      quantity: 1,
      netTotal: 27960.00,
    },
  ]);

  const [total, setTotal] = useState(27960.00); // Initialize total sum of net totals

  // Product list (you can update this list based on your requirements)
  const productList = [
    { value: 'DIS 001: Demo Product (11534.102)', unitPrice: 27960.00 },
    { value: 'DIS 002: Another Product (11534.103)', unitPrice: 15000.00 },
    { value: 'DIS 003: Sample Product (11534.104)', unitPrice: 20000.00 },
  ];

  // Add new row
  const handleAddItem = () => {
    const newRow = {
      id: rows.length + 1,
      product: '',
      unitPrice: 0,
      quantity: 1,
      netTotal: 0,
    };
    setRows([...rows, newRow]);
  };

  // Update product, unit price, quantity, and calculate net total
  const handleInputChanges = (e, id, field) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: e.target.value };
        // If product is selected, update unit price and recalculate net total
        if (field === 'product') {
          const selectedProduct = productList.find(p => p.value === e.target.value);
          updatedRow.unitPrice = selectedProduct ? selectedProduct.unitPrice : 0;
          updatedRow.netTotal = updatedRow.unitPrice * updatedRow.quantity;
        } else if (field === 'unitPrice' || field === 'quantity') {
          updatedRow.netTotal = updatedRow.unitPrice * updatedRow.quantity;
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Update total sum whenever rows are updated
  useEffect(() => {
    const newTotal = rows.reduce((sum, row) => sum + row.netTotal, 0);
    setTotal(newTotal);
  }, [rows]); // This will run every time `rows` is updated

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Note: Please add all the items and Click Finish to Proceed.
      </Typography>
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Net Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <TextField
                    select
                    fullWidth
                    value={row.product}
                    onChange={(e) => handleInputChanges(e, row.id, 'product')}
                  >
                    <MenuItem value="">
                      <em>Choose a product</em>
                    </MenuItem>
                    {productList.map((product) => (
                      <MenuItem key={product.value} value={product.value}>
                        {product.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={row.unitPrice}
                    onChange={(e) => handleInputChanges(e, row.id, 'unitPrice')}
                    type="number"
                    disabled // Unit price is set automatically when product is selected
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={row.quantity}
                    onChange={(e) => handleInputChanges(e, row.id, 'quantity')}
                    type="number"
                  />
                </TableCell>
                <TableCell>{row.netTotal}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display total */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {/* <Typography variant="h6">Total: {total.toFixed(2)}</Typography> */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#9e9e9e' }} // Grey color with hover effect
          onClick={handleAddItem} // Add item functionality
        >
          Add Item
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '25%' }}>
          <Button variant="contained" color="success">
            Create Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductTable;
