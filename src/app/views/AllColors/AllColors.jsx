import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductGrid from "./component/ProductGrid"; // Assuming ProductGrid is implemented

const ColorGridPage = () => {
  // Array of color codes
  const colorArray = [
    "#A52A2A", // BROWN
    "#FFDAB9", // PEACH_PUFF
    "#FFC0CB", // PINK
    "#F5F5DC", // BEIGE
    "#FFF8DC", // CORNSILK
    "#FF007F", // DEEP_PINK
    "#FF69B4", // HOT_PINK
    "#FAEBD7", // ANTIQUE_WHITE
    "#FF8C69", // DARK_SALMON
    "#F8F8FF", // GHOST_WHITE
    "#FFEFD5", // PAPAYA_WHIP
    "#D2B48C", // TAN
    "#FFC8C8", // LIGHT_PINK
    "#FDF5E6", // OLD_LACE
    "#FF4500", // ORANGE_RED
    "#F5DEB3", // WHEAT
    "#000000", // BLACK
    "#FFFFFF", // WHITE
    "#FF0000", // RED
    "#00FF00", // GREEN
    "#0000FF", // BLUE
    "#00FFFF", // CYAN
    "#FF00FF", // MAGENTA
    "#FFFF00", // YELLOW
    "#FFA500", // ORANGE
    "#800080", // PURPLE
    "#808080", // GRAY
    "#C0C0C0", // SILVER
    "#FFD700", // GOLD
    "#000080", // NAVY
    "#008080", // TEAL
    "#800000"  // MAROON
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
                    color: "#000",
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
                  <ProductGrid Title={"Products"} productColor={color} />
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
