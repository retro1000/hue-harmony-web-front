import React from 'react';
import { Container, Grid, Typography, Button, Box,Drawer  } from '@mui/material';

import {ProductCard} from '../../components/ProductCard';

import { useState } from 'react';
import {Filters} from '../../components/Filtering'



const App = () => {
  const [filters, setFilters] = useState({
    positionExterior: false,
    positionInterior: false,
    positionInteriorExterior: false,
    productTypeCleaner: false,
    productTypePaint: false,
    productTypeUndercoat: false,
    productTypeVarnish: false,
    productTypeWaterproofing: false,
    roomTypeBathroom: false,
    roomTypeBedroom: false,

  });

  const handleClearAll = () => {
    setFilters({
      positionExterior: false,
      positionInterior: false,
      positionInteriorExterior: false,
      productTypeCleaner: false,
      productTypePaint: false,
      productTypeUndercoat: false,
      productTypeVarnish: false,
      productTypeWaterproofing: false,
      roomTypeBathroom: false,
      roomTypeBedroom: false,

    });
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const products = [
    {
      title: 'Dulux WoodCare Diamond Tough Sanding Sealer',
      description: 'BEST SEALING, FILLING & SANDING, WATER BASED',
      available: false,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNqGMU1RvbyqBhgDEtOVh09xzPOx42g96uGQ&s', 
    },
    {
      title: 'Dulux Aquatech Flexible Waterproof Basecoat',
      description: 'RESISTS ALKALI ATTACKS, WATER REPELLANT, ALGAL GUARD',
      available: false,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNqGMU1RvbyqBhgDEtOVh09xzPOx42g96uGQ&s',
    },
  ];

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Filters filters={filters} handleFilterChange={handleFilterChange} handleClearAll={handleClearAll} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4">Find the products for your project</Typography><br></br>
          <Typography variant="h6">10 products found</Typography><br />
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={4} key={index}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={false}>
        <Box p={2} width="300px">
          <Typography variant="h6">Not sure how much paint you need?</Typography>
          <Button variant="contained" color="primary">
            Paint Calculator
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default App;