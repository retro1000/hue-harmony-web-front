import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import {
  Stack,
  Box,
  styled,
  IconButton,
} from "@mui/material";
import {
  PopupFormDialog,
  Breadcrumb,
  MuiTable,
  TButton,
} from "app/components";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/AddBox";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function SalesInvoiceList() {
  const navigate = useNavigate();
  const { apiNonAuth } = useAxios();
  const [data, setData] = useState([]);  // Added state for data

  useEffect(() => {
    fetchData();  // Automatically call the fetchData function on component load
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiNonAuth.get("invoice/list");  // GET request to fetch invoices
      const transformedData = response.data
        .filter((invoice) => invoice.id != null)  // Ensure we don't process null invoices
        .map((invoice) => ({
          invoiceId: invoice.id,
          customer: invoice.customerId || 'N/A',  // Added condition to handle null customerId
          invoiceDate: invoice.invoiceDate,
          dueDate: invoice.dueDate || 'N/A',  // Fallback value if dueDate is null
          totalAmount: invoice.totalAmount,
          billingAddress: invoice.billingAddress,
          actions: (
            <IconButton onClick={() => handleViewInvoice(invoice)}>
              <ViewIcon />
            </IconButton>
          ),
        }));
      setData(transformedData);  // Update the state with the transformed data
    } catch (err) {
      console.error(err);  // Log errors if the GET request fails
    }
  };

  const handleViewInvoice = (invoice) => {
    console.log(invoice);  // Log the invoice data
    navigate(`/invoice/view/${invoice.invoiceId}`);  // Navigate to the view invoice page
  };

  const invoiceForm = () => {
    navigate("/invoice/create-invoice"); // Navigate to invoice creation page
  };

  const columns = [
    { label: "Invoice ID", name: "invoiceId" },
    { label: "Invoice Date", name: "invoiceDate" },
    { label: "Billing Address", name: "billingAddress" },
    { label: "Total Amount", name: "totalAmount" },
    { 
      label: "Actions",
      name: "actions",
      render: (row) => (
        <IconButton onClick={() => handleViewInvoice(row)}>
          <ViewIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Invoices" },
            { name: "List" },
          ]}
        />
      </Box>

      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
        spacing={5}
      >
        <Box
          gap={"0.5em"}
          display={"flex"}
          flexWrap={"wrap"}
          sx={{ width: "100%" }}
        >
          <TButton
            title={"Create Invoice"}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            fun={invoiceForm}
            label={"Create Invoice"}
          />
        </Box>
        <MuiTable title="Invoices" columns={columns} data={data} />
      </Stack>
    </Container>
  );
}

export default SalesInvoiceList;
