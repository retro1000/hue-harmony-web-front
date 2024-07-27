import React from 'react';
import { Box, TextField, IconButton, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const CustomerSelection = () => {
  return (
    <Box sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Please Select a Customer
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Customer"
          value="CS0001-C | @aa"
          variant="outlined"
          size="small"
          sx={{ mr: 2, flex: 1 }}
        />
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="subtitle1">Information</Typography>
      <table>
        <tbody>
          <tr>
            <td>Field</td>
            <td>Name</td>
            <td>Address</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>C</td>
            <td>,,</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default CustomerSelection;
