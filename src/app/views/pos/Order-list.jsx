import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import NavBar from "app/components/Pos/PosNavNew";
import ProfileSidebar from "app/components/Pos/PosSide";
import { useAxios } from "../../hooks/useAxios";
import { format } from 'date-fns';  // For formatting dates

// Define colors for different statuses
const statusColors = {
  Pending: "warning",
  COMPLETED: "success",
  Canceled: "error",
  InProgress: "info",
};

const columns = [
  { 
    field: "orderNumber", 
    headerName: "Order Number", 
    width: 150, 
    headerAlign: "center", 
    align: "center" 
  },
  { 
    field: "total", 
    headerName: "Total", 
    width: 150, 
    headerAlign: "center", 
    align: "center" 
  },
  { 
    field: "subTotal", 
    headerName: "Sub Total", 
    width: 150, 
    headerAlign: "center", 
    align: "center" 
  },
  { 
    field: "discount", 
    headerName: "Discount", 
    width: 150, 
    headerAlign: "center", 
    align: "center" 
  },
  {
    field: "orderDate", 
    headerName: "Order Date", 
    width: 150, 
    headerAlign: "center", 
    align: "center", 
    renderCell: (params) => {
      const orderDate = params.value;
      // Format the date to only show day, month, and year
      const formattedDate = format(new Date(orderDate), 'dd-MM-yyyy'); 
      return (
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center', // Horizontally center
            alignItems: 'center', // Vertically center
            height: '100%', // Ensure full height
          }}
        >
          <Typography sx={{ fontSize: 14 }} align="center">
            {formattedDate}
          </Typography>
        </Box>
      ); // Center the text with smaller font size
    },
  },
  {
    field: "orderStatus", 
    headerName: "Status", 
    width: 150, 
    headerAlign: "center", 
    align: "center", 
    renderCell: (params) => {
      const status = params.value;
      return (
        <Chip
          label={status}
          style={{
            backgroundColor: status === "COMPLETED" ? "#4caf50" : "",
            color: status === "Completed" ? "white" : "",
          }}
          size="small"
        />
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    headerAlign: "center",
    align: "center",
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
  const { apiNonAuth } = useAxios();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNonAuth.get(
          "http://localhost:8080/pos/get-orders/123"
        );
        const data = response.data;

        // Map the fetched data to the format required by the DataGrid
        const mappedData = data.map((order) => ({
          id: order.orderNumber, 
          orderNumber: order.orderNumber,
          total: order.total,
          subTotal: order.subTotal,
          discount: order.discount,
          orderStatus: order.orderStatus,
          orderDate: order.orderDate, 
        }));

        setOrderDetails(mappedData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <NavBar />
      <Grid container sx={{ height: `calc(100vh - 80px)`, overflow: "hidden" }}>
        <ProfileSidebar />
        
        <Grid item xs={9.8} sx={{ backgroundColor: "#ffffff",height:'100%' }}>
          <Box sx={{ height: "100%", borderLeft: "4px solid #e0e0e0" }}>
            <Paper
              elevation={0}
              style={{
                padding: 5,
                marginTop: 30,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                height:'85%'
              }}
            >
              <Box pl={3} mb={0}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  ORDER DETAILS
                </Typography>
              </Box>
              <div
                style={{
                  width: "95%",
                  height: "75vh", 
                }}
              >
                <DataGrid
                  rows={orderDetails}
                  columns={columns}
                  loading={loading}
                />
              </div>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderList;
