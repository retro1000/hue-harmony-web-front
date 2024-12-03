import React, { useState, useEffect } from "react";
import { styled, Box, Typography, Paper } from "@mui/material";
import { Breadcrumb } from "app/components";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  MenuItem,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useAxios } from "../../hooks/useAxios";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CreateOrder = () => {
  const { apiNonAuth } = useAxios();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    orderDate: "",
    orderNotes: "",
    discountAmount: 0,
    billingAddress: "",
    shipmentVariationStatus: "PENDING",
    shipmentDate: "",
  });
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  

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

  const [productList, setProductList] = useState([]); // Manage state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNonAuth.get("wholesalecustomer/get-products");
        const products = response.data.map((item) => ({
          value: item.product,       // Use product ID directly as value
          unitPrice: item.fullPrice, // Use fullPrice for the unit price
        }));
        setProductList(products); // Update state with fetched products
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newTotal = rows.reduce((sum, row) => sum + row.netTotal, 0);
    setTotal(newTotal);
  }, [rows]);

  const handleSelectCustomer = (e) => {
    const selected = customers.find(
      (customer) => customer.customerId === e.target.value
    );
    setSelectedCustomer(selected || null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddItem = () => {
    const newRow = {
      id: rows.length + 1,
      product: "",
      unitPrice: 0,
      quantity: 1,
      netTotal: 0,
    };
    setRows([...rows, newRow]);
  };

  const handleInputChanges = (e, id, field) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: e.target.value };
        if (field === "product") {
          const selectedProduct = productList.find(
            (p) => p.value === e.target.value
          );
          updatedRow.unitPrice = selectedProduct?.unitPrice || 0;
          updatedRow.netTotal = updatedRow.unitPrice * updatedRow.quantity;
        } else if (field === "quantity") {
          updatedRow.netTotal = updatedRow.unitPrice * updatedRow.quantity;
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before submitting the order.");
      return;
    }

    const jsonData = {
      customer: selectedCustomer.id,
      ...formData,
      totalAmount: total,
      orderItems: rows,
    };

    console.log(jsonData);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Invoice" }, { name: "Create" }]} />
      </Box>
      <Box sx={{ marginBottom: 6, mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Create Sales Order
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
        <Paper elevation={1} sx={{ mb: 4, p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Order Date"
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Shipment Date"
                type="date"
                name="shipmentDate"
                value={formData.shipmentDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
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
                label="Shipment Variation Status"
                select
                name="shipmentVariationStatus"
                value={formData.shipmentVariationStatus}
                onChange={handleInputChange}
                fullWidth
              >
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="SHIPPED">Shipped</MenuItem>
                <MenuItem value="DELIVERED">Delivered</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Order Notes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={1} sx={{ mb: 4, p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Product Details
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Net Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <TextField
                        select
                        value={row.product}
                        onChange={(e) => handleInputChanges(e, row.id, "product")}
                      >
                        {productList.map((product) => (
                          <MenuItem key={product.value} value={product.value}>
                            {product.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>{row.unitPrice}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleInputChanges(e, row.id, "quantity")}
                      />
                    </TableCell>
                    <TableCell>{row.netTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit Order
        </Button>
      </Box>
    </Container>
  );
};

export default CreateOrder;
