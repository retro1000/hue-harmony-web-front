import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, TButton, PopupFormDialog} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import AddPaymentIcon from '@mui/icons-material/AddBox'

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function PaymentList() {

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [addPaymentOn, setAddPaymentOn] = useState(false)

    const [newPayment, setNewPayment] = useState({})

    const addPaymentFields = [
      {
        title: 'Payment Details',
        inputs: [
          { key: 'payment_date', required: true, id: 'payment_date', name: 'paymentDate', label: 'Payment Date', type: 'date', value: newPayment.paymentDate || null, setValue: (val) => setNewPayment({ ...newPayment, paymentDate: val }) },
          { key: 'amount', required: true, id: 'amount', name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter payment amount', value: newPayment.amount || '', setValue: (val) => setNewPayment({ ...newPayment, amount: val }) },
          { key: 'method', required: true, id: 'method', name: 'method', label: 'Payment Method', type: 'select', value: newPayment.method || 'Credit Card', setValue: (val) => setNewPayment({ ...newPayment, method: val }), options: [{ label: 'Credit Card', value: 'Credit Card' }, { label: 'Bank Transfer', value: 'Bank Transfer' }, { label: 'Cash', value: 'Cash' }] },
        ]
      },
      {
        title: 'Recipient Details',
        inputs: [
          { key: 'recipient_name', required: true, id: 'recipient_name', name: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: 'Enter recipient name', value: newPayment.recipientName || '', setValue: (val) => setNewPayment({ ...newPayment, recipientName: val }) },
          { key: 'recipient_account', required: true, id: 'recipient_account', name: 'recipientAccount', label: 'Recipient Account', type: 'text', placeholder: 'Enter recipient account number', value: newPayment.recipientAccount || '', setValue: (val) => setNewPayment({ ...newPayment, recipientAccount: val }) },
        ]
      },
      {
        title: 'Additional Details',
        inputs: [
          { key: 'payment_notes', required: false, id: 'payment_notes', name: 'paymentNotes', label: 'Payment Notes', type: 'text', rows: 6, placeholder: 'Enter any additional notes', value: newPayment.paymentNotes || '', setValue: (val) => setNewPayment({ ...newPayment, paymentNotes: val }), sx: { width: '100%', maxWidth: '600px' } },
        ]
      }
    ];
    

    const [searchResult, setSearchResult] = useState([
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
      ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
    ])

    const [datatableData, setDataTableData] = useState([
      ['D#45er', 'Dulux', '11000.00', '13 Jun 2024', 'User1',  'Available'],
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
        name:'Barcode',
        label: 'Barcode',
      },
      {
        name:'Supplier Name',
        label: 'Supplier Name',
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
                  console.log('Edit button clicked for row', index);
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
              <Breadcrumb routeSegments={[{ name: "Payment"}, { name: "Summary" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <TButton 
                    startIcon={<AddIcon />} 
                    variant="contained" 
                    color="primary" 
                    label='Payment' 
                    title="Create new payment"
                    fun={setAddPaymentOn}
                  ></TButton>              
                </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search payments'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by barcode</MenuItem>
                    <MenuItem value={'grn'}>Search by GRN code</MenuItem>
                    <MenuItem value={'name'}>Search by supplier name</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search payments...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard>
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={'Payments'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
          </Stack>

          <PopupFormDialog
                  open={addPaymentOn}
                  title="Create Payment"
                  submitButton="Create Payment"
                  titleIcon={<AddPaymentIcon />}
                  fields={addPaymentFields}
                  setOpen={setAddPaymentOn}
                  reasonCloseOn={true}
                  setValues={setNewPayment}
                />
        </Container>
    );
}

export default PaymentList;
