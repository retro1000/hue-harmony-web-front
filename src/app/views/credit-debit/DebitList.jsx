import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, TButton, PopupFormDialog} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import AddDebitIcon from '@mui/icons-material/PersonAdd'
import useAuth from "app/hooks/useAuth";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function DebitList() {

    const navigate = useNavigate();

    const {role} = useAuth()
console.log(role)
    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [searchResult, setSearchResult] = useState([
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
      ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
    ])

    const [addDebitOn, setAddDebitOn] = useState(false);

  const [newDebit, setNewDebit] = useState({});

  const addDebitFields = [
    {
      title: 'Debit Details',
      inputs: [
        {
          key: "cus_f_name_text",
          required: true,
          id: "cus_f_name_text",
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "Enter Debit first name",
          value: newDebit.firstName || "",
          setValue: (val) =>
            setNewDebit({ ...newDebit, firstName: val }),
        },
        {
          key: "cus_l_name_text",
          required: true,
          id: "cus_l_name_text",
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Enter Debit last name",
          value: newDebit.lastName || "",
          setValue: (val) =>
            setNewDebit({ ...newDebit, lastName: val }),
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
          value: newDebit.billingAddress || "",
          setValue: (val) =>
            setNewDebit({ ...newDebit, billingAddress: val }),
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
          value: newDebit.shippingAddress || "",
          setValue: (val) =>
            setNewDebit({ ...newDebit, shippingAddress: val }),
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
          value: newDebit.primaryContactNo || "",
          setValue: (val) => setNewDebit({ ...newDebit, primaryContactNo: val }),
        },
      ]
    },
    {
      title: 'Additional Details',
      inputs: [
        {
          key: "sup_email_text",
          required: false,
          id: "sup_email_text",
          name: "DebitEmail",
          label: "Debit Email",
          type: "email",
          placeholder: "Enter Debit email",
          value: newDebit.DebitEmail || "",
          setValue: (val) =>
            setNewDebit({ ...newDebit, DebitEmail: val }),
        },
        {
          key: "secondary_contact_no",
          id: "secondary_contact_no",
          required: true, 
          name: "otherContactNo",
          label: "Other Contact Number",
          type: "tel",
          placeholder: "Enter other contact number",
          value: newDebit.otherContactNo || "",
          setValue: (val) => setNewDebit({ ...newDebit, otherContactNo: val }),
        },
      ]
    }
  ];

    const [datatableData, setDataTableData] = useState([
      ['1', 'D#45er', 'Dulux', '11000.00', '13 Jun 2024', 'User1',  'Available'],
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Inactive'],
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Pending'],
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Blocked'],
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Sold'],
      ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
      ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
      ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
      ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
      ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
      ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
      ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
      ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
      ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
      ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
      ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
      ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
    ]);

    const [columns, setColumns] = useState([
      {
        name: 'id',
        label: 'ID',
        options: {
          display: false,
        },
      },
      {
        name:'Barcode',
        label: 'Barcode',
      },
      {
        name:'Debit Name',
        label: 'Debit Name',
      },
      {
        name:'Grand Total',
        label: 'Grand Total (LKR)',
      },
      {
        name:'Created On',
        label: 'Created On',
      },
      {
        name:'Created By',
        label: 'Created By',
      },
      {
        name:'Status',
        label: 'Status',
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
            buttonsConfig: [
              {
                type: 'icon',
                icon: ViewIcon,
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  navigate(`/Debit/view/${datatableData[index][0]}`)
                },
              },
            ]
        },
      },
    ]);

    const search = () => {

    }

    return (
        <Container>
          <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Debit"}, { name: "List" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
              {role==='BACKOFFICE'?<TButton title={'Add new Debit'} startIcon={<AddIcon />} variant={'contained'} label={'Debit'} color={'primary'} fun={setAddDebitOn}></TButton>:''}
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Debits'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by name</MenuItem>
                    <MenuItem value={'name'}>Search by contact number</MenuItem>
                    <MenuItem value={'name'}>Search by address</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search Debits...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard>
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={'Debits'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
          </Stack>
          {  
            role==='BACKOFFICE'?
            <PopupFormDialog
              open={addDebitOn}
              title="Add Debit"
              submitButton="Add Debit"
              titleIcon={<AddDebitIcon />}
              fields={addDebitFields}
              setOpen={setAddDebitOn}
              reasonCloseOn={true}
              setValues={setNewDebit}
            />:''
          }
        </Container>
    );
}

export default DebitList;
