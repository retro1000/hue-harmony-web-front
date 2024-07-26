import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { PopupFormDialog, TButton, SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, NumberFormatField} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import AddGrnIcon from '@mui/icons-material/NoteAdd'


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function GrnList() {

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [addGrnOn, setAddGrnOn] = useState(false)

    const [newGrn, setNewGrn] = useState({})

    const popupListColumns = [
      { 
        name: "Barcode",
        options: {
          customHeadRender: (columnMeta) => (
            <th style={{ width: '13%', borderBottom: '0.1em solid silver' }}>
              {columnMeta.name}
            </th>
          ),
          // customBodyRender: (value, tableMeta) => (
          //   <th style={{ width: '13%'}}>
          //     {value}
          //   </th>
          // )
        }
      },
      { 
        name: "Name",
        options: {
          customHeadRender: (columnMeta) => (
            <th style={{ width: '15%', borderBottom: '0.1em solid silver' }}>
              {columnMeta.name}
            </th>
          )
        }
      },
      { 
        name: "Ordered Quantity",
        options: {
          customHeadRender: (columnMeta) => (
            <th style={{ width: '5%', borderBottom: '0.1em solid silver'  }}>
              {columnMeta.name}
            </th>
          )
        }
      },
      {
        name: "Received Quantity",
        options: {
          customHeadRender: (columnMeta) => (
            <th style={{ width: '12%', borderBottom: '0.1em solid silver'  }}>
              {columnMeta.name}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => (
            <NumberFormatField
              inputProps={{
                // id:`${field.id}-input-${f_index++}`,
                type:"number",
                inputProps:{ 'aria-label': `-input-`, step:'any', inputMode: 'decimal' }
              }}
              size={'small'}
              allowNegative={false}
              value={value}
              onChange={(e) => updateValue(e.target.value)}
            />
          ),
        },
      },
      {
        name: "Remark",
        options: {
          customHeadRender: (columnMeta) => (
            <th style={{ width: '30%', borderBottom: '0.1em solid silver'  }}>
              {columnMeta.name}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => (
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              value={value}
              onChange={(e) => updateValue(e.target.value)}
            />
          ),
        },
      },
      {
        name: "Item Status",
        options: {
          customHeadRender: (columnMeta) => (
            <th style={{ width: '15%', borderBottom: '0.1em solid silver' }}>
              {columnMeta.name}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => (
            <Select value={value} size="small" fullWidth>
              <MenuItem value="Received">Received</MenuItem>
              <MenuItem value="Received">Damaged</MenuItem>
              <MenuItem value="Received">Expired</MenuItem>
              <MenuItem value="Received">Lost</MenuItem>
            </Select>
          ),
        },
      }
    ];

    const popupListData = [
      ['56', 'blue', 14],
      ['6', 'red', 4],

    ]

    const addGrnFields = [
      {
        title: 'GRN Details',
        inputs: [
          {key: 'received_date', required: true, id: 'received_date', name: 'receivedDate', label: 'Received Date', type: 'date', value: newGrn.receivedDate || null, setValue: (val) => setNewGrn({...newGrn, receivedDate: val})},
          {key: 'supplier_select', id: 'supplier_select', name: 'supplier', label: 'Supplier', required: true, type: 'select', value: newGrn.supplier || 1, setValue: (val) => setNewGrn({...newGrn, supplier: val}), break:false,  options: [{label: 'Supp1', value: 1}, {label: 'supp2', value: 2}, {label: 'supp3', value: 3}]},
          {key: 'order_text', required: true, id: 'order_text', name: 'purchaseOrder', label: 'Purchase Order', type: 'text', placeholder: 'Enter the purchase order number', value: newGrn.purchaseOrder || '', setValue: (val) => setNewGrn({...newGrn, purchaseOrder: val})},
          {key: 'delivery_text', required: true, id: 'delivery_text', name: 'deliveryNote', label: 'Delivery Note', type: 'text', placeholder: 'Enter the delivery note number', value: newGrn.deliveryNote || '', setValue: (val) => setNewGrn({...newGrn, deliveryNote: val})},
        ]
      },
      {
        title: 'Goods Details',
        inputs: [
          {key: 'goods_list', id: 'goods_list', name: 'goods', label: 'Receive Goods', required: true, type: 'list', value: newGrn.goods || popupListData, setValue: (val) => setNewGrn({...newGrn, storeLocation: val}), break:false, col: popupListColumns},
        ]
      },
      {
        title: 'Inspection Details',
        inputs: [
          {key: 'inspected_by_select', id: 'inspected_by_select', name: 'inspectedBy', label: 'Inspected By', required: true, type: 'select', value: newGrn.inspectedBy || 1, setValue: (val) => setNewGrn({...newGrn, inspectedBy: val}), break:false,  options: [{label: 'user1', value: 1}, {label: 'user2', value: 2}]},
          {key: 'inspection_date', required: true, id: 'inspection_date', name: 'inspectionDate', label: 'Inspection Date', type: 'date', value: newGrn.inspectionDate || null, setValue: (val) => setNewGrn({...newGrn, inspectionDate: val})},
          {key: 'inspection_status_select', id: 'inspection_status_select', name: 'inspectionStatus', label: 'Inspection Status', required: true, type: 'select', value: newGrn.inspectionStatus || 'Approved', setValue: (val) => setNewGrn({...newGrn, inspectionStatus: val}), break:false,  options: [{label: 'Approved', value: 'Approved'}, {label: 'Rejected', value: 'Rejected'}]},
          {key: 'inspection_text', required: false, id: 'inspection_text', name: 'inspectionRemark', label: 'Inspection Remark', type: 'text', rows: 6, placeholder: 'Enter inspection remark', value: newGrn.inspectionRemark || '', setValue: (val) => setNewGrn({...newGrn, inspectionRemark: val}), sx: {width: '100%', maxWidth: '600px'}},
        ]
      },
      {
        title: 'Additional Details',
        inputs: [
          {key: 'image_file', id: 'image_file', name: 'image', label: 'Product Image', close: true, break: true, type: 'file', value: newGrn.image || '', setValue: (val) => setNewGrn({...newGrn, image: val}), multi: false, options: [{label: 'Local', value: 'Local'}, {label: 'Foreign', value: 'Foreign'}]},
          {key: 'location_select', id: 'location_select', name: 'storeLocation', label: 'Store Location', break: true, required: false, type: 'select', value: newGrn.storeLocation || 1, setValue: (val) => setNewGrn({...newGrn, storeLocation: val}), options: [{label: 'ware1', value: 1}, {label: 'ware2', value: 2}]},
          {key: 'comment_text', required: false, id: 'comment_text', name: 'comments', label: 'Comments', type: 'text', rows: 6, placeholder: 'Enter comments', value: newGrn.comments || '', setValue: (val) => setNewGrn({...newGrn, comments: val}), sx: {width: '100%', maxWidth: '600px'}},
        ]
      }
    ]

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
                  startIcon={<AddIcon />} 
                  variant="contained" 
                  color="primary" 
                  label='GRN' 
                  title="Create new GRN"
                  fun={setAddGrnOn}
                ></TButton>
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Good recieved notes'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by grn barcode</MenuItem>
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
                  open={addGrnOn}
                  title="Create GRN"
                  submitButton="Create GRN"
                  titleIcon={<AddGrnIcon />}
                  fields={addGrnFields}
                  setOpen={setAddGrnOn}
                  reasonCloseOn={true}
                  setValues={setNewGrn}
                  // popupSx="lg"
                />
        </Container>
    );
}

export default GrnList;
