import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function PosNav() {
    
    return(
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
    );
}

export default PosNav;
