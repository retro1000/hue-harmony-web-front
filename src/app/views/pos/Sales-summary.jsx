import React from 'react';
import PosNav from 'app/components/Pos/PosNav';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { styled } from '@mui/system';


 function SalesSummary(){
    const DataBox = styled(Box)(({ bgcolor }) => ({
        backgroundColor: bgcolor,
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }));
    
      const data = [
        {
          value: '0.00',
          label: 'TOTAL SALES (TODAY)',
          icon: '💰',
          bgcolor: '#4CAF50',
          gridProps: { xs: 12 },
        },
        {
          value: '0.00',
          label: 'CASH SALES (TODAY)',
          icon: '💵',
          bgcolor: '#66BB6A',
          gridProps: { xs: 12, sm: 6 },
        },
        {
          value: '0.00',
          label: 'CARD PAYMENTS (TODAY)',
          icon: '💳',
          bgcolor: '#4CAF50',
          gridProps: { xs: 12, sm: 6 },
        },
        {
          value: '0.00',
          label: 'LOYALTY/DISCOUNTS (TODAY)',
          icon: '➖',
          bgcolor: '#E57373',
          gridProps: { xs: 12 },
        },
      ];
    
    return(
      <>
     
             <PosNav/>
             <Container>
             <Box sx={{ p: 15 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item {...item.gridProps} key={index}>
            <DataBox bgcolor={item.bgcolor}>
              <Typography variant="h2" component="div" sx={{ marginRight: 2 }}>
                {item.icon}
              </Typography>
              <Box>
                <Typography variant="h2" component="div">
                  {item.value}
                </Typography>
                <Typography variant="h6" component="div">
                  {item.label}
                </Typography>
              </Box>
            </DataBox>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
             </>   
    );
 }

 export default SalesSummary;