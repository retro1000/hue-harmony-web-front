import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import useAuth from 'app/hooks/useAuth';

function PosNav() {

    const {logout} = useAuth()

    return (
        <AppBar position="static" sx={{ backgroundColor: 'grey.400', boxShadow: 'none' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'flex-end', mr: 0 }}>
                <Toolbar disableGutters>
                    <Link to={'/pos-home'}>
                    <Button
        variant="contained"
        color="primary"
        sx={{ mr: 1, boxShadow: 'none' }}
        startIcon={<AddShoppingCartIcon />}
      >
        New Order
      </Button>
                    </Link>
                    <Link to={'/pos/order-list'}>
                    <Button
        variant="contained"
        color="primary"
        sx={{ mr: 1, boxShadow: 'none' }}
        startIcon={<ListAltIcon />}
      >
        Order List
      </Button>
                    </Link>
                    <Link to={'/pos/sales-summary'}>
                    <Button
        variant="contained"
        color="primary"
        sx={{ mr: 1, boxShadow: 'none' }}
        startIcon={<AssessmentIcon />}
      >
        Sales Summary
      </Button>
                    </Link>
                    <Button
        variant="contained"
        sx={{ backgroundColor: 'red', color: 'white', boxShadow: 'none' }}
        startIcon={<ExitToAppIcon />}
        onClick={logout}
      >
        Logout
      </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default PosNav;
