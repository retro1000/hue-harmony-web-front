import React from 'react';
import { Container, Box } from '@mui/material';
import CustomerSelection from './CustomerSelection';
import FillData from './FillData';
import ProductTable from './ProductTable';

const InvoiceList = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <CustomerSelection />
        <FillData />
        <ProductTable />
      </Box>
    </Container>
  );
};

export default InvoiceList;


