import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAxios } from "../../hooks/useAxios";
import {
  Stack,
  Box,
  styled,
  Grid,
  IconButton,
  Icon,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  Breadcrumb,
  SimpleCard,
  MuiTable,
  PopupFormDialog,
  TButton,
} from "app/components";

//import { SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, PopupFormDialog} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddCustomerIcon from "@mui/icons-material/PersonAdd";
import useAuth from "app/hooks/useAuth";
import AddIcon from "@mui/icons-material/AddBox";

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
  const { api, apiNonAuth } = useAxios();
  const navigate = useNavigate();

  const [addCustomerOn, setAddCustomerOn] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    contactPerson: "",
    nic: "",
    contactNo: "",
    email: "",
    contactPersonNumber: "",
    landPhone: "",
    businessAddress: "",
    deliveryAddress: "",
    contactNos: [],
    address: "",
  });

  const [data, setData] = useState([]); // State for customer data

  const columns = [
    { label: "ID", name: "id" },
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
   // { label: "Business Address", name: "businessAddress" },
    { label: "Shipping Address", name: "shippingAddress" },
    { label: "Contact No", name: "contactNo" },
   // { label: "Contact Person Number", name: "contactPersonNumber" },
   // { label: "Email", name: "email" },
   // { label: "Total Purchases", name: "totalPurchases" },
    { label: "Status", name: "status" },
    {
      label: "Actions",
      name: "actions",
      render: (row) => (
        <IconButton onClick={() => handleViewCustomer(row)}>
          <ViewIcon />
        </IconButton>
      ),
    },
  ];

  const { role } = useAuth();

  const handleCreate = async () => {
    const customerData = {
      address: newCustomer.deliveryAddress || "",
      nicNo: newCustomer.nicNo || "",
      businessName: newCustomer.businessName || "",
      contactPerson: newCustomer.contactPerson || "",
      landPhone: newCustomer.landPhone || "",
      deliveryAddress: newCustomer.deliveryAddress || "",
      contactPersonNumber: newCustomer.contactPersonNumber || "",
      customerDto: {
        firstName: newCustomer.firstName || "",
        lastName: newCustomer.lastName || "",
        contactNos: [newCustomer.contactNo, newCustomer.contactPersonNumber].filter(Boolean),
        email: newCustomer.email || "",
      },
    };

    console.log("Customer Data:", customerData);

    try {
      const response = await apiNonAuth.post(
        "customer/create/wholesale-customer",
        customerData
      );

      setAddCustomerOn(false);

      console.log("Checkout successful:", response.data);

      // Reload data after successful creation
      fetchData();
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiNonAuth.get("wholesalecustomer/get-all");
      const transformedData = response.data.map((product) => ({
        id: product.customerId,
        firstName: product.firstName,
        lastName: product.lastName,
        businessAddress: product.businessAddress,
        shippingAddress: product.shippingAddress,
        contactNo: product.contactNo,
        contactPersonNumber: product.contactPersonNumber,
        email: product.email,
        totalPurchases: product.totalPurchases,
        status: product.status,
        actions: (
          <IconButton onClick={() => handleViewCustomer(product)}>
            <ViewIcon />
          </IconButton>
        ),
      }));
      setData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewCustomer = (row) => {
    navigate(`/customer/view/${row.id}`);
  };

  const handleEditCustomer = (row) => {
    navigate(`/customer/edit/${row.id}`);
  };

  const handleDeleteCustomer = (row) => {
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
          key: "cus_address_text",
          required: false,
          id: "cus_address_text",
          name: "address",
          label: "Address",
          type: "text",
          placeholder: "Enter address",
          value: newCustomer.address || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, address: val }),
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
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter email address",
          value: newCustomer.email || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, email: val }),
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
        {
          key: "cus_nic_text",
          required: true,
          id: "cus_nic_text",
          name: "nicNo",
          label: "NIC Number",
          type: "text",
          placeholder: "Enter NIC number",
          value: newCustomer.nicNo || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, nicNo: val }),
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
          setValue: (val) =>
            setNewCustomer({ ...newCustomer, contactPersonNumber: val }),
        },
      ],
    },
  ];

  return (
    <Container>
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
          {role === "BACKOFFICE" ? (
            <TButton
              title={"Add Wholesale Customer"}
              startIcon={<AddIcon />}
              variant={"contained"}
              label={"Whole Sale Customer"}
              color={"primary"}
              fun={setAddCustomerOn}
            />
          ) : (
            ""
          )}
        </Box>
        <MuiTable title="Enhanced Table" columns={columns} data={data} />
      </Stack>
      <PopupFormDialog
        open={addCustomerOn}
        setOpen={setAddCustomerOn}
        title="Add New Customer"
        fields={addCustomerFields}
        submitButton="Create"
        handleSubmit={handleCreate}
        reasonCloseOn={true}
        setValues={setNewCustomer}
      />
    </Container>
  );
}

export default CustomerList;
