import React, { useState, useEffect } from "react";
import { styled, Box, Typography, Paper, TextField, IconButton, MenuItem, Button, Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import CloseIcon from "@mui/icons-material/Close";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CreateInvoice = () => {
  const { apiNonAuth } = useAxios();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    invoiceDate: "",
    invoiceNotes: "",
    discountAmount: 0,
    billingAddress: "",
    totalAmount: 0,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNonAuth.get("wholesalecustomer/get-all");
        setCustomers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (selectedCustomer) {
        try {
          const response = await apiNonAuth.get(`wholeSale/get-by-customer/${selectedCustomer.customerId}`);
          setOrders(response.data);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      }
    };

    fetchOrders();
  }, [selectedCustomer]);

  const handleSelectCustomer = (e) => {
    const selected = customers.find(
      (customer) => customer.customerId === e.target.value
    );
    setSelectedCustomer(selected || null);
    setSelectedOrder(null); // Reset order when customer changes
  };

  const handleSelectOrder = (e) => {
    setSelectedOrder(e.target.value);
    const selectedOrder = orders.find(order => order.orderId === e.target.value);
    if (selectedOrder) {
      setFormData({
        invoiceDate: selectedOrder.orderDate || '',
        billingAddress: selectedOrder.billingAddress || '',
        totalAmount: selectedOrder.totalAmount || 0,
        discountAmount: 0,
        invoiceNotes: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before submitting the invoice.");
      return;
    }

    if (!selectedOrder) {
      alert("Please select an order before submitting the invoice.");
      return;
    }

    const jsonData = {
      invoiceDate: formData.invoiceDate,
      invoiceNotes: formData.invoiceNotes,
      customerId: selectedCustomer.customerId,  // Make sure this is correct
      orderId: selectedOrder,
      discountAmount: formData.discountAmount,
      billingAddress: formData.billingAddress,
      totalAmount: formData.totalAmount,
    };

    // Ensure the selectedCustomer has a valid customerId before calling the API
    console.log(jsonData); // Log the data to confirm customerId is being passed

    const fetchData = async (data) => {
      try {
        const response = await apiNonAuth.post("invoice/create", data);
        console.log("Invoice Created", response);
        navigate('/invoice/sales/list');
      } catch (err) {
        console.error("Error creating invoice:", err);
      }
    };

    fetchData(jsonData);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Invoice" }, { name: "Create" }]} />
      </Box>
      <Box sx={{ marginBottom: 6, mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Create Invoice
        </Typography>
        <Paper elevation={1} sx={{ mb: 4, p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Please Select a Customer
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              select
              value={selectedCustomer?.customerId || ""}
              variant="outlined"
              size="small"
              sx={{ mr: 2, flex: 1 }}
              onChange={handleSelectCustomer}
            >
              <MenuItem value="">Select a customer</MenuItem>
              {customers.map((customer) => (
                <MenuItem key={customer.customerId} value={customer.customerId}>
                  {customer.customerId} | {customer.firstName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton onClick={() => setSelectedCustomer(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedCustomer && (
            <Box>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedCustomer.firstName}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {selectedCustomer.shippingAddress}
              </Typography>
            </Box>
          )}
        </Paper>

        {selectedCustomer && (
          <Paper elevation={1} sx={{ mb: 4, p: 2, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Please Select an Order
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                select
                value={selectedOrder || ""}
                variant="outlined"
                size="small"
                sx={{ mr: 2, flex: 1 }}
                onChange={handleSelectOrder}
              >
                <MenuItem value="">Select an order</MenuItem>
                {orders.map((order) => (
                  <MenuItem key={order.orderId} value={order.orderId}>
                    {order.orderId} | {order.orderDate}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>
        )}

        <Paper elevation={1} sx={{ mb: 4, p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Invoice Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Invoice Date"
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Billing Address"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Discount Amount"
                type="number"
                name="discountAmount"
                value={formData.discountAmount}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Total Amount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Invoice Notes"
                name="invoiceNotes"
                value={formData.invoiceNotes}
                onChange={handleInputChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 4 }}
        >
          Create Invoice
        </Button>
      </Box>
    </Container>
  );
};

export default CreateInvoice;
