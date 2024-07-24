
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">All Colours</Button>
          <Button color="inherit">Products</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteIcon />
          </IconButton>
        </Box>
        <Button color="inherit" variant="outlined" sx={{ ml: 2 }}>
          Log in
        </Button>
        <Button color="primary" variant="contained" sx={{ ml: 2 }}>
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
