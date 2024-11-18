import React from 'react';
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';
import { Typography } from 'antd';
import { useFormatter } from 'app/hooks/useFormatter';

const RadioButtonGroup = ({ options, selectedOption, onChange, label }) => {
  const { DefaultWordFormat2 } = useFormatter();

  const handleRadioChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <Typography variant={'body1'}>{label}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <RadioGroup
          value={DefaultWordFormat2(selectedOption)}
          onChange={handleRadioChange}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          {options.map((option) => (
            <FormControlLabel
              sx={{ width: 'max-content' }}
              key={option}
              value={DefaultWordFormat2(option)}
              control={<Radio size="small" />}
              label={option}
            />
          ))}
        </RadioGroup>
      </Box>
    </>
  );
};

export default RadioButtonGroup;
