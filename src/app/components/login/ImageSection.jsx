import React from "react";
import { Box } from "@mui/material";

const ImageSection = () => {
  return (
    <Box
      sx={{
        width: "54%",
        padding: "80px 33px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/assets/images/123.jpg"
        alt="Login illustration"
        style={{
          width: "100%",
          maxWidth: "634px",
          aspectRatio: "0.94",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default ImageSection;
