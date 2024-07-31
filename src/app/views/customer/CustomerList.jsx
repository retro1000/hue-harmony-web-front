import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Box,
  styled,
  Tabs,
  Tab,
  Typography,
  Select,
  Button,
  Grid,
  IconButton,
  Icon,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  SearchBarDefault,
  Breadcrumb,
  SimpleCard,
  MuiTable,
  TButton,
  PopupFormDialog,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import AddCustomerIcon from '@mui/icons-material/PersonAdd'
import useAuth from "app/hooks/useAuth";


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

    const {role} = useAuth()

    const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [searchResult, setSearchResult] = useState([
    [
      "6",
      "Meral Elias",
      "Example St, Hartford",
      "Example St, Hartford",
      "0712233445",
      "0701223344",
      "meral.elias@example.com",
      "70000.00",
      "Active",
    ],
    [
      "7",
      "Esperanza Susanne",
      "Example Ave, Hartford",
      "Example Ave, Hartford",
      "0713344556",
      "0702334455",
      "esperanza.susanne@example.com",
      "95000.00",
      "Inactive",
    ],
    [
      "8",
      "Christian Birgitte",
      "Example Blvd, Tampa",
      "Example Blvd, Tampa",
      "0714455667",
      "0703445566",
      "christian.birgitte@example.com",
      "110000.00",
      "Active",
    ],
  ]);

  const [addCustomerOn, setAddCustomerOn] = useState(false);

  const [newCustomer, setNewCustomer] = useState({});

  const addCustomerFields = [
    {
      title: "Customer Details",
      inputs: [
        {
          key: "cus_f_name_text",
          required: true,
          id: "cus_f_name_text",
          name: "firstName",
          label: "First Name",
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
          label: "Last Name",
          type: "text",
          placeholder: "Enter customer last name",
          value: newCustomer.lastName || "",
          setValue: (val) => setNewCustomer({ ...newCustomer, lastName: val }),
        },
        {
          key: "b_address_text",
          required: true,
          break: false,
          id: "b_address_text",
          name: "billingAddress",
          label: "Billing Address",
          type: "text",
          placeholder: "Enter billing address",
          value: newCustomer.billingAddress || "",
          setValue: (val) =>
            setNewCustomer({ ...newCustomer, billingAddress: val }),
          sx: { width: "50%" },
        },
        {
          key: "s_address_text",
          required: true,
          id: "s_address_text",
          name: "shippingAddress",
          label: "Shipping Address",
          type: "text",
          break: true,
          placeholder: "Enter shipping address",
          value: newCustomer.shippingAddress || "",
          setValue: (val) =>
            setNewCustomer({ ...newCustomer, shippingAddress: val }),
          sx: { width: "50%" },
        },
        {
          key: "contact_no",
          id: "contact_no",
          required: true,
          name: "primaryContactNo",
          label: "Primary Contact Number",
          type: "tel",
          placeholder: "Enter primary contact number",
          value: newCustomer.primaryContactNo || "",
          setValue: (val) =>
            setNewCustomer({ ...newCustomer, primaryContactNo: val }),
        },
      ],
    },
    {
      title: "Additional Details",
      inputs: [
        {
          key: "sup_email_text",
          required: false,
          id: "sup_email_text",
          name: "customerEmail",
          label: "Customer Email",
          type: "email",
          placeholder: "Enter customer email",
          value: newCustomer.customerEmail || "",
          setValue: (val) =>
            setNewCustomer({ ...newCustomer, customerEmail: val }),
        },
        {
          key: "secondary_contact_no",
          id: "secondary_contact_no",
          required: true,
          name: "otherContactNo",
          label: "Other Contact Number",
          type: "tel",
          placeholder: "Enter other contact number",
          value: newCustomer.otherContactNo || "",
          setValue: (val) =>
            setNewCustomer({ ...newCustomer, otherContactNo: val }),
        },
      ],
    },
  ];

  const [datatableData, setDataTableData] = useState([
    [
      "1",
      "John Doe",
      "123 Main St, Springfield",
      "456 Elm St, Springfield",
      "0777123456",
      "0711123456",
      "john.doe@example.com",
      "150000.00",
      "Active",
    ],
    [
      "2",
      "Jane Smith",
      "789 Oak St, Springfield",
      "101 Pine St, Springfield",
      "0777654321",
      "0711654321",
      "jane.smith@example.com",
      "120000.00",
      "Inactive",
    ],
    [
      "3",
      "Bob Johnson",
      "456 Cedar St, Springfield",
      "789 Maple St, Springfield",
      "0777234567",
      "0711234567",
      "bob.johnson@example.com",
      "90000.00",
      "Active",
    ],
    [
      "4",
      "Alice Brown",
      "101 Birch St, Springfield",
      "123 Oak St, Springfield",
      "0777345678",
      "0711345678",
      "alice.brown@example.com",
      "80000.00",
      "Pending",
    ],
    [
      "5",
      "Tom White",
      "202 Willow St, Springfield",
      "234 Ash St, Springfield",
      "0777456789",
      "0711456789",
      "tom.white@example.com",
      "50000.00",
      "Blocked",
    ],
    [
      "6",
      "Meral Elias",
      "Example St, Hartford",
      "Example St, Hartford",
      "0712233445",
      "0701223344",
      "meral.elias@example.com",
      "70000.00",
      "Active",
    ],
    [
      "7",
      "Esperanza Susanne",
      "Example Ave, Hartford",
      "Example Ave, Hartford",
      "0713344556",
      "0702334455",
      "esperanza.susanne@example.com",
      "95000.00",
      "Inactive",
    ],
    [
      "8",
      "Christian Birgitte",
      "Example Blvd, Tampa",
      "Example Blvd, Tampa",
      "0714455667",
      "0703445566",
      "christian.birgitte@example.com",
      "110000.00",
      "Active",
    ],
    [
      "9",
      "Deep Pau",
      "Example Rd, Yonkers",
      "Example Rd, Yonkers",
      "0715566778",
      "0704556677",
      "deep.pau@example.com",
      "135000.00",
      "Pending",
    ],
    [
      "10",
      "Anna Siranush",
      "Example Ln, Yonkers",
      "Example Ln, Yonkers",
      "0716677889",
      "0705667788",
      "anna.siranush@example.com",
      "115000.00",
      "Blocked",
    ],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "Customer Name",
      label: "Customer Name",
    },
    {
      name: "Billing Address",
      label: "Billing Address",
    },
    {
      name: "Shipping Address",
      label: "Shipping Address",
    },
    {
      name: "Primary Contact No.",
      label: "Primary Contact No.",
    },
    {
      name: "Other Contact No.",
      label: "Other Contact No.",
    },
    {
      name: "Email",
      label: "Email",
    },
    {
      name: "Total Purchases (LKR)",
      label: "Total Purchases (LKR)",
    },
    {
      name: "Status",
      label: "Status",
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        buttonsConfig: [
          {
            type: "icon",
            icon: ViewIcon,
            color: "primary",
            size: "small",
            onClick: (index) => {
              navigate(`/customer/view/${datatableData[index][0]}`);
            },
          },
        ],
      },
    },
  ]);

  const search = () => {};

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Customer" }, { name: "List" }]} />
      </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                {role==='BACKOFFICE'?<TButton title={'Add new customer'} startIcon={<AddIcon />} variant={'contained'} label={'Customer'} color={'primary'} fun={setAddCustomerOn}></TButton>:""}
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search customers'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by name</MenuItem>
                    <MenuItem value={'name'}>Search by contact number</MenuItem>
                    <MenuItem value={'name'}>Search by address</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search customers...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard>
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={'Customers'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
          </Stack>
          {role==='BACKOFFICE'?
            <PopupFormDialog
              open={addCustomerOn}
              title="Add Customer"
              submitButton="Add Customer"
              titleIcon={<AddCustomerIcon />}
              fields={addCustomerFields}
              setOpen={setAddCustomerOn}
              reasonCloseOn={true}
              setValues={setNewCustomer}
            />:''
          }
        </Container>
    );
}

export default CustomerList;
