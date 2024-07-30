
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Hero from "../../components/HomePage/Hero";
import PopularProducts from "../../components/HomePage/PopularProducts";
import Banner from "../../components/HomePage/NewProduct";
import ColorOfTheYear from "../../components/HomePage/UnderUnderHero";
import Footer from "../../components/ProductPage/Footer";
import PaintStories from "../../components/HomePage/UnderHero";
import LetsPaintHero from "../../components/HomePage/BottomHero";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed005d",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

const styles = {
  padding: 15
};


const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Hero />
      <Box sx={( styles )}>
      <PopularProducts />
      <Banner />
      <PaintStories/>
      <ColorOfTheYear/>
     
      </Box>
      <LetsPaintHero/>
      <Footer />
    </ThemeProvider>
  );
};

export default MainLayout;
