import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { PopupFormDialog, SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, TButton} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import AddSupplierIcon from '@mui/icons-material/Storefront'


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function SupplierList() {

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [addSupplierOn, setAddSupplierOn] = useState(false)

    const [newSupplier, setNewSupplier] = useState({})

    const addSupplierFields = {
      require: [
        {key: 'sup_name_text', required: true, id: 'sup_name_text', name: 'supplierName', label: 'Supplier Name', type: 'text', placeholder: 'Enter supplier name', value: newSupplier.supplierName || '', setValue: (val) => setNewSupplier({...newSupplier, supplierName: val})},
        {key: 'address_text', required: true, id: 'sup_name_text', name: 'supplierAddress', label: 'Supplier Address', type: 'text', placeholder: 'Enter supplier address', value: newSupplier.supplierAddress || '', setValue: (val) => setNewSupplier({...newSupplier, supplierAddress: val}), sx: {width: '50%'}},
        {key: 'type_select', id: 'type_select', name: 'supplierType', label: 'Supplier Type', type: 'select', value: newSupplier.supplierType || '', setValue: (val) => setNewSupplier({...newSupplier, supplierType: val}), break:true, multi: false, options: [{label: 'Local', value: 'Local'}, {label: 'Foreign', value: 'Foreign'}]},
        {key: 'land_tel', id: 'land_tel', required: true, name: 'landPhone', label: 'Land Phone', type: 'tel', placeholder: 'Enter landphone number', value: newSupplier.landPhone || '', setValue: (val) => setNewSupplier({...newSupplier, landPhone: val})},
        {key: 'mobile_tel', id: 'mobile_tel', name: 'mobilePhone', label: 'Mobile Phone', type: 'tel', placeholder: 'Enter mobile number', value: newSupplier.mobilePhone || '', setValue: (val) => setNewSupplier({...newSupplier, mobilePhone: val})},
      ],
      optional: [
        {key: 'sup_name_text', required: true, id: 'sup_name_text', name: 'supplierName', label: 'Supplier Name', type: 'text', placeholder: 'Enter supplier name', value: newSupplier.supplierName || '', setValue: (val) => setNewSupplier({...newSupplier, supplierName: val})},
        {key: 'address_text', required: true, id: 'sup_name_text', name: 'supplierAddress', label: 'Supplier Name', type: 'text', placeholder: 'Enter supplier name', value: newSupplier.supplierAddress || '', setValue: (val) => setNewSupplier({...newSupplier, supplierAddress: val})},
        // {key: 'sup_name_text', id: 'sup_name_text', name: 'supplierName', label: 'Supplier Name', type: 'text', placeholder: 'Enter supplier name', value: ''},
        {key: 'mobile_tel', id: 'mobile_tel', name: 'mobilePhone', label: 'Mobile Phone', type: 'tel', placeholder: 'Enter mobile number', value: newSupplier.mobilePhone || '', setValue: (val) => setNewSupplier({...newSupplier, mobilePhone: val})},
        {key: 'land_tel', id: 'land_tel', required: true, name: 'landPhone', label: 'Land Phone', type: 'tel', placeholder: 'Enter landphone number', value: newSupplier.landPhone || '', setValue: (val) => setNewSupplier({...newSupplier, landPhone: val})},
      ]
    }

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
              <Breadcrumb routeSegments={[{ name: "Good recieved note"}, { name: "List" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <TButton
                   title={'Add new supplier'}
                   startIcon={<AddIcon />}
                   variant="contained"
                   color="primary"
                   fun={setAddSupplierOn}
                   label={'Supplier'}
                ></TButton>
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Good recieved notes'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by barcode</MenuItem>
                    <MenuItem value={'grn'}>Search by GRN code</MenuItem>
                    <MenuItem value={'name'}>Search by supplier name</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search Good recieved notes...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard>
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={'Good recieved notes'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
          </Stack>

          <PopupFormDialog
                  open={addSupplierOn}
                  title="Add Supplier"
                  submitButton="Add Supplier"
                  titleIcon={<AddSupplierIcon />}
                  fields={addSupplierFields}
                  setOpen={setAddSupplierOn}
                  reasonCloseOn={true}
                  setValues={setNewSupplier}
                />
        </Container>
    );
}

export default SupplierList;
