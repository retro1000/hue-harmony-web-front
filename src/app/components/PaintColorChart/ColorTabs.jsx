import React from "react";
import { Tabs, Tab } from "@mui/material";

function ColorTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="color tabs"
      sx={{
        '& .MuiTab': {
          color: '#ED005D',
        },
        '& .MuiTab-root': {
          color: '#ED005D',
        },
        '& .Mui-selected': {
          color: '#ED005D',
        },
        '& .MuiTabs-indicator': {
          backgroundColor: '#ED005D',
        },
      }}
    >
      <Tab label="Colours ready to buy" />
      <Tab label="Colours to be mixed in store" />
    </Tabs>
  );
}

export default ColorTabs;
