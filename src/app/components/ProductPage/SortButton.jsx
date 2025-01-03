
import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SortButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          borderRadius: 0.5,
          backgroundColor: "#fff",
          color: "#000",
          p: "7px 12px 7px 20px",
        }}
      >
        Sort by popularity
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Popularity</MenuItem>
        <MenuItem onClick={handleClose}>Price: Low to High</MenuItem>
        <MenuItem onClick={handleClose}>Price: High to Low</MenuItem>
        <MenuItem onClick={handleClose}>Newest</MenuItem>
      </Menu>
    </>
  );
};

export default SortButton;
