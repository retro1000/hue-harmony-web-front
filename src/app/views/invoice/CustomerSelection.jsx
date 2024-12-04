import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const CustomerSelection = () => {
  // State to hold customer data and the selected customer
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customer data from backend using Axios
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers'); // Replace with your actual endpoint
        setCustomers(response.data); // Assuming the response contains an array of customers
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Handle customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // Handle closing the selected customer
  const handleCloseCustomer = () => {
    setSelectedCustomer(null);
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Please Select a Customer
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </Typography>

      {/* Customer selection dropdown or list */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          select
          label="Customer"
          value={selectedCustomer ? selectedCustomer.id : ''}
          variant="outlined"
          size="small"
          sx={{ mr: 2, flex: 1 }}
          onChange={(e) => {
            const selected = customers.find(
              (customer) => customer.id === e.target.value
            );
            handleSelectCustomer(selected);
          }}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} | {customer.email}
            </option>
          ))}
        </TextField>
        <IconButton onClick={handleCloseCustomer}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Display selected customer information */}
      {selectedCustomer && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={0} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', border: '1px solid #ccc', p: 1 }}>
                <Box sx={{ borderRight: '2px solid #ccc', width: '10%', display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body1" style={{ fontWeight: 500 }}>Field</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                  <Typography variant="body1" style={{ fontWeight: 800 }}>Information</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', border: '1px solid #ccc', p: 1 }}>
                <Box sx={{ borderRight: '2px solid #ccc', width: '10%', display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body1">Name</Typography>
                </Box>
                <Typography variant="body1">{selectedCustomer.name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', border: '1px solid #ccc', p: 1 }}>
                <Box sx={{ borderRight: '2px solid #ccc', width: '10%', display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body1">Address</Typography>
                </Box>
                <Typography variant="body1">{selectedCustomer.address}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CustomerSelection;
