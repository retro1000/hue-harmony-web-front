import React from 'react';
import { Box, Container, Grid, Paper, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';

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
  imageUrl: '/assets/images/dulux.png', // Placeholder image URL
};

const pricingInfo = [
  { label: 'Default', value: '27,960.00 LKR' },
  { label: 'Wholesale', value: '29,500.00 LKR' },
  { label: 'Retail', value: '30,000.00 LKR' },
  { label: 'Mark Up', value: '1,000.00 LKR' }
];

const otherInfo = [
  { label: 'BARCODE TYPE', value: 'Code 128' },
  { label: 'SALES ACCOUNT', value: 'Income - Acc:155' },
  { label: 'COG ACCOUNT', value: 'Cost of Goods Sold - Acc:18' },
  { label: 'INVENTORY ASSET ACCOUNT', value: 'RM Inventory Asset' },
  { label: 'GROSS WEIGHT (Kg)', value: '0.000' },
  { label: 'NET WEIGHT (Kg)', value: '0.000' }
];

const additionalInfo = [
  { label: 'MAX DISCOUNT', value: '6.00 %' },
  { label: 'LAST PURCHASED PRICE', value: '100.00' },
  { label: 'WEIGHTED AVG. COST', value: '1,727.82' },
  { label: 'TAXABLE?', value: 'YES' }
];

const stockDetails = [
  { id: 1, store: 'MAIN - MAIN STORE', lot: 'GRN-23050023', expireDate: '2024-06-23', unitCost: 171.00, qty: 5933.102, sellingPrice: 27960.00 },
  { id: 2, store: 'MAIN - MAIN STORE', lot: 'GRN-23060008', expireDate: '2024-07-01', unitCost: 182.00, qty: 974, sellingPrice: 27960.00 },
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

// Renamed chartData variable for stock quantity chart
const stockQuantityChartData = {
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

// Renamed chartData variable for stock quantity analytics
const stockAnalyticsChartData = {
  labels: ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04'], // Adjusted to match provided data
  datasets: [{
    label: 'Stock Quantity',
    data: [50, 55, 45, 60],
    backgroundColor: 'red',
    borderColor: 'red', 
    tension: 0.1,
  }],
};

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Quantity',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `Quantity: ${context.raw}`;
        },
      },
    },
  },
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
      <Paper elevation={0} style={{ padding: 5, borderRadius: 20, marginTop: 20 }}>
        <Grid container spacing={2} component={Box} p={2} borderColor="grey.500">
          <Grid item xs={6} component={Box} borderRight={0.3} borderColor="grey.500" pr={2}>
          <Box
  sx={{
    display: 'flex',
    justifyContent: 'center', // Center the image horizontally    // Center the image vertically
    height: '100%',           // Ensure the container has a height
    width: '100%',            // Ensure the container has a width
  }}
>
  <Box
    component="img"
    src={productData.imageUrl}
    alt="Product"
    sx={{
      width: '60%',   // Set fixed width as a percentage of the parent container
      height: '60%', // Maintain aspect ratio of the image
   // Optional: Set a maximum height if needed
      objectFit: 'contain', // Ensure the entire image is visible
    }}
  />
</Box>
          </Grid>
          <Grid item xs={6} component={Box} p={2}>
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


      
      <Paper elevation={0} style={{ padding: 5, marginTop: 30, marginBottom: 30, borderRadius: 20 }}>
        <Box pl={3} mb={4}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            SALES ANALYTICS AND PREDICTIONS
          </Typography>
        </Box>
        
        <Line data={stockQuantityChartData} />
      </Paper>
      <Paper elevation={0} style={{ padding: 5, marginTop: 30, borderRadius: 20 }}>
        <Box pl={3} mb={2}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            IN STOCK DETAILS
          </Typography>
        </Box>
       
        <div style={{ width: '100%' }}>
          <DataGrid rows={stockDetails} columns={columns} pageSize={4} autoHeight />
        </div>
      </Paper>


      <Box 
        sx={{
          border: '1px solid #ddd',
          borderRadius: 1,
          padding: 2,
          maxWidth: 1200,
          marginTop:3,
          marginBottom:3,
        }}
      >
        <Box pl={3} mb={4}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            PRODUCT GRN STATS
          </Typography>
        </Box>
        <Line data={stockAnalyticsChartData} options={chartOptions} color={'red'} />
      </Box>
    </Container>
  );
};

export default ProductDetails;  
