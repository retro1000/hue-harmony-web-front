import React, { useState } from "react";
import { Box, Typography, Radio, Card, CardContent, CardActions, Button } from "@mui/material";

const ColorSelector = (productColor) => {
  const [selectedColor, setSelectedColor] = useState(null);



  const colors = [
    {productColor}
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2} mb={3}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6">Colours:</Typography>
        <Box display="flex" gap={1}>
          {colors.map((color) => (
            <Radio
              key={color}
              checked={selectedColor === color}
              onChange={() => setSelectedColor(color)}
              value={color}
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                color: color,
                '&.Mui-checked': {
                  color: color,
                },
                '& .MuiSvgIcon-root': {
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  backgroundColor: color,
                  boxShadow: selectedColor === color ? '0 0 0 2px black' : 'none',
                },
              }}
            />
          ))}
        </Box>
      </Box>
      {selectedColor && (
        <Card sx={{ backgroundColor: selectedColor, color: "#fff" }}>
          <CardContent>
            <Typography variant="body1">#a0bfe0</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ color: "#fff" }}>Bot</Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default ColorSelector;
