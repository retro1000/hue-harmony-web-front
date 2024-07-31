// ProductPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import Footer from "../../components/ProductPage/Footer";
import ProductGrid from "../../components/ProductPage/ProductGrid";
import FilterBar, { filtersConfig } from "../../components/ProductPage/Filtering";
import FilterList from "../../components/ProductPage/Filtering";
import SearchBar from "../../components/ProductPage/SearchBar";
import SortButton from "../../components/ProductPage/SortButton";

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
    <>
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
          <Box sx={{ width: '25%', p: 2, mr: 2 }}>
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
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              gap: 2,
      
            }}>
            <SortButton/>
            <SearchBar/>
            
            </Box>
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
    </>
  );
};

export default ProductPage;
