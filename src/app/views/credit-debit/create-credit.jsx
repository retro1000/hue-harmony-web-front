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

const CreateCreditNote = () => {
  const { apiNonAuth } = useAxios();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState({
    creditNoteDate: "",
    creditNoteNotes: "",
    creditAmount: 0, // Add credit amount here
  });
  const [invoices, setInvoices] = useState([]);

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
    const fetchInvoices = async () => {
      if (selectedCustomer) {
        try {
          const response = await apiNonAuth.get(`invoice/get-by-customer/${selectedCustomer.customerId}`);
          setInvoices(response.data);
        } catch (err) {
          console.error("Error fetching invoices:", err);
        }
      }
    };

    fetchInvoices();
  }, [selectedCustomer]);

  const handleSelectCustomer = (e) => {
    const selected = customers.find(
      (customer) => customer.customerId === e.target.value
    );
    setSelectedCustomer(selected || null);
    setSelectedInvoice(null); // Reset invoice when customer changes
  };

  const handleSelectInvoice = (e) => {
    setSelectedInvoice(e.target.value);
    const selectedInvoice = invoices.find(invoice => invoice.invoiceId === e.target.value);
    if (selectedInvoice) {
      setFormData({
        creditNoteDate: selectedInvoice.invoiceDate || '',
        creditNoteNotes: '',
        creditAmount: 0, // Reset credit amount when new invoice is selected
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before submitting the credit note.");
      return;
    }

    if (!selectedInvoice) {
      alert("Please select an invoice before submitting the credit note.");
      return;
    }

    const jsonData = {
      creditNoteDate: formData.creditNoteDate,
      creditNoteNotes: formData.creditNoteNotes,
      customer: selectedCustomer.customerId,
      invoiceId: selectedInvoice,
      creditAmount: formData.creditAmount, // Add credit amount to the request
    };

    const fetchData = async (data) => {
      try {
        const response = await apiNonAuth.post("credit-debit/create/credit", data);
        console.log("Credit Note Created", response);
        navigate('/credit-debit/credit/list');
      } catch (err) {
        console.error("Error creating credit note:", err);
      }
    };

    fetchData(jsonData);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Credit Note" }, { name: "Create" }]} />
      </Box>
      <Box sx={{ marginBottom: 6, mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Create Credit Note
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
              Please Select an Invoice
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                select
                value={selectedInvoice || ""}
                variant="outlined"
                size="small"
                sx={{ mr: 2, flex: 1 }}
                onChange={handleSelectInvoice}
              >
                <MenuItem value="">Select an invoice</MenuItem>
                {invoices.map((invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.id} | {invoice.invoiceDate}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>
        )}

        <Paper elevation={1} sx={{ mb: 4, p: 2, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Credit Note Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Credit Note Date"
                type="date"
                name="creditNoteDate"
                value={formData.creditNoteDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Credit Amount"
                type="number"
                name="creditAmount"
                value={formData.creditAmount}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Credit Note Notes"
                name="creditNoteNotes"
                value={formData.creditNoteNotes}
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
          Create Credit Note
        </Button>
      </Box>
    </Container>
  );
};

export default CreateCreditNote;
