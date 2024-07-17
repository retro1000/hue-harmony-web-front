import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Dulux WoodCare Diamond Tough Sanding Sealer',
    image: 'https://via.placeholder.com/150',
    features: ['Best Sealing, Filling & Sanding', 'Water Based'],
    availability: 'Only Available in Store',
  },
  // Add more products as needed
];

const filters = [
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

const ProductCard = ({ product }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={product.image}
      alt={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {product.name}
      </Typography>
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>
            <Typography variant="body2" color="text.secondary">
              {feature}
            </Typography>
          </li>
        ))}
      </ul>
      <Typography variant="body2" color="text.secondary">
        {product.availability}
      </Typography>
      <FormControlLabel control={<Checkbox />} label="Compare" />
    </CardContent>
  </Card>
);

const FilterList = ({ filter }) => (
  <Box mb={3}>
    <Typography variant="h6" gutterBottom>
      {filter.category}
    </Typography>
    <FormGroup>
      {filter.options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox />}
          label={option}
        />
      ))}
    </FormGroup>
  </Box>
);

const FilterProduct = () => {
  return (
    <Container maxWidth="xl">
      <Box display="flex" mt={3}>
        <Paper sx={{ width: '25%', p: 2, mr: 2 }}>
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
          <Button variant="text" color="primary">Clear All</Button>
          {filters.map((filter, index) => (
            <FilterList key={index} filter={filter} />
          ))}
        </Paper>
        <Box flex={1}>
          <Typography variant="h5" gutterBottom>
            Find the products for your project
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            13 products found
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default FilterProduct;
