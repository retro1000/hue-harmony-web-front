import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, IconButton, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProductTable = () => {
  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Add Product
      </Button>
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
              <TableCell>Gross Total</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Net Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>
                <TextField select fullWidth value="DIS 001: Demo Product (11534.102)">
                  <MenuItem value="DIS 001: Demo Product (11534.102)">
                    DIS 001: Demo Product (11534.102)
                  </MenuItem>
                </TextField>
              </TableCell>
              <TableCell>
                <TextField fullWidth value="27,960.00" />
              </TableCell>
              <TableCell>
                <TextField fullWidth value="1" />
              </TableCell>
              <TableCell>27,960.00</TableCell>
              <TableCell>
                <TextField fullWidth value="0" />
              </TableCell>
              <TableCell>27,960.00</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <CheckCircleIcon />
                </IconButton>
                <IconButton color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button
  variant="contained"
  startIcon={<AddIcon />}
  sx={{ bgcolor: '#9e9e9e', }} // Grey color with hover effect
>
  Add Item
</Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',width:'25%' }}>
  <Button variant="contained" color="success">
    Validate & Finish
  </Button>
  <Button variant="contained">
    Save as Draft
  </Button>
</Box>
       
      </Box>
    </Box>
  );
};

export default ProductTable;
