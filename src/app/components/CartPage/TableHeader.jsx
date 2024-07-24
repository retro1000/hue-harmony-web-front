import React from 'react';
import { Box, Typography } from '@mui/material';

const TableHeader = () =>  {
  const headers = ['Product', 'Price', 'Quantity', 'Subtotal'];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-between',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      {headers.map((header, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {header}
        </Typography>
      ))}
    </Box>
  );
}

export default TableHeader;