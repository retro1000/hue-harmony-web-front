import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Paper from '@mui/material/Paper';
import PosProductCard from '../../components/ProductCard/posProductCard';
import {Grid} from "@mui/material";


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




const ResponsiveAppBar = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navigation Bar */}
            <AppBar position="static" sx={{ backgroundColor: 'grey', boxShadow: 'none' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'flex-end', mr: 0 }}>
                    <Toolbar disableGutters>

                        <Button variant="contained" color="primary" sx={{ mr: 1, boxShadow: 'none' }}>
                            New Order
                        </Button>
                        <Link to={'/pos/order-list'}>
                        <Button variant="contained" color="primary" sx={{ mr: 1, boxShadow: 'none' }}>
                            Order List
                        </Button>
                        </Link>
                        <Link to={'/pos/sales-summary'}>
                        <Button variant="contained" color="primary" sx={{ mr: 1, boxShadow: 'none' }}>
                            Sales Summary
                        </Button>
                        </Link>

                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', boxShadow: 'none' }}>
                            Logout
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

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
                        flexDirection:'column',
                        color: 'white',
                        padding: 1,
                        borderRight: '0.5px solid black',
                    }}
                >
                    <Box sx={{ width: '100%' ,display:'flex',flexDirection:'row',height:'5.5vh',padding:1,justifyContent: 'space-around'}}>
                        <TextField
                            label="Search By Product Name or Code"
                            variant="outlined"
                            fullWidth
                            sx={{ backgroundColor: 'white',mb:0,height:'5vh',mr:0.2}}
                        />
                        <TextField
                            label="Please Scan Or Enter Item Barcode Number"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: false }}
                            sx={{ backgroundColor: 'white', mb: 0,height:'5vh',mr:0.2 }}
                        />
                        <div>

                            <FormControl sx={{ minWidth: 120,height:'5vh'}}>
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{'aria-label': 'Without label'}}
                                    sx={{height:'4.7vh'}}
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
                            marginTop:2,
                            marginRight:6,// Optional: adjust padding
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
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >


                </Box>
            </Box>
        </Box>
    );
}

export default ResponsiveAppBar;
