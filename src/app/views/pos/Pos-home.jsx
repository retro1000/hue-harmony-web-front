import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; // Make sure Grid is imported
import PosProductCard from '../../components/ProductCard/posProductCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { color } from 'echarts';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PaymentIcon from '@mui/icons-material/Payment';
import PosNav from 'app/components/Pos/PosNav';

const products = [
    { id: 'P3452', name: 'HP LAPTOP', price: 75000, availability: '170,000.667 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: 'P3453', name: 'RAM 4GB', price: 7000, availability: '58.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '0013', name: 'test for qu..', price: 0, availability: '7.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '0036', name: 'test for ch..', price: 0, availability: '10.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '009', name: 'TEST FOR GR..', price: 0, availability: '87.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '010', name: 'Test For GR..', price: 0, availability: '14.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '012', name: 'Test for GR..', price: 0, availability: '188.000 Kg', imageUrl: '/assets/images/sample.jpeg' },
    { id: '012365', name: 'test for ro..', price: 0, availability: '99.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '013', name: 'test for cr..', price: 0, availability: '80.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '013', name: 'test for cr..', price: 0, availability: '80.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
    { id: '013', name: 'test for cr..', price: 0, availability: '80.000 Nos', imageUrl: '/assets/images/sample.jpeg' },
];



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const deleteIconStyle={
    color:'red'
  }
  // Sample data
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, <DeleteIcon sx={deleteIconStyle}></DeleteIcon>),
    createData('Frozen yoghurt', 159, 6.0, 24, <DeleteIcon sx={deleteIconStyle}></DeleteIcon>),
    createData('Eclair', 262, 16.0, 24, <DeleteIcon sx={deleteIconStyle}></DeleteIcon>),
    createData('Cupcake', 305, 3.7, 67, <DeleteIcon sx={deleteIconStyle}></DeleteIcon>),
    createData('Gingerbread', 356, 16.0, 49, <DeleteIcon sx={deleteIconStyle}></DeleteIcon>),
  ];
  const tableCellStyle = {
    padding: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5', // Example background color
  };

  

const PosHome = () => {
    const [age, setAge] = React.useState('');

    const [data, setData] = useState(rows);

    // Handle change in input field
    const handleInputChange = (index, event) => {
      const newData = [...data];
      newData[index].fat = event.target.value;
      setData(newData);
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navigation Bar */}
            <PosNav></PosNav>

            {/* Main Content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 0, // Adds space between the boxes
                    flexGrow: 1
                }}
            >
                <Box
                    sx={{
                        width: '60%',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        padding: 1,
                        borderRight: '0.5px solid black',
                    }}
                >
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', height: '5.5vh', padding: 1, justifyContent: 'space-around',marginTop:-1.2 }}>
                        <TextField
                            label="Search By Product Name or Code"
                            variant="outlined"
                            fullWidth
                            sx={{ backgroundColor: 'white', mb: 0, height: '5vh', mr: 0.2 }}
                        />
                        <TextField
                            label="Please Scan Or Enter Item Barcode Number"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: false }}
                            sx={{ backgroundColor: 'white', mb: 0, height: '5vh', mr: 0.2 }}
                        />
                        <div>
                            <FormControl sx={{ minWidth: 120, height: '5vh' }}>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ height: '4.7vh' }}
                                >
                                    <MenuItem value="">
                                        <em>Barcode</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Box>
                    <Container
                        sx={{
                            maxHeight: '83vh', // Adjust height as needed
                            overflowY: 'scroll', // Always show vertical scrollbar
                            overflowX: 'hidden', // Hide horizontal scrollbar if not needed
                            padding: 2, // Optional: adjust padding
                            position: 'relative',
                            marginTop: 2,
                            marginRight: 6, // Optional: adjust padding
                            '&::-webkit-scrollbar': {
                                width: 15, // Width of the scrollbar
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1', // Track color
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888', // Thumb color
                                // Rounded corners
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#555', // Thumb color on hover
                            },
                        }}
                    >
                        <Grid container spacing={2}> {/* Adjust spacing if needed */}
                            {products.map((product) => (
                                <Grid item xs={12} sm={6} md={4} key={product.id}>
                                    <PosProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{
                        width: '40%',
                        height: '92.5vh',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection:'column',
                        color: 'white',
                    }}
                >
                    <Typography variant="h1" component="h2" color="black" fontSize={'1rem'} fontWeight={500} marginTop={0.6} align="left" width={'98%'} borderTop={'1px solid black'} borderBottom={'1px solid black'} height={'5vh'} padding={1.2} marginLeft={0.6} marginRight={0.6}>
                       Please Add Items to Cart
                    </Typography>
                    <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent="end" padding={1}>
                    <Paper elevation={0} square sx={{marginTop:1,background:'lightgreen',display:'flex',height:'3vh',padding:0.3,paddingRight:0.6 }}>
                    <CheckCircleIcon  sx={{ fontSize: 15,marginTop:0.3 }}></CheckCircleIcon>
                    <Typography fontSize={'0.9rem'} fontWeight={500} sx={{marginLeft:0.4}}>Save</Typography>
                    </Paper>
                    </Box>
                   
                    <Box width={'100%'} padding={2} height={'60vh'}>
                    <TableContainer width="80%" component={Paper} elevation={0} maxHeight='10vh' position="relative">
      <Table aria-label="simple table">
        <TableHead >
          <TableRow square>
            <TableCell sx={{tableCellStyle,width:140,backgroundColor: '#f5f5f5',padding:0.8}} >Item</TableCell>
            <TableCell sx={{tableCellStyle,width:60,backgroundColor: '#f5f5f5'}} align="left">Quantity</TableCell>
            <TableCell sx={{tableCellStyle,width:90,backgroundColor: '#f5f5f5'}} align="right">Discount</TableCell>
            <TableCell sx={{tableCellStyle,width:90,backgroundColor: '#f5f5f5'}} align="right">Price</TableCell>
            <TableCell sx={{tableCellStyle,width:70,backgroundColor: '#f5f5f5'}} align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody  sx={{
          
        }}>
          {rows.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
                <Box sx={{ display: 'flex' }}>
        <label sx={{ color: 'green', fontSize: '0.8rem' }}>Lkr</label>
        <input
        type="number"
        value={row.fat}
        onChange={(event) => handleInputChange(index, event)}
        style={{ width: '40%', textAlign: 'left', marginLeft: '0.8rem' }} // Adjust styling as needed
        />
    </Box>
               
              </TableCell>
              <TableCell align="center">
                <input
                  type="number"
                  value={row.fat}
                  onChange={(event) => handleInputChange(index, event)}
                  style={{ width: '100%', textAlign: 'left' }} // Adjust styling as needed
                />
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
                </TableBody>
            </Table>
        </TableContainer>

                    </Box>
                    <Box sx={{borderTop:'1px solid black',padding:0.4,marginLeft:0.4,marginRight:0.4}}>
                    <Typography sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} color="black">
                    <span>Sub Total</span>
                    <span>0.00</span>
                    </Typography>
                    <Typography sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} color="black">
                    <span>Discount</span>
                    <span>0.00</span>
                    </Typography>
                    
                    <Typography sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} color="black">
                    <span style={{ fontWeight: 700 }}>Total</span>
                    <span style={{ fontWeight: 700 }}>0.00</span>
                    </Typography>

                    <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent="end" padding={1}>
                        <Box display={'flex'} flexDirection={'row'} justifyContent="space-between" gap={1}>

                        
                    <Paper elevation={4}  sx={{marginTop:1,background:'black',display:'flex',height:'4vh',paddingRight:0.6 }}>
                    <SaveIcon  sx={{ fontSize: 20,marginTop:0.6 ,color:'white'}}></SaveIcon>
                    <Typography fontSize={'1rem'} fontWeight={500} sx={{marginLeft:0.4,marginTop:0.4,color:'white'}}>Save</Typography>
                    </Paper>
                    <Paper elevation={4}  sx={{marginTop:1,background:'grey',display:'flex',height:'4vh',paddingRight:0.6 }}>
                    <HighlightOffIcon  sx={{ fontSize: 20,marginTop:0.6,color:'white' }}></HighlightOffIcon>
                    <Typography fontSize={'1rem'} fontWeight={500} sx={{marginLeft:0.4,marginTop:0.4,color:'white'}}>Void</Typography>
                    </Paper>
                    <Paper elevation={4}  sx={{marginTop:1,background:'blue',display:'flex',height:'4vh',paddingRight:0.6 }}>
                    <PaymentIcon  sx={{ fontSize: 20,marginTop:0.6,color:'white' }}></PaymentIcon>
                    <Typography fontSize={'1rem'} fontWeight={500} sx={{marginLeft:0.4,marginTop:0.4,color:'white'}}>Payment</Typography>
                    </Paper>
                    </Box>
                    </Box>
                        
                    </Box>
                    
                </Box>
           
       
            </Box>
        </Box>
    );
}

export default PosHome;
