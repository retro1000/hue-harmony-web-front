// ProductPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Paper, Grid, Container } from "@mui/material";
import Footer from "../../components/ProductPage/Footer";
import ProductGrid from "../../components/ProductPage/ProductGrid";
import FilterBar, { filtersConfig } from "../../components/ProductPage/Filtering";
import FilterList from "../../components/ProductPage/Filtering";
import SearchBar from "../../components/ProductPage/SearchBar";
import SortButton from "../../components/ProductPage/SortButton";
import { Header } from "app/components";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    positionExterior: false,
    positionInterior: false,
    positionInteriorandExterior: false,
    producttypeCleaner: false,
    producttypePaint: false,
    producttypeUndercoat: false,
    producttypeVarnish: false,
    producttypeWaterproofing: false,
    roomtypesBathroom: false,
    roomtypesBedroom: false,
    roomtypesChildrensRoom: false,
    roomtypesDiningRoom: false,
    roomtypesHallway: false,
    roomtypesHomeOffice: false,
    roomtypesKitchen: false,
    roomtypesLivingRoom: false,
    surfaceBluestone: false,
    surfaceDoors: false,
    surfaceFurniture: false,
    surfaceMetal: false,
    surfaceWalls: false,
    surfaceWindows: false,
    surfaceWood: false,
    finishGloss: false,
    finishGlossSemiGlossMatt: false,
    finishHighGloss: false,
    finishLowSheen: false,
    finishMatt: false,
    finishMidSheen: false,
    finishNA: false,
    finishSemiGloss: false,
  });

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClearAll = () => {
    const resetFilters = {};
    Object.keys(filters).forEach((key) => {
      resetFilters[key] = false;
    });
    setFilters(resetFilters);
  };

  return (
      
    <Box>
      <Container sx={{display: 'flex', flexDirection: 'column'}}>
        {/* <Grid container spacing={3}> */}
            <br />
            <Header title="Our Products" subTitle="Explore Our Products"/>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                gap: 2,
                marginTop: '2em'
              }}
            >
              <SortButton/>
              <SearchBar/>
            </Box>
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap:'1em', marginTop: '2em'}}>
              <Box sx={{ position: 'sticky', width: '30%', mr: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Filters
                </Typography>
                <Button variant="text" color="primary" onClick={handleClearAll}>
                  Clear All
                </Button>
                <FilterList
                  filters={filters}
                  filtersConfig={filtersConfig}
                  handleFilterChange={handleFilterChange}
                />
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
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
            </Grid>
        {/* </Grid> */}
      </Container>
      <Footer />

    </Box>
  );
};

export default ProductPage;
