import React from 'react';
import useSettings from 'app/hooks/useSettings';
import logoImage from './MatxLayout/HH01.png';
import { Box } from '@mui/material'; // Adjust the path as necessary

export default function MatxLogo({ className }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // More transparent white background
        padding: '8px', // Optional: Add some padding
        borderRadius: '4px', // Optional: Add border radius for rounded corners
        display: 'inline-block', // Ensure the Box only takes as much space as needed
      }}
    >
      <img
        src={logoImage}
        alt="Matx Logo"
        width="140px"
        height="40px"
        className={className}
      />
    </Box>
  );
}
