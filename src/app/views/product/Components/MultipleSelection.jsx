import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelectChip = ({ label, value, onChange, options }) => {
  const theme = useTheme();

  const getStyles = (name, selected, theme) => ({
    fontWeight: selected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  });

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput id={`select-multiple-chip-${label}`} label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, value, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectChip;
