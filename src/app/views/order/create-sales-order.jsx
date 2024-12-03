import React from "react";
import { styled, Box, Typography, Paper } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState, useEffect } from "react";
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
import axios from "axios";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CreateOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customer data from backend using Axios
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers"); // Replace with your actual endpoint
        setCustomers(response.data); // Assuming the response contains an array of customers
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Handle customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // Handle closing the selected customer
  const handleCloseCustomer = () => {
    setSelectedCustomer(null);
  };

  const [formData, setFormData] = useState({
    orderDate: "",
    orderNotes: "",
    discountAmount: 0,
    billingAddress: "",
    shipmentVariationStatus: "PENDING", // Default value
    shipmentDate: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    // e.preventDefault();

    // Create JSON object from form data
    const jsonData = {
      customer: selectedCustomer.id,
      orderDate: formData.orderDate,
      orderNotes: formData.orderNotes,
      discountAmount: formData.discountAmount,
      billingAddress: formData.billingAddress,
      totalAmount: formData.total,
      shipmentVariationStatus: formData.shipmentVariationStatus,
      shipmentDate: formData.shipmentDate,
      orderItems: rows,
    };

    console.log(jsonData); // Log the JSON data or submit it to your backend
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(27960.0); // Initialize total sum of net totals

  // Product list (you can update this list based on your requirements)
  const productList = [
    { value: "DIS 001: Demo Product (11534.102)", unitPrice: 27960.0 },
    { value: "DIS 002: Another Product (11534.103)", unitPrice: 15000.0 },
    { value: "DIS 003: Sample Product (11534.104)", unitPrice: 20000.0 },
  ];

  // Add new row
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

  // Update product, unit price, quantity, and calculate net total
  const handleInputChanges = (e, id, field) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: e.target.value };
        // If product is selected, update unit price and recalculate net total
        if (field === "product") {
          const selectedProduct = productList.find(
            (p) => p.value === e.target.value
          );
          updatedRow.unitPrice = selectedProduct
            ? selectedProduct.unitPrice
            : 0;
          updatedRow.netTotal = updatedRow.unitPrice * updatedRow.quantity;
        } else if (field === "unitPrice" || field === "quantity") {
          updatedRow.netTotal = updatedRow.unitPrice * updatedRow.quantity;
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Update total sum whenever rows are updated
  useEffect(() => {
    const newTotal = rows.reduce((sum, row) => sum + row.netTotal, 0);
    setTotal(newTotal);
  }, [rows]); // This

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Invoice" }, { name: "Create" }]} />
      </Box>

      <Box sx={{ marginBottom: 6, mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: "grey.00",
            }}
          >
            {" "}
            Create Sales Order
          </Typography>
        </Box>
        <Paper elevation={0} sx={{ mb: 4, p: 1, borderRadius: 4 }}>
          <Box sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Please Select a Customer
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
            </Typography>

            {/* Customer selection dropdown or list */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                select
                //label="Customer"
                value={selectedCustomer ? selectedCustomer.id : ""}
                variant="outlined"
                size="small"
                sx={{ mr: 2, flex: 1 }}
                onChange={(e) => {
                  const selected = customers.find(
                    (customer) => customer.id === e.target.value
                  );
                  handleSelectCustomer(selected);
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} | {customer.email}
                  </option>
                ))}
              </TextField>
              <IconButton onClick={handleCloseCustomer}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Display selected customer information */}
            {selectedCustomer && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={0} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", border: "1px solid #ccc", p: 1 }}
                    >
                      <Box
                        sx={{
                          borderRight: "2px solid #ccc",
                          width: "10%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                          Field
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "90%",
                        }}
                      >
                        <Typography variant="body1" style={{ fontWeight: 800 }}>
                          Information
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", border: "1px solid #ccc", p: 1 }}
                    >
                      <Box
                        sx={{
                          borderRight: "2px solid #ccc",
                          width: "10%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="body1">Name</Typography>
                      </Box>
                      <Typography variant="body1">
                        {selectedCustomer.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", border: "1px solid #ccc", p: 1 }}
                    >
                      <Box
                        sx={{
                          borderRight: "2px solid #ccc",
                          width: "10%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="body1">Address</Typography>
                      </Box>
                      <Typography variant="body1">
                        {selectedCustomer.address}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ mb: 4, p: 1, borderRadius: 4 }}>
          <Box sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Please Fill Data
              </Typography>
            </Box>

            <form>
              <Grid container spacing={2}>
                {/* Order Date */}
                <Grid item xs={4}>
                  <TextField
                    label="Order Date" // Uncomment this if you want the label to show
                    fullWidth
                    required
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleInputChange}
                    type="date"
                    InputLabelProps={{
                      shrink: true, // Ensures the label stays above the input even when the input is not focused
                    }}
                  />
                </Grid>

                {/* Order Notes */}
                <Grid item xs={4}>
                  <TextField
                    label="Order Notes"
                    fullWidth
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Discount Amount */}
                <Grid item xs={4}>
                  <TextField
                    label="Discount Amount"
                    fullWidth
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Grid>

                {/* Billing Address */}
                <Grid item xs={4}>
                  <TextField
                    label="Billing Address"
                    fullWidth
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Total Amount */}
                <Grid item xs={4}>
                  <TextField
                    label="Total Amount"
                    fullWidth
                    name="totalAmount"
                    value={total}
                    // onChange={handleInputChange}
                    type="number"
                  />
                </Grid>

                {/* Shipment Date */}
                <Grid item xs={4}>
                  <TextField
                    label="Shipment Date" // Uncomment this if you want the label to show
                    fullWidth
                    required
                    name="shipmentDate"
                    value={formData.shipmentDate}
                    onChange={handleInputChange}
                    type="date"
                    InputLabelProps={{
                      shrink: true, // Ensures the label stays above the input even when the input is not focused
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
        <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Product Details
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Note: Please add all the items and Click Finish to Proceed.
          </Typography>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Net Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        value={row.product}
                        onChange={(e) =>
                          handleInputChanges(e, row.id, "product")
                        }
                      >
                        <MenuItem value="">
                          <em>Choose a product</em>
                        </MenuItem>
                        {productList.map((product) => (
                          <MenuItem key={product.value} value={product.value}>
                            {product.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={row.unitPrice}
                        onChange={(e) =>
                          handleInputChanges(e, row.id, "unitPrice")
                        }
                        type="number"
                        disabled // Unit price is set automatically when product is selected
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={row.quantity}
                        onChange={(e) =>
                          handleInputChanges(e, row.id, "quantity")
                        }
                        type="number"
                      />
                    </TableCell>
                    <TableCell>{row.netTotal}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Display total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            {/* <Typography variant="h6">Total: {total.toFixed(2)}</Typography> */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ bgcolor: "#9e9e9e" }} // Grey color with hover effect
              onClick={handleAddItem} // Add item functionality
            >
              Add Item
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "25%",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit} // Attach the handleSubmit function to the onClick event
              >
                Create Order
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOrder;
