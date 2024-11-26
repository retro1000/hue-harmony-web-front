import React from 'react';
import { Box, TextField, IconButton, Typography, Button,Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const CustomerSelection = () => {
  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Please Select a Customer
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Customer"
          value="CS0001-C | @aa"
          variant="outlined"
          size="small"
          sx={{ mr: 2, flex: 1 }}
        />
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 2 }}>
      <Grid container spacing={0} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', border: '1px solid #ccc', p: 1 }}>
          <Box sx={{borderRight: '2px solid #ccc',width:'10%',display:'flex',justifyContent:'center'}}>
            <Typography variant="body1" style={{fontWeight:500}}>Field</Typography>
            </Box>
            
            <Box sx={{display:'flex',justifyContent:'center',width:'90%'}}>
            <Typography variant="body1" style={{fontWeight:800}}>Information</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', border: '1px solid #ccc', p: 1 }}>
          <Box sx={{borderRight: '2px solid #ccc',width:'10%',display:'flex',justifyContent:'center'}}>
            <Typography variant="body1" >Name</Typography>
            </Box>
            
            <Typography variant="body1">Value 2</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
        <Box sx={{ display: 'flex', border: '1px solid #ccc', p: 1 }}>
        <Box sx={{borderRight: '2px solid #ccc',width:'10%',display:'flex',justifyContent:'center'}}>
            <Typography variant="body1">Address</Typography>
            </Box>
            <Typography variant="body1">Value 3</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
      
    </Box>
  );
};

export default CustomerSelection;
