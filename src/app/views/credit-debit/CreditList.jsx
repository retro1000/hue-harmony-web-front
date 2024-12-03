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
import AddCreditIcon from '@mui/icons-material/PersonAdd'
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

function CreditList() {

    const navigate = useNavigate();

    const {role} = useAuth() 

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [searchResult, setSearchResult] = useState([
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
      ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
    ])

    const [addCreditOn, setAddCreditOn] = useState(false);

  const [newCredit, setNewCredit] = useState({});

  const handleFormSubmit = () => {
    console.log("Submitted Credit Data:", newCredit);
    // Add your form submission logic here
    setAddCreditOn(false); // Close the popup after submission
  };

  const addCreditFields = [
    {
      title: "Credit Details",
      inputs: [
        {
          key: "invoice_select",
          required: true,
          id: "invoice_select",
          name: "invoice",
          label: "Select Invoice",
          type: "select",
          options: [
            { label: "Invoice #1234", value: "1234" },
            { label: "Invoice #5678", value: "5678" },
            // Add more invoice options here
          ],
          placeholder: "Select an invoice",
          value: newCredit.invoice,
          setValue: (val) => setNewCredit({ ...newCredit, invoice: val }),
        },
        {
          key: "amount_field",
          required: true,
          id: "amount_field",
          name: "amount",
          label: "Amount",
          type: "number",
          placeholder: "Enter amount",
          value: newCredit.amount,
          setValue: (val) => setNewCredit({ ...newCredit, amount: val }),
        },
        {
          key: "reason_field",
          required: true,
          id: "reason_field",
          name: "reason",
          label: "Reason",
          type: "text",
          placeholder: "Enter reason",
          value: newCredit.reason,
          setValue: (val) => setNewCredit({ ...newCredit, reason: val }),
        },
        {
          key: "date_field",
          required: true,
          id: "date_field",
          name: "date",
          label: "Date",
          type: "date",
          placeholder: "Select a date",
          value: newCredit.date,
          setValue: (val) => setNewCredit({ ...newCredit, date: val }),
        },
      ],
    },
  ];

    const [datatableData, setDataTableData] = useState([]);

    const [columns, setColumns] = useState([
      {
        name: 'id',
        label: 'ID',
        options: {
          display: false,
        },
      },
      
      {
        name:'Invoice_Id',
        label: 'Invoice Id',
      },
      {
        name:'Amount',
        label: 'Amount (LKR)',
      },
      {
        name:'Created_On',
        label: 'Created On',
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
                  navigate(`/credit/view/${datatableData[index][0]}`)
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
              <Breadcrumb routeSegments={[{ name: "Credit"}, { name: "List" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                {role==='BACKOFFICE'?<TButton 
                  title={'Add new Credit'} 
                  startIcon={<AddIcon />} 
                  variant={'contained'} 
                  label={'Credit'} 
                  color={'primary'} 
                  fun={setAddCreditOn}>
                </TButton>:''}
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Credits'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'Invoice_Id'}>Search by Invoice Id</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search Credits...'} search={search}></SearchBarDefault>
                </Box>
                <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
              
          </Stack>
          {  
            role==='BACKOFFICE'?
            <PopupFormDialog
              open={addCreditOn}
              title="Credit Note"
              submitButton="Create"
              titleIcon={<AddCreditIcon />}
              fields={addCreditFields}
              setOpen={setAddCreditOn}
              reasonCloseOn={true}
              setValues={setNewCredit}
              url=""
              data={newCredit}
            />:''
          }
        </Container>
    );
}

export default CreditList;
