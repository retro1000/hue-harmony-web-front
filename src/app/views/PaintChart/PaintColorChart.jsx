
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import ColorPalette from "../../components/PaintColorChart/ColorPalette";
import FilterSection from "../../components/PaintColorChart/FilterSection";
import ColorTabs from "../../components/PaintColorChart/ColorTabs";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PaintColorChart() {
  return (
    <>
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Paint Colours Chart
        </Typography>
        <ColorPalette />
        <Box sx={{mt : 6 , mb: 5}}>
        <FilterSection />
        </Box>
        <ColorTabs />
        <Box sx={{mt : 6}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper>Brilliant White</StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper>White Whisper</StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper>Morning White</StyledPaper>
          </Grid>
        </Grid>
        </Box>
      </StyledContainer>
    </>
  );
}

export default PaintColorChart;
