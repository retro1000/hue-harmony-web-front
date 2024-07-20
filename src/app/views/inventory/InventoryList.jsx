import { useState, useEffect } from "react";

import { Accordion, AccordionDetails, AccordionSummary, Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, MenuItem, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { TButton, SearchBarDefault, Breadcrumb, SimpleCard, MuiTable, SearchableSelectMultiple, NumSliderFilter} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import ErrorIcon from '@mui/icons-material/Error'
import FilterIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function getCurrentDateTime() {
  const now = new Date();

  // Options for the date part
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const dateString = new Intl.DateTimeFormat('en-GB', dateOptions).format(now);

  // Options for the time part
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const timeString = new Intl.DateTimeFormat('en-GB', timeOptions).format(now);
  
  return `${dateString.replace(/ /g, ' ') + ' ' + timeString.replace('am', 'AM').replace('pm', 'PM')}`;
}

function InventoryList() {

    const [selectedAction, setSelectedAction] = useState('barcode')

    const [searchText, setSearchText] = useState(undefined)

    const [currDate, setCurrDate] = useState(getCurrentDateTime())

    const [selectedBrand, setSelectedBrand] = useState()
    
    const [selectedColor, setSelectedColor] = useState()

    const [selectedType, setSelectedType] = useState()

    const [selectedSize, setSelectedSize] = useState()

    const [sellPriceMax, setSellPriceMax] = useState(20000)

    const [sellPriceMin, setSellPriceMin] = useState(1000)

    const [sellPriceRange, setSellPriceRange] = useState([sellPriceMin, sellPriceMax])

    const [qtyMax, setQtyMax] = useState(30)

    const [qtyMin, setQtyMin] = useState(12)

    const [qtyRange, setQtyRange] = useState([qtyMin, qtyMax])

    const [filterKeys, setFilterKeys] = useState({
      brand: [{label: 'Dulux', value:1}, {label:'All', value:2}],
      type: [{label: 'Wall', value:1}, {label: 'All', value:1}],
      color: [{label: 'Red', value:1}, {label: 'All', value:1}],
      size: [{label: '4Ltr', value:1}, {label: '2Ltr', value:1}, {label: 'All', value:1}]
    })

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrDate(getCurrentDateTime());
      }, 1000*60); // Update every second
  
      return () => clearInterval(intervalId);
    })

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
        name:'Product Name',
        label: 'Product Name',
      },
      {
        name:'Purchase Order Barcode',
        label: 'Purchase Order Barcode',
      },
      {
        name:'GRN',
        label: 'GRN',
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
        name:'QTY',
        label: 'QTY',
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
            buttonsConfig: [
              {
                type: 'icon',
                title: 'View item',
                icon: ViewIcon,
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  console.log('Edit button clicked for row', index);
                },
              },
              {
                type: 'icon',
                title: 'View issues',
                icon: ErrorIcon,
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
              <Breadcrumb routeSegments={[{ name: "Inventory"}, { name: "Summary" }]} />
          </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              {/* <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <Button variant="contained" color="primary">Create grn</Button>
              </Box> */}
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable print={true} download={true} title={`Inventory Summary As Of ${currDate}` } columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}/>
              </SimpleCard>
              <div style={{width: '100%'}}>
                <Accordion sx={{width: '100%', borderRadius: '8px', marginBottom: '1em'}}>
                  <AccordionSummary sx={{borderRadius: '8px'}} expandIcon={<ExpandMoreIcon />} id="panel-header" aria-controls="panel-content">
                    <Typography variant="h6" fontSize='1.3em'>Filter inventory</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{borderRadius: '8px'}}>
                    <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                      <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                        <MenuItem value={'barcode'}>Search by barcode</MenuItem>
                        <MenuItem value={'grn'}>Search by GRN code</MenuItem>
                        <MenuItem value={'name'}>Search by supplier name</MenuItem>
                        <MenuItem value={'all'}>Search by all</MenuItem>
                      </Select>
                      <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search inventory...'} search={search}></SearchBarDefault>
                    </Box>
                    <Box display={'flex'} flexWrap={'wrap'} sx={{marginTop: '1em'}}>
                      <Box width={'100%'} display={'flex'} flexWrap={'wrap'} flexDirection={'column'}>
                        <NumSliderFilter
                          heading={'Selling Price'}
                          label={'Price'}
                          curr={'LKR'}
                          range={sellPriceRange}
                          min={sellPriceMin}
                          max={sellPriceMax}
                          setRange={setSellPriceRange}
                        />
                        <NumSliderFilter
                          heading={'Stock Available'}
                          label={'Quantity'}
                          curr={''}
                          range={qtyRange}
                          min={qtyMin}
                          max={qtyMax}
                          setRange={setQtyRange}
                        />
                      </Box>
                      <Box width={'100%'} display={'flex'} flexWrap={'wrap'} gap={'3em'}>
                        <SearchableSelectMultiple label={"Brand"} multiple={false} options={filterKeys.brand} setSelectedValues={setSelectedBrand} selectedValues={selectedBrand} sx={{width: '20%', maxWidth: '200px', minWidth: '150px'}} />
                        <SearchableSelectMultiple label={"Color"} multiple={false} options={filterKeys.color} setSelectedValues={setSelectedColor} selectedValues={selectedColor} sx={{width: '20%', maxWidth: '200px', minWidth: '150px'}} />
                        <SearchableSelectMultiple label={"Size"} multiple={false} options={filterKeys.size} setSelectedValues={setSelectedSize} selectedValues={selectedSize} sx={{width: '20%', maxWidth: '200px', minWidth: '150px'}} />
                        <SearchableSelectMultiple label={"Product type"} multiple={false} options={filterKeys.type} setSelectedValues={setSelectedType} selectedValues={selectedType} sx={{width: '20%', maxWidth: '200px', minWidth: '150px'}} />
                      </Box>
                    </Box>
                    <Box sx={{marginTop: '1em'}}>
                      <TButton
                        title={'Filter inventory'}
                        color="primary"
                        variant="contained"
                        startIcon={<FilterIcon />}
                        label={'Filter'}
                      />
                    </Box>
                    {searchResult && searchResult.length > 0 && (
                      <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'} />
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
          </Stack>
        </Container>
    );
}

export default InventoryList;
