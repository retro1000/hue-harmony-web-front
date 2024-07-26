
import React from "react";
import { Tabs, Tab } from "@mui/material";

function ColorTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="color tabs">
      <Tab label="Colours ready to buy" />
      <Tab label="Colours to be mixed in store" />
    </Tabs>
  );
}

export default ColorTabs;
