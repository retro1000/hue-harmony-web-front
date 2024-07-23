import { useState } from 'react';
import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import Footer from "../../components/ProductPage/Footer";
import ProductGrid from "../../components/ProductPage/ProductGrid";

const filtersConfig = [
  {
    category: 'Position',
    options: ['Exterior', 'Interior', 'Interior and Exterior'],
  },
  {
    category: 'Product type',
    options: ['Cleaner', 'Paint', 'Undercoat', 'Varnish', 'Waterproofing'],
  },
  {
    category: 'Room types',
    options: ['Bathroom', 'Bedroom', 'Children\'s Room', 'Dining Room', 'Hallway', 'Home Office', 'Kitchen', 'Living Room'],
  },
  {
    category: 'Surface',
    options: ['Bluestone', 'Doors', 'Furniture', 'Metal', 'Walls', 'Windows', 'Wood'],
  },
  {
    category: 'Finish',
    options: ['Gloss', 'Gloss, Semi Gloss Matt', 'High Gloss', 'Low Sheen', 'Matt', 'Mid Sheen', 'NA', 'Semi Gloss'],
  },
];

const FilterList = ({ filter, filters, handleFilterChange }) => (
  <Box mb={3}>
    <Typography variant="h6" gutterBottom>
      {filter.category}
    </Typography>
    <FormGroup>
      {filter.options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={filters[`${filter.category.toLowerCase().replace(/ /g, '')}${option.replace(/ /g, '')}`]}
              onChange={handleFilterChange}
              name={`${filter.category.toLowerCase().replace(/ /g, '')}${option.replace(/ /g, '')}`}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  </Box>
);

const ProductPage = () => {
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

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 2,
          width: '100%',
          maxWidth: 1170,
          gap: 2.5,
          justifyContent: 'space-between',
        }}
      >
        <Paper sx={{ width: '25%', p: 2, mr: 2 }}>
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
          <Button variant="text" color="primary" onClick={handleClearAll}>
            Clear All
          </Button>
          {filtersConfig.map((filter, index) => (
            <FilterList
              key={index}
              filter={filter}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          ))}
        </Paper>
        <Box sx={{ display: "flex", flexDirection: "column", p: 2.5, flex: 1 }}>
          <Box sx={{ display: "flex", width: 142, maxWidth: "100%", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "#ed005d",
                  height: 40,
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: "#ed005d", my: "auto", fontWeight: 600 }}
            >
              Our Products
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "#000",
              letterSpacing: 1.44,
              mt: 2.5,
              fontWeight: 600,
            }}
          >
            Explore Our Products
          </Typography>
          <ProductGrid />
          <Button
            variant="contained"
            sx={{
              borderRadius: 0.5,
              backgroundColor: "#ed005d",
              mt: 7.5,
              color: "#fafafa",
              p: "16px 48px",
              fontWeight: 500,
              alignSelf: 'center'
            }}
          >
            View All Products
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductPage;
