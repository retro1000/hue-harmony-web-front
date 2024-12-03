import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductGrid from "./component/ProductGrid"; // Assuming ProductGrid is implemented

const ColorGridPage = () => {
  // Array of color codes
  const colorArray = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FFFF33",
    "#FF33FF",
    "#33FFFF",
    "#FFA500",
    "#800080",
    "#008080",
    "#000080",
    "#800000",
    "#008000",
    "#FFC0CB",
    "#00FFFF",
    "#0000FF",
    "#FF0000",
    "#FFD700",
    "#4B0082",
    "#EE82EE",
    "#A52A2A",
  ];

  // State to track the currently active color
  const [activeColorIndex, setActiveColorIndex] = useState(null);

  // Function to toggle the ProductGrid for a color
  const toggleProductGrid = (index) => {
    setActiveColorIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Color Grid
      </Typography>
      {/* Grid of color boxes */}
      <Grid container spacing={2}>
        {colorArray.map((color, index) => (
          <React.Fragment key={index}>
            {/* Color Box */}
            <Grid item xs={12} sm={6} md={4}>
                <Box
                    sx={{
                    backgroundColor: color,
                    width: "100%",
                    height: 100,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRadius: "16px", // Rounded edges
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Optional: Add shadow for depth
                    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effects
                    "&:hover": {
                        transform: "scale(1.05)", // Slightly enlarge on hover
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)", // Intensify shadow on hover
                    },
                    }}
                    onClick={() => toggleProductGrid(index)} // Handle click
                >
                    {color}
                </Box>
                </Grid>


            {/* Conditionally render ProductGrid below the active color box */}
            {activeColorIndex === index && (
              <Grid item xs={12}>
                <Box mt={2}>
                  <ProductGrid ProductColor={color} />
                </Box>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorGridPage;
