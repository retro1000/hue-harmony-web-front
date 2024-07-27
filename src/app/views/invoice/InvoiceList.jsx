import React from 'react';
import { Container, Box, Typography,Paper } from '@mui/material';
import CustomerSelection from './CustomerSelection';
import FillData from './FillData';
import ProductTable from './ProductTable';


const InvoiceList = () => {
  return (
    <Container>
      <Box sx={{ marginBottom: 6,mt:4}}>
        <Box sx={{mb:3}}>
            <Typography variant='h5' sx={{fontFamily:'Poppins, sans-serif',fontWeight:600,color:'grey.00' }} > Create Invoice</Typography>
        </Box>
        <Paper elevation={0} sx={{ mb: 4, p: 1,borderRadius:4 }}>
        <CustomerSelection />
        </Paper>
        <Paper elevation={0} sx={{ mb: 4, p: 1,borderRadius:4 }}>
        <FillData />
        </Paper>
        <ProductTable />
      </Box>
    </Container>
  );
};

export default InvoiceList;


