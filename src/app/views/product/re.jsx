import React from 'react';
import {
    Stack,
  Box,
//   Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { Breadcrumb } from "app/components";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));

const ReservationDetail = () => {
  return (
    <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, { name: "List" }]} />
        </Box>
        <Stack maxWidth="lg">
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
            Reservation
            </Typography>
            <Typography variant="subtitle1">
            Details of Reservation #33
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
            <Button variant="contained" color="primary">
                Edit Reservation
            </Button>
            <Box>
                <Button variant="contained" color="error" sx={{ mr: 1 }}>
                Cancel
                </Button>
                <Button variant="contained" color="success">
                Release
                </Button>
            </Box>
            </Box>
            <Typography variant="body1" gutterBottom>
            Reason: sick
            </Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Store Name</TableCell>
                    <TableCell>Issued Qty</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>P8 - Demo Product - 8</TableCell>
                    <TableCell>Store 2</TableCell>
                    <TableCell>1 NOS</TableCell>
                    <TableCell>
                    <Button variant="contained" color="primary" size="small">
                        Reserved
                    </Button>
                    </TableCell>
                    <TableCell>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
            <Box display="flex" flexDirection="column" mt={2}>
            <TextField
                label="Please Scan or Enter Item Barcode no."
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Please Enter Item Serial no."
                variant="outlined"
                margin="normal"
            />
            </Box>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mt: 2 }}>
            Add row
            </Button>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mt: 2, ml: 1 }}>
            Add multiple rows
            </Button>
            <Button variant="contained" color="success" sx={{ mt: 2, ml: 1 }}>
            Save new items
            </Button>
            <Box mt={2}>
            <Button variant="contained" color="primary">
                Add Support Document
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                Add Folder
            </Button>
            </Box>
        </Paper>
        </Stack>
    </Container>
  );
};

export default ReservationDetail;
