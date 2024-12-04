import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
  MenuItem
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddCustomerIcon from '@mui/icons-material/PersonAdd';
import useAuth from "app/hooks/useAuth";
import AddIcon from '@mui/icons-material/AddBox'

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
    email: "",
    contactPersonNumber: "",
    landPhone: "",
    businessAddress: "",
    deliveryAddress: "",
    contactNos: [],
    address:""
  });

  const [columns, setColumns] = useState([
    { label: "ID", field: "id" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Business Address", field: "businessAddress" },
    { label: "Shipping Address", field: "shippingAddress" },
    { label: "Contact No", field: "contactNo" },
    { label: "Contact Person Number", field: "contactPersonNumber" },
    { label: "Email", field: "email" },
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
  const {role} = useAuth() 
  const handleCreate = async () => {
    const customerData = {
      address: newCustomer.deliveryAddress || "",
      nicNo: newCustomer.nicNo || "", // Assuming you collect this in another form input
      businessName: newCustomer.businessName || "",
      contactPerson: newCustomer.contactPerson || "",
      landPhone: newCustomer.landPhone || "",
      deliveryAddress: newCustomer.deliveryAddress || "",
      contactPersonNumber: newCustomer.contactPersonNumber || "",
      customerDto: {
        firstName: newCustomer.firstName || "",
        lastName: newCustomer.lastName || "",
        contactNos: [newCustomer.contactNo, newCustomer.contactPersonNumber].filter(Boolean), // Collect primary and secondary numbers
        email: newCustomer.email || "",
      },
    };
  
    console.log("Customer Data:", customerData);
  
    try {
      // Send the request to the backend
      const response = await apiNonAuth.post(
        "customer/create/wholesale-customer",
        customerData
      );
      
      setAddCustomerOn(false);
  
      // Log success
      console.log("Checkout successful:", response.data);
      
      // Additional success logic here
    } catch (error) {
      // Log any errors
      console.error("Checkout failed:", error.response?.data || error.message);
    }
  };
  

  // Fetch customer data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNonAuth.get(
          "wholesalecustomer/get-all"
        );
        
       setDataTableData(response.data);
        // setProducts(transformedProducts);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);
 

  // Function to handle adding a new customer


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
          setValue: (val) => setNewCustomer({ ...newCustomer, contactPersonNumber: val }),
        },
      ],
    },
  ];
  

  return (
    <Container>
      <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                {role==='BACKOFFICE'?<TButton 
                  title={'Add Wholesale Customer'} 
                  startIcon={<AddIcon />} 
                  variant={'contained'} 
                  label={'Whole Sale Customer'} 
                  color={'primary'} 
                  fun={setAddCustomerOn}>
                </TButton>:''}
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Customers'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'Invoice_Id'}>Search by Invoice Id</MenuItem>
                  </Select>
                  {/* <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search Credits...'} search={search}></SearchBarDefault> */}
                </Box>
                <MuiTable search={true} print={false} download={false} columns={columns} data={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
              
          </Stack>
      <PopupFormDialog
        open={addCustomerOn}
        setOpen={setAddCustomerOn}
        title="Add New Customer"
        fields={addCustomerFields}
       // onSubmit={handleAddCustomer}
       submitButton="Create"
       handleSubmit={handleCreate}
      reasonCloseOn={true}
      setValues={setNewCustomer}
      />
    </Container>
  );
}

export default CustomerList;
