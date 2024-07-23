
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(0, 0, 0, 1)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", p: "30px 60px" }}>
        <Typography variant="h6" sx={{ letterSpacing: 0.72, fontWeight: 700 }}>
          Logo
        </Typography>
        <Box sx={{ display: "flex", gap: 2.5 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">All Colours</Button>
          <Button color="inherit">Products</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1.875 }}>
          <IconButton>
            <img
              src="http://b.io/ext_23-"
              alt="Icon 1"
              style={{ width: 24, height: 24 }}
            />
          </IconButton>
          <IconButton>
            <img
              src="http://b.io/ext_24-"
              alt="Icon 2"
              style={{ width: 32, height: 32 }}
            />
          </IconButton>
          <IconButton>
            <img
              src="http://b.io/ext_25-"
              alt="Icon 3"
              style={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", gap: 2.5 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 1, color: "#111", p: "8px 26px" }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 1,
              backgroundColor: "#ed005d",
              color: "#fff",
              p: "8px 19px",
            }}
          >
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
