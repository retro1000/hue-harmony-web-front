import { useState } from "react";

import {
  Stack,
  Box,
  styled
} from "@mui/material";

import { Breadcrumb, SimpleCard, MuiTable, CheckBoxGroup, NumSliderFilter} from "app/components";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'

import { useFormatter } from "app/hooks/useFormatter";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const numSliderlabelSx = {
  marginLeft: '-8px'
}

function StoreProductList() {

    const { formatToLKR, DefaultWordFormat } = useFormatter()

    // const addProductFields = [
    //   {
    //     title: 'Product Details',
    //     inputs:[
    //       {key: 'product_name_text', required: true, id: 'product_name_text', name: 'productName', label: 'Product Name', type: 'text', placeholder: 'Enter product name', value: newProduct.supplierName || '', setValue: (val) => setNewProduct({...newProduct, productName: val})},
    //       {key: 'price_num', required: true, id: 'price_num', name: 'price', label: 'Price', type: 'number', placeholder: 'Set a price', value: newProduct.price || '', setValue: (val) => setNewProduct({...newProduct, price: val})},
    //       {key: 'discount_num', required: false, id: 'discount_num', name: 'discount', label: 'Discount', type: 'number', placeholder: 'Set a discount', value: newProduct.discount || '', setValue: (val) => setNewProduct({...newProduct, discount: val}), min: 0, max: 100},
    //       {key: 'supplier_select', id: 'supplier_select', name: 'supplier', label: 'Suuplier', required: true, type: 'select', value: newProduct.supplier || 1, setValue: (val) => setNewProduct({...newProduct, supplier: val}), break:true,  options: [{label: 'Supp1', value: 1}, {label: 'supp2', value: 2}, {label: 'supp3', value: 3}]},
    //     ],
    //   },
    //   {
    //     title: 'Product Specifications',
    //     inputs: [
    //       {key: 'color_select', id: 'color_select', name: 'color', label: 'Color', required: false, type: 'select', value: newProduct.color || 'White', setValue: (val) => setNewProduct({...newProduct, color: val}), break:false,  options: [{label: 'White', value: 'White'}, {label: 'Red', value: 'Red'}, {label: 'Black', value: 'Black'}]},
    //       {key: 'size_select', id: 'size_select', name: 'size', label: 'Size', required: true, type: 'select', value: newProduct.size || '4L', setValue: (val) => setNewProduct({...newProduct, size: val}), break:false,  options: [{label: '1L', value: '1L'}, {label: '4L', value: '4L'}, {label: '5L', value: '5L'}]},
    //       {key: 'brand_select', id: 'brand_select', name: 'brand', label: 'Brand', required: true, type: 'select', value: newProduct.brand || 'Dulux', setValue: (val) => setNewProduct({...newProduct, brand: val}), break:false,  options: [{label: 'Dulux', value: 'Dulux'}, {label: 'Nippon Paints', value: 'Nippon Paints'}, {label: 'Causway', value: 'Causway'}]},
    //       {key: 'type_select', id: 'type_select', name: 'productType', label: 'Product Type', required: true, type: 'select', value: newProduct.productType || 'Paint', setValue: (val) => setNewProduct({...newProduct, productType: val}), break:false,  options: [{label: 'Cleaner', value: 'Cleaner'}, {label: 'Paint', value: 'Paint'}, {label: 'Undercoat', value: 'Undercoat'}, {label: 'Varnish', value: 'Varnish'}, {label: 'Waterproofing', value: 'Waterproofing'}]},
    //       {key: 'room_select', id: 'room_select', name: 'roomType', label: 'Room Type', required: true, type: 'select', value: newProduct.roomType || 'Living Room', setValue: (val) => setNewProduct({...newProduct, roomType: val}), break:false,  options: [{label: 'Living Room', value: 'Living Room'}, {label: 'Kitchen', value: 'Kitchen'}, {label: 'Bathroom', value: 'Bathroom'}, {label: 'Bedroom', value: 'Bedroom'}, {label: "Children's Room", value: "Children's Room"}, {label: "Dining Room", value: "Dining Room"}, {label: "Hallway", value: "Hallway"}, {label: "Home Office", value: "Home Office"}]},
    //       {key: 'finish_select', id: 'finish_select', name: 'finish', label: 'Finish', required: true, type: 'select', value: newProduct.finish || 'Gloss', setValue: (val) => setNewProduct({...newProduct, finish: val}), break:false,  options: [{label: 'Gloss', value: 'Gloss'}, {label: 'Gloss, Semi Gloss Matt', value: 'Gloss, Semi Gloss Matt'}, {label: 'High Gloss', value: 'High Gloss'}, {label: 'Low Sheen', value: 'Low Sheen'}, {label: 'Matt', value: 'Matt'}, {label: "Mid Sheen", value: "Mid Sheen"}, {label: "NA", value: "NA"}, {label: "Semi Gloss", value: "Semi Gloss"}]},
    //       {key: 'position_multi_select', id: 'position_multi_select', name: 'position', label: 'Position', required: true, multi: true, type: 'multi_select', value: newProduct.position || [], setValue: (val) => setNewProduct({...newProduct, position: Array.isArray(val)?val:[val]}), break:false,  options: [{label: 'Exterior', value: 'Exterior'}, {label: 'Interior', value: 'Interior'}, {label: 'Interior and Exterior', value: 'Interior and Exterior'}]},
    //       {key: 'surface_multi_select', id: 'surface_multi_select', name: 'surface', label: 'Surface', required: true, multi: true, type: 'multi_select', value: newProduct.surface || [], setValue: (val) => setNewProduct({...newProduct, surface: Array.isArray(val)?val:[val]}), break:false,  options: [{label: 'Bluestone', value: 'Bluestone'}, {label: 'Doors', value: 'Doors'}, {label: 'Furniture', value: 'Furniture'}, {label: 'Metal', value: 'Metal'}, {label: 'Walls', value: 'Walls'}, {label: 'Windows', value: 'Windows'}, {label: 'Wood', value: 'Wood'}]},        ]
    //   }, 
    //   {
    //     title: 'Additional Details',
    //     inputs: [
    //       {key: 'image_file', id: 'image_file', name: 'image', label: 'Product Image', close: true, type: 'file', value: newProduct.image || '', setValue: (val) => setNewProduct({...newProduct, image: val}), break:false, multi: false, options: [{label: 'Local', value: 'Local'}, {label: 'Foreign', value: 'Foreign'}]},
    //     ]
    //   }
    // ]

    
    const [columns, setColumns] = useState([
      {
        name:'Barcode',
        label: 'Barcode',
        options:{
          filter: false
        }
      },
      {
        name:'Product Name',
        label: 'Product Name',
        options:{
          filter: false
        }
      },
      {
        name:'Brand',
        label: 'Brand',
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (value, filters) => {
              // Custom logic to determine if a row is displayed
              return filters.length > 0 && !filters.includes(value);
            },
            display: (filterList, onChange, index, column) => (
              <div style={{ padding: '16px' }}>
                <CheckBoxGroup
                  label={'Brand'}
                  options={["Active", "Inactive", "Pending", "Canceled", "Active", "Inactive", "Pending", "Canceled", "Active", "Inactive", "Pending", "Canceled"]}
                  selectedOptions={filterList[index] || []}
                  onChange={(selected) => {
                    filterList[index] = selected;
                    onChange(filterList[index], index, column);
                  }}
                />
              </div>
            ),
          },
          customFilterListRender: (value) => {
            // Render custom filter values in the filter chip
            if (value.length) {
              return `Brand: ${value.map(val => DefaultWordFormat(val)).join(", ")}`;
            }
            return false;
          },
        },
      },
      {
        name:'Product Type',
        label: 'Product Type',
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (value, filters) => {
              // Custom logic to determine if a row is displayed
              return filters.length > 0 && !filters.includes(value);
            },
            display: (filterList, onChange, index, column) => (
              <div style={{ padding: '16px' }}>
                <CheckBoxGroup
                  label={'Product Type'}
                  options={["Active", "Inactive", "Pending", "Canceled"]}
                  selectedOptions={filterList[index] || []}
                  onChange={(selected) => {
                    filterList[index] = selected;
                    onChange(filterList[index], index, column);
                  }}
                />
              </div>
            ),
          },
          customFilterListRender: (value) => {
            // Render custom filter values in the filter chip
            if (value.length) {
              return `Product Type: ${value.map(val => DefaultWordFormat(val)).join(", ")}`;
            }
            return false;
          },
        },
      },
      {
        name:'Color',
        label: 'Color',
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (value, filters) => {
              // Custom logic to determine if a row is displayed
              return filters.length > 0 && !filters.includes(value);
            },
            display: (filterList, onChange, index, column) => (
              <div style={{ padding: '16px' }}>
                <CheckBoxGroup
                  label={'Color'}
                  options={["Active", "Inactive", "Pending", "Canceled"]}
                  selectedOptions={filterList[index] || []}
                  onChange={(selected) => {
                    filterList[index] = selected;
                    onChange(filterList[index], index, column);
                  }}
                />
              </div>
            ),
          },
          customFilterListRender: (value) => {
            // Render custom filter values in the filter chip
            if (value.length) {
              return `Color: ${value.map(val => DefaultWordFormat(val)).join(", ")}`;
            }
            return false;
          },
        },
      },
      {
        name: 'Size',
        label: 'Size (LTR)',
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (value, filters) => {
              // Custom logic to determine if a row is displayed
              return filters.length > 0 && !filters.includes(value);
            },
            display: (filterList, onChange, index, column) => (
              <div style={{ padding: '16px', width: '100%' }}>
                <CheckBoxGroup
                  label={'Size'}
                  options={["Active", "Inactive", "Pending", "Canceled"]}
                  selectedOptions={filterList[index] || []}
                  onChange={(selected) => {
                    filterList[index] = selected;
                    onChange(filterList[index], index, column);
                  }}
                />
              </div>
            ),
          },
          customFilterListRender: (value) => {
            // Render custom filter values in the filter chip
            if (value.length) {
              return `Size: ${value.map(val => DefaultWordFormat(val)).join(", ")}`;
            }
            return false;
          },
        },
      },
      {
        name:'Selling Price',
        label: 'Selling Price (LKR)',
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (price, filters) => {
              // Assume filters is [min, max]
              const [min, max] = filters;
              if (min && price < min) return true;
              if (max && price > max) return true;
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div style={{ padding: '16px', marginLeft: '-10px' }}>
                <NumSliderFilter
                  labelSx={numSliderlabelSx}
                  range={filterList[index] || [0, 1000]}
                  setRange={(value) => {
                    filterList[index] = value;
                    onChange(filterList[index], index, column);
                  }}
                  min={0}
                  max={1000}
                  curr={'LKR'}
                  heading={'Selling Price'}
                />
              </div>
            ),
          },
          customFilterListRender: (value) => {
            if (value.length === 2) {
              return `Selling Price: ${formatToLKR(value[0])} - ${formatToLKR(value[1])}`;
            }
            return false;
          },
        },
      },
      {
        name:'Stocks',
        label: 'Stocks',
        options:{
          filter: false
        }
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

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Product", path: "/Product/list" },
            { name: "List" },
          ]}
        />
      </Box>

      <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>

              <SimpleCard sx={{width: '100%'}}>
                <MuiTable 
                  path={'product'} 
                  rowsPerPage={true} 
                  serverSide={true} 
                  print={true} 
                  download={true} 
                  title={'Products'} 
                  columns={columns} 
                  selectableRows={'none'} 
                />
              </SimpleCard>
          </Stack>
        </Container>
    );
}

export default StoreProductList;
