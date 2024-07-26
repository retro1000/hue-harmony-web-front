import React from "react";
import { Grid, Paper, Typography, Select, MenuItem, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FilterSection() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
      <Grid container spacing={3} sx={{ width: 750 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>Location</Typography>
          <StyledPaper>
            <Select fullWidth defaultValue="">
              <MenuItem value="">Select Location</MenuItem>
            </Select>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>Location</Typography>
          <StyledPaper>
            <Select fullWidth defaultValue="">
              <MenuItem value="">Select Location</MenuItem>
            </Select>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>Location</Typography>
          <StyledPaper>
            <Select fullWidth defaultValue="">
              <MenuItem value="">Select Location</MenuItem>
            </Select>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterSection;
