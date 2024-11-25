import React from 'react';
import { Box, Paper, Typography, IconButton, Button,Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import PosNav from 'app/components/Pos/PosNav';
import NavBar from "app/components/Pos/PosNavNew";
import HomeIcon from "@mui/icons-material/Home";
import OrderIcon from "@mui/icons-material/Receipt";
import MenuIcon from "@mui/icons-material/Menu";
import WalletIcon from "@mui/icons-material/Wallet";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
      <NavBar />
      <Grid container sx={{ height: `calc(100vh - 90px)`,overflow: "hidden", }}>
      <Grid item xs={2.2} sx={{ backgroundColor: "#ffffff" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              backgroundColor: "#fff",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "5%",
                backgroundColor: "transparent", // Corrected backgroundColor
              }}
            >
              <img
                src="assets/images/cashier5.png"
                alt="Employee"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                }}
              />
            </Box>
            <Typography
              variant="h7"
              sx={{
                fontWeight: "bold",
                color: "#000",
                font: "Roboto, Arial, sans-serif",
              }}
            >
              John Doe
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                marginTop: "20px",
                justifyItems: "center",
                width: "70%",
              }}
            >
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <HomeIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <OrderIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MenuIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <WalletIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <HistoryIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF1493",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <PersonIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                position: "relative",
                top: "6px",
                width: "210px",
                height: "190px",
                overflow: "hidden",
                borderRadius: "5%",
                zIndex: 5,
                backgroundColor: "trasparent", // Ensure container has no background color
              }}
            >
              <img
                src="assets/images/cashier4.png"
                alt="Employee"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }} // Ensure image has no background color
              />
            </Box>

            <Box sx={{ marginTop: "17px" }}>
              <IconButton
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "#fff",
                  width: "150px", // Long button width
                  padding: "10px 20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => console.log("Logout clicked")}
              >
                <ExitToAppIcon sx={{ marginRight: "10px" }} />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial, sans-serif !important",
                  }}
                >
                  Logout
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9.8} sx={{ backgroundColor: "#ffffff" }}>
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
      </Grid>
      </Grid>
    </Box>
    
  );
}

export default OrderList;
