import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { SearchBarDefault, Breadcrumb, SimpleCard, MuiTable} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import BulkAddIcon from '@mui/icons-material/Queue'

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function ProductList() {

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [searchResult, setSearchResult] = useState([
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
      ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
    ])

    const [datatableData, setDataTableData] = useState([
      ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
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
        name:'Product Name',
        label: 'Product Name',
      },
      {
        name:'Brand',
        label: 'Brand',
      },
      {
        name:'Product Type',
        label: 'Product Type',
      },
      {
        name:'Color',
        label: 'Color',
      },
      {
        name: 'Size',
        label: 'Size (LTR)',
      },
      {
        name:'Selling Price',
        label: 'Selling Price (LKR)',
      },
      {
        name:'Stocks',
        label: 'Stocks',
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
                title: 'View item',
                type: 'icon',
                icon: ViewIcon,
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  console.log('Edit button clicked for row', index);
                },
              },
              {
                title: 'Edit item',
                type: 'icon',
                icon: EditIcon,
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  console.log('Edit icon button clicked for row', index);
                },
              },
              {
                title: 'Remove item',
                type: 'icon',
                icon: DeleteIcon,
                color: 'error',
                size: 'small',
                onClick: (index) => {
                  console.log('Delete icon button clicked for row', index);
                },
              }
            ]
        },
      },
    ]);

    const search = () => {

    }

    return (
        <Container>
          <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, { name: "List" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <Tooltip title={'Add new product'}><Button startIcon={<AddIcon />} variant="contained" color="primary">Product</Button></Tooltip>
                <Tooltip title={'Add new bulk products'}><Button startIcon={<BulkAddIcon />} variant="contained" color="primary">Bulk products</Button></Tooltip>
              </Box>
              <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Products'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by product barcode</MenuItem>
                    <MenuItem value={'name'}>Search by product name</MenuItem>
                    <MenuItem value={'color'}>Search by product color</MenuItem>
                    <MenuItem value={'size'}>Search by product size</MenuItem>
                    <MenuItem value={'finish'}>Search by product finish</MenuItem>
                    <MenuItem value={'room'}>Search by product room type</MenuItem>
                    <MenuItem value={'type'}>Search by product type</MenuItem>
                    <MenuItem value={'surface'}>Search by product surface</MenuItem>
                    <MenuItem value={'brand'}>Search by product brand</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search products...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard>
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={'Products'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
          </Stack>
        </Container>
    );
}

export default ProductList;
