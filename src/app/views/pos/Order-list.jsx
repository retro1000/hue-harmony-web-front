import React from 'react';
import { Box, Paper, Typography, IconButton, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import PosNav from 'app/components/Pos/PosNav';

const orderDetails = [
  { id: 1, invoice: 'INV-00001001', client: 'Client-001', grandTotal: '30000.00', balanceDue: 0.0, date: '2024/07/30', status: 'active' },
  { id: 2, invoice: 'INV-00001002', client: 'Client-002', grandTotal: '40000.00', balanceDue: 5000.0, date: '2024/07/31', status: 'inactive' },
  { id: 3, invoice: 'INV-00001003', client: 'Client-003', grandTotal: '50000.00', balanceDue: 10000.0, date: '2024/08/01', status: 'active' },
  { id: 4, invoice: 'INV-00001004', client: 'Client-004', grandTotal: '60000.00', balanceDue: 15000.0, date: '2024/08/02', status: 'inactive' },
  { id: 5, invoice: 'INV-00001005', client: 'Client-005', grandTotal: '70000.00', balanceDue: 20000.0, date: '2024/08/03', status: 'active' },
  { id: 6, invoice: 'INV-00001006', client: 'Client-006', grandTotal: '80000.00', balanceDue: 25000.0, date: '2024/08/04', status: 'inactive' },
  { id: 1, invoice: 'INV-00001001', client: 'Client-001', grandTotal: '30000.00', balanceDue: 0.0, date: '2024/07/30', status: 'active' },
  { id: 2, invoice: 'INV-00001002', client: 'Client-002', grandTotal: '40000.00', balanceDue: 5000.0, date: '2024/07/31', status: 'inactive' },
  { id: 3, invoice: 'INV-00001003', client: 'Client-003', grandTotal: '50000.00', balanceDue: 10000.0, date: '2024/08/01', status: 'active' },
  { id: 4, invoice: 'INV-00001004', client: 'Client-004', grandTotal: '60000.00', balanceDue: 15000.0, date: '2024/08/02', status: 'inactive' },
  { id: 5, invoice: 'INV-00001005', client: 'Client-005', grandTotal: '70000.00', balanceDue: 20000.0, date: '2024/08/03', status: 'active' },
  { id: 6, invoice: 'INV-00001006', client: 'Client-006', grandTotal: '80000.00', balanceDue: 25000.0, date: '2024/08/04', status: 'inactive' },
  
];

const columns = [
  { field: 'invoice', headerName: 'Invoice', width: 200 },
  { field: 'client', headerName: 'Client', width: 200 },
  { field: 'grandTotal', headerName: 'Grand Total', width: 200 },
  { field: 'balanceDue', headerName: 'Balance Due', width: 200 },
  { field: 'date', headerName: 'Date', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    renderCell: (params) => (
      <Button
        variant="contained"
        style={{
          backgroundColor: params.value === 'active' ? 'green' : 'grey',
          color: 'white',
        }}
      >
        {params.value}
      </Button>
    ),
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => <ActionCell params={params} />,
  },
];

const ActionCell = ({ params }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/view-order/${params.row.id}`);
  };

  return (
    <IconButton color="primary" aria-label="view" onClick={handleViewClick}>
      <VisibilityIcon />
    </IconButton>
  );
};

function OrderList() {
  return (
    <Box>
      <PosNav />
      <Paper elevation={0} style={{ padding: 5, marginTop: 30, borderRadius: 20 }}>
        <Box pl={3} mb={2}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            ORDER DETAILS
          </Typography>
        </Box>
        <div style={{ width: '100%' }}>
          <DataGrid rows={orderDetails} columns={columns} pageSize={4} autoHeight />
        </div>
      </Paper>
    </Box>
  );
}

export default OrderList;
