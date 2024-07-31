import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const ColorBox = styled(Box)(({ color, isSelected }) => ({
  width: "100%",
  height: 100,
  backgroundColor: color,
  cursor: "pointer",
  border: isSelected ? "3px solid black" : "none",
}));

const colors = [
  "#DE032E",
  "#F28E16",
  "#FFCD00",
  "#FFEC00",
  "#B7CE0D",
  "#3F993F",
  "#2FAF9F",
  "#4376A3",
  "#745184",
  "#8F9293",
  "#C1B28B",
];

function ColorPalette() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <Grid container spacing={1}>
      {colors.map((color, index) => (
        <Grid item xs={1} key={index}>
          <ColorBox
            color={color}
            isSelected={selectedColor === color}
            onClick={() => handleColorClick(color)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ColorPalette;
