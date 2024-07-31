import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, TButton} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function SalesInvoiceList() {

    const navigate = useNavigate();

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [searchResult, setSearchResult] = useState([
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
      ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
    ])

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
                  navigate(`/customer/view/${datatableData[index][0]}`)
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
              <Breadcrumb routeSegments={[{ name: "Invoice"}, { name: "List" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <TButton title={'Add new invoice'} startIcon={<AddIcon />} variant={'contained'} label={'Invoice'} color={'primary'} fun={()=>navigate('/invoice/create-invoice')}></TButton>
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Invoices'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by name</MenuItem>
                    <MenuItem value={'name'}>Search by contact number</MenuItem>
                    <MenuItem value={'name'}>Search by address</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search Invoices...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard>
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={'Invoices'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
          </Stack>
        </Container>
    );
}

export default SalesInvoiceList;
