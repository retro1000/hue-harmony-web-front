import react from 'react';
import { Card, CardContent , CardMedia, Typography, Checkbox, FormControlLabel } from '@mui/material';


export const ProductCard = ({ title, description, available, imageUrl }) => (
    <Card
    sx={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {available ? "Available" : "Only Available in Store"}
        </Typography>
        <FormControlLabel control={<Checkbox />} label="Compare" />
      </CardContent>
    </Card>
  );