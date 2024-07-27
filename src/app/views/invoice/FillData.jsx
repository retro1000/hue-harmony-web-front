import React from 'react';
import { Box, TextField, Grid, Typography, MenuItem } from '@mui/material';

const FillData = () => {
  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{display:'flex',justifyContent:'center',paddingBottom:2}}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
        Please Fill Data
      </Typography>
        </Box>
     
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField select label="Store" fullWidth required>
            <MenuItem value="MAIN - MAIN STORE">MAIN - MAIN STORE</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="Sales Rep" fullWidth required>
            <MenuItem value="Codevus Bot">Codevus Bot</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="PO No" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField select label="Class" fullWidth>
            <MenuItem value="Common">Common</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Invoice Date" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Due Date" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Shipping VIA" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Tracking No" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Shipping Date" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField select label="Price Book" fullWidth required>
            <MenuItem value="Default">Default</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField select label="Currency" fullWidth>
            <MenuItem value="LKR">LKR</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Currency Rate" fullWidth value="1" />
        </Grid>
        <Grid item xs={4}>
          <TextField select label="Asset" fullWidth>
            <MenuItem value="Please Select">Please Select</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Contact Person" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Credit Days" fullWidth value="1000" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Invoice Memo" fullWidth multiline rows={4} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FillData;
