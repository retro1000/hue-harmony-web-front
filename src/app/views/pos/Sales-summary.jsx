import React from 'react';
import PosNav from 'app/components/Pos/PosNav';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

 function SalesSummary(){
    return(
      <>
     
             <PosNav/>
             <Container alignItems='center'>
                <Box sx={{display:'flex',flexDirection:'row'}}>
                <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">7,000.00</Typography>
              <Typography>Total Sales (Today)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">7,000.00</Typography>
              <Typography>Cash Sales (Today)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">0.00</Typography>
              <Typography>Card Payments (Today)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#f44336', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">0.00</Typography>
              <Typography>Loyalty/Discounts (Today)</Typography>
            </CardContent>
          </Card>
        </Grid>        
                </Box>
      
             </Container>
             </>   
    );
 }

 export default SalesSummary;