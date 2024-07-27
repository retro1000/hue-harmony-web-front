import React from 'react';
import { Box, Container, Grid, Paper, Typography, Divider, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const productData = {
  productCode: 'DIS 001',
  productName: 'Demo Product',
  productType: 'FINISHED GOODS',
  category: 'BICYCLE / BMX /',
  unit: 'Ltr',
  trackSerial: 'NO',
  productBundle: 'NO',
  stockType: 'STOCK-ITEM',
  specification: 'Sri Lanka, historically known as Ceylon...',
  termsConditions: '...',
  reorderPoint: 13,
  jobInitiation: 'YES',
  qualityControl: 'YES',
  imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
};

const pricingInfo = [
  { id: 1, type: 'SELLING PRICE', value: '27,960.00 LKR' },
  { id: 2, type: 'Default', value: '27,960.00 LKR' },
  { id: 3, type: 'whole sale', value: '29,500.00 LKR' },
  { id: 4, type: 'Retails', value: '30,000.00 LKR' },
  { id: 5, type: 'Mark Up', value: '1,000.00 LKR' },
  { id: 6, type: 'MAX DISCOUNT', value: '6.00 %' },
  { id: 7, type: 'LAST PURCHASED PRICE', value: '100.00' },
  { id: 8, type: 'WEIGHTED AVG. COST', value: '1,727.82' },
  { id: 9, type: 'TAXABLE?', value: 'YES' },
];

const stockDetails = [
  { id: 1, store: 'MAIN - MAIN STORE', lot: 'GRN-23050023', expireDate: '2024-06-23', unitCost: 171.00, qty: 5933.102, sellingPrice: 27960.00 },
  { id: 2, store: 'MAIN - MAIN STORE', lot: 'GRN-23060008', expireDate: '2024-07-01', unitCost: 182.00, qty: 974, sellingPrice: 27960.00 },
  { id: 1, store: 'MAIN - MAIN STORE', lot: 'GRN-23050023', expireDate: '2024-06-23', unitCost: 171.00, qty: 5933.102, sellingPrice: 27960.00 },
  { id: 2, store: 'MAIN - MAIN STORE', lot: 'GRN-23060008', expireDate: '2024-07-01', unitCost: 182.00, qty: 974, sellingPrice: 27960.00 },
  // Add more stock details here
];

const columns = [
  { field: 'store', headerName: 'Store', width: 200 },
  { field: 'lot', headerName: 'LOT#', width: 200 },
  { field: 'expireDate', headerName: 'Expire Date', width: 200 },
  { field: 'unitCost', headerName: 'Unit Cost', width: 200 },
  { field: 'qty', headerName: 'Qty', width: 200 },
  { field: 'sellingPrice', headerName: 'Selling Price', width: 200 },
];

const chartData = {
  labels: ['2023-06-27', '2023-07-01', '2023-07-04', '2023-07-08', '2023-07-12', '2023-07-16', '2023-07-20'],
  datasets: [
    {
      label: 'Total Sales Per Day',
      data: [5.60, 6.80, 7.90, 8.20, 9.10, 10.00, 12.00],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
    },
    {
      label: 'Forecast Sales Trend',
      data: [6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00],
      borderColor: 'rgba(153,102,255,1)',
      backgroundColor: 'rgba(153,102,255,0.2)',
      fill: true,
    },
  ],
};
const styles = {
   
    item: {
      border: '1px solid #ccc',
      padding: '8px',
      margin: '8px 0',
    },
  };

const categoryWidth = '30%';

const ProductDetails = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={0} style={{ padding: 5, borderRadius: 20,marginTop:20 }}>
        <Grid container spacing={2} component={Box} p={2} borderColor="grey.500">
          <Grid item xs={4} component={Box} borderRight={0.3} borderColor="grey.500" pr={2}>
            <img src={productData.imageUrl} alt="Product" style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={8} component={Box} p={2}>
            <Box display="flex" justifyContent="center" pb={1} mb={1}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                BASIC INFO
              </Typography>
            </Box>

            {Object.entries(productData).map(([key, value], index) => (
              key !== 'imageUrl' && (
                <Box display="flex" justifyContent="left" borderBottom={1} borderColor="grey.300" pb={1} mb={1} key={index}>
                  <Typography variant="body1" component={Box} width={categoryWidth} borderRight={1} borderColor="grey.300" pr={1} textAlign="center">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                  </Typography>
                  <Typography variant="body1" pl={1}>
                    {value}
                  </Typography>
                </Box>
              )
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} style={{ padding: 20, marginTop: 30,borderRadius:20 }}>
    <Grid container sx={{width:'100%'}}>
  <Grid item xs={5.5} md={6} sx={{ borderRadius: '4px', p: 2 }}>
    <Box>
    <Typography variant="h6" gutterBottom>
      PRICING & COSTING INFO
    </Typography>
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">
        SELLING PRICE
        <IconButton size="small" color="primary">
          <AddIcon />
        </IconButton>
      </Typography>
      <Typography variant="h5" gutterBottom>
        27,960.00 LKR
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2">Default: 27,960.00 LKR</Typography>
        <IconButton size="small" color="secondary">
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2">Wholesale: 29,500.00 LKR</Typography>
        <IconButton size="small" color="secondary">
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2">Retail: 30,000.00 LKR</Typography>
        <IconButton size="small" color="secondary">
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2">Mark Up: 1,000.00 LKR</Typography>
        <IconButton size="small" color="secondary">
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
    <Box>
      <Typography variant="body2">MAX DISCOUNT</Typography>
      <Typography variant="body1">6.00 %</Typography>
    </Box>
    <Box>
      <Typography variant="body2">LAST PURCHASED PRICE</Typography>
      <Typography variant="body1">100.00</Typography>
    </Box>
    <Box>
      <Typography variant="body2">WEIGHTED AVG. COST</Typography>
      <Typography variant="body1">1,727.82</Typography>
    </Box>
    <Box>
      <Typography variant="body2">TAXABLE?</Typography>
      <Typography variant="body1">YES</Typography>
    </Box>
    </Box>
  </Grid>

  <Grid item xs={5} md={6} sx={{ borderRadius: '4px', p: 2 }}>
  
    <Typography variant="h6" gutterBottom>
      OTHER INFO
    </Typography>
    <Box>
      <Typography variant="body2">BARCODE TYPE</Typography>
      <Typography variant="body1">Code 128</Typography>
    </Box>
    <Box>
      <Typography variant="body2">SALES ACCOUNT</Typography>
      <Typography variant="body1">Income - Acc:155</Typography>
    </Box>
    <Box>
      <Typography variant="body2">COG ACCOUNT</Typography>
      <Typography variant="body1">Cost of Goods Sold - Acc:18</Typography>
    </Box>
    <Box>
      <Typography variant="body2">INVENTORY ASSET ACCOUNT</Typography>
      <Typography variant="body1">RM Inventory Asset</Typography>
    </Box>
    <Box>
      <Typography variant="body2">GROSS WEIGHT (Kg)</Typography>
      <Typography variant="body1">0.000</Typography>
    </Box>
    <Box>
      <Typography variant="body2">NET WEIGHT (Kg)</Typography>
      <Typography variant="body1">0.000</Typography>
    </Box>
    
  </Grid>
</Grid>

      
   
      </Paper>

      <Paper elevation={0} style={{ padding: 5, marginTop: 30,borderRadius:20 }}>
        <Box pl={3} mb={2}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          IN STOCK DETAILS
        </Typography>
        </Box>
       
        <div style={{ width: '100%' }}>
  <DataGrid rows={stockDetails} columns={columns} pageSize={4} autoHeight />
</div>
      </Paper>

      <Paper elevation={0} style={{ padding: 5, marginTop: 30,marginBottom:30,borderRadius:20 }}>
        <Box pl={3} mb={4}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          SALES ANALYTICS AND PREDICTIONS
        </Typography>
        </Box>
        
        <Line data={chartData} />
      </Paper>
    </Container>
  );
};

export default ProductDetails;
