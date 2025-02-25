
import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subTitle }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 4,
            height: 40,
            bgcolor: '#ED005D' ,
            borderRadius: "0 4px 4px 0",
          }}
        />
        <Typography variant="subtitle1" color='#ED005D'>
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Header;
