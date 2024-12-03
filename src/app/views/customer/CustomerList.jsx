import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Stack,
  Box,
  styled,
  Grid,
  IconButton,
  Icon,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  Breadcrumb,
  SimpleCard,
  MuiTable,
  PopupFormDialog,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddCustomerIcon from '@mui/icons-material/PersonAdd';
//import useAuth from "app/hooks/useAuth";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function CustomerList() {
 // const { role } = useAuth();
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState("barcode");
  const [searchText, setSearchText] = useState(undefined);
  const [datatableData, setDataTableData] = useState([]);
  const [addCustomerOn, setAddCustomerOn] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    contactPerson: "",
    nic: "",
    contactNo: "",
    emailAddress: "",
    contactPersonNumber: "",
    landPhone: "",
    businessAddress: "",
    deliveryAddress: "",
    contactNos: [],
  });

  const [columns, setColumns] = useState([
    { label: "ID", field: "id" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Business Address", field: "businessAddress" },
    { label: "Shipping Address", field: "shippingAddress" },
    { label: "Contact No", field: "contactNo" },
    { label: "Contact Person Number", field: "contactPersonNumber" },
    { label: "Email", field: "emailAddress" },
    { label: "Total Purchases", field: "totalPurchases" },
    { label: "Status", field: "status" },
    {
      label: "Actions",
      field: "actions",
      render: (row) => (
        
          <IconButton onClick={() => handleViewCustomer(row)}>
            <ViewIcon />
          </IconButton>
         
         
        
      ),
    },
  ]);

  // Fetch customer data from backend
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
       // const response = await axios.get('/api/customers');
        const response = null;
        // const fetchedData = response.data.map(customer => [
        //   customer.id,
        //   customer.firstName,
        //   customer.lastName,
        //   customer.businessAddress,
        //   customer.shippingAddress,
        //   customer.contactNo,
        //   customer.contactPersonNumber,
        //   customer.emailAddress,
        //   customer.totalPurchases,
        //   customer.status,
        // ]);
        //setDataTableData(fetchedData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

   // fetchCustomerData();
  }, []);

  // Function to handle adding a new customer
  const handleAddCustomer = async () => {
    try {
      const response = await axios.post('/api/customers', newCustomer);
      if (response.status === 201) {
        // Close the popup form and reload the customer data
        setAddCustomerOn(false);
       // fetchCustomerData();
      }
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };

  // Handling actions on customer (view/edit/delete)
  const handleViewCustomer = (row) => {
    navigate(`/customer/view/${row.id}`);
  };

  const handleEditCustomer = (row) => {
    navigate(`/customer/edit/${row.id}`);
  };

  const handleDeleteCustomer = (row) => {
    // Handle delete customer logic
    console.log("Deleting customer", row.id);
  };

  const addCustomerFields = [
    {
      title: "Customer Details",
      inputs: [
        {
          key: "cus_f_name_text",
          required: true,
          id: "cus_f_name_text",
          name: "firstName",
          label: "Customer First Name",
          type: "text",
          placeholder: "Enter customer first name",
          value: newCustomer.firstName || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, firstName: val }),
        },
        {
          key: "cus_l_name_text",
          required: true,
          id: "cus_l_name_text",
          name: "lastName",
          label: "Customer Last Name",
          type: "text",
          placeholder: "Enter customer last name",
          value: newCustomer.lastName || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, lastName: val }),
        },
        {
          key: "cus_biz_name_text",
          required: false,
          id: "cus_biz_name_text",
          name: "businessName",
          label: "Business Name",
          type: "text",
          placeholder: "Enter business name",
          value: newCustomer.businessName || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, businessName: val }),
        },
        {
          key: "cus_contact_person_text",
          required: false,
          id: "cus_contact_person_text",
          name: "contactPerson",
          label: "Contact Person",
          type: "text",
          placeholder: "Enter contact person",
          value: newCustomer.contactPerson || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, contactPerson: val }),
        },
        {
          key: "cus_contact_no_text",
          required: true,
          id: "cus_contact_no_text",
          name: "contactNo",
          label: "Contact Number",
          type: "text",
          placeholder: "Enter contact number",
          value: newCustomer.contactNo || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, contactNo: val }),
        },
        {
          key: "cus_email_text",
          required: true,
          id: "cus_email_text",
          name: "emailAddress",
          label: "Email Address",
          type: "email",
          placeholder: "Enter email address",
          value: newCustomer.emailAddress || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, emailAddress: val }),
        },
        {
          key: "cus_delivery_address_text",
          required: false,
          id: "cus_delivery_address_text",
          name: "deliveryAddress",
          label: "Delivery Address",
          type: "text",
          placeholder: "Enter delivery address",
          value: newCustomer.deliveryAddress || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, deliveryAddress: val }),
        },
      ],
    },
    {
      title: "Additional Contact Numbers",
      inputs: [
        {
          key: "cus_land_phone_text",
          required: false,
          id: "cus_land_phone_text",
          name: "landPhone",
          label: "Landline Phone",
          type: "text",
          placeholder: "Enter landline phone",
          value: newCustomer.landPhone || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, landPhone: val }),
        },
        {
          key: "cus_contact_person_number_text",
          required: false,
          id: "cus_contact_person_number_text",
          name: "contactPersonNumber",
          label: "Contact Person Number",
          type: "text",
          placeholder: "Enter contact person number",
          value: newCustomer.contactPersonNumber || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, contactPersonNumber: val }),
        },
      ],
    },
  ];

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between">
        <Breadcrumb routeSegments={[{ name: "Customers", path: "/customer/list" }]} />
        {/* {role === "admin" && (
          <IconButton onClick={() => setAddCustomerOn(true)} color="primary">
            <AddCustomerIcon />
          </IconButton>
        )} */}
      </Stack>
      <SimpleCard title="Customer List">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Search bar logic */}
          </Grid>
        </Grid>
        <MuiTable
          columns={columns}
          data={datatableData}
          count={datatableData.length}
        />
      </SimpleCard>
      <PopupFormDialog
        open={addCustomerOn}
        title="Add New Customer"
        onClose={() => setAddCustomerOn(false)}
        formFields={addCustomerFields}
        onSubmit={handleAddCustomer}
      />
    </Container>
  );
}

export default CustomerList;
