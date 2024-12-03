import { useState } from "react";
import { useAxios } from "app/hooks/useAxios";

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
  Tooltip,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  PopupFormDialog,
  SearchBarDefault,
  Breadcrumb,
  SimpleCard,
  MuiTable,
  TButton,
  CheckboxGroup,
  CheckBoxGroup, MuiTable2,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/AddBox";
import BulkAddIcon from "@mui/icons-material/Queue";
import AddProductIcon from "@mui/icons-material/Inventory";
import { min } from "lodash";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function ProductList() {
  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [addProdcutOn, setAddProductOn] = useState(false);

  const [newProduct, setNewProduct] = useState({});

  const {api, apiNonAuth} = useAxios();

  const addProductFields = [
    {
      title: "Product Details",
      inputs: [
        {
          key: "product_name_text",
          required: true,
          id: "product_name_text",
          name: "productName",
          label: "Product Name",
          type: "text",
          placeholder: "Enter product name",
          value: newProduct.supplierName || "",
          setValue: (val) => setNewProduct({ ...newProduct, productName: val }),
        },
        {
          key: "price_num",
          required: true,
          id: "price_num",
          name: "price",
          label: "Price",
          type: "number",
          placeholder: "Set a price",
          value: newProduct.price || "",
          setValue: (val) => setNewProduct({ ...newProduct, price: val }),
        },
        {
          key: "discount_num",
          required: false,
          id: "discount_num",
          name: "discount",
          label: "Discount",
          type: "number",
          placeholder: "Set a discount",
          value: newProduct.discount || "",
          setValue: (val) => setNewProduct({ ...newProduct, discount: val }),
          min: 0,
          max: 100,
        },
        {
          key: "supplier_select",
          id: "supplier_select",
          name: "supplier",
          label: "Suuplier",
          required: true,
          type: "select",
          value: newProduct.supplier || 1,
          setValue: (val) => setNewProduct({ ...newProduct, supplier: val }),
          break: true,
          options: [
            { label: "Supp1", value: 1 },
            { label: "supp2", value: 2 },
            { label: "supp3", value: 3 },
          ],
        },
      ],
    },
    {
      title: "Product Specifications",
      inputs: [
        {
          key: "color_select",
          id: "color_select",
          name: "color",
          label: "Color",
          required: false,
          type: "select",
          value: newProduct.color || "White",
          setValue: (val) => setNewProduct({ ...newProduct, color: val }),
          break: false,
          options: [
            { label: "White", value: "White" },
            { label: "Red", value: "Red" },
            { label: "Black", value: "Black" },
          ],
        },
        {
          key: "size_select",
          id: "size_select",
          name: "size",
          label: "Size",
          required: true,
          type: "select",
          value: newProduct.size || "4L",
          setValue: (val) => setNewProduct({ ...newProduct, size: val }),
          break: false,
          options: [
            { label: "1L", value: "1L" },
            { label: "4L", value: "4L" },
            { label: "5L", value: "5L" },
          ],
        },
        {
          key: "brand_select",
          id: "brand_select",
          name: "brand",
          label: "Brand",
          required: true,
          type: "select",
          value: newProduct.brand || "Dulux",
          setValue: (val) => setNewProduct({ ...newProduct, brand: val }),
          break: false,
          options: [
            { label: "Dulux", value: "Dulux" },
            { label: "Nippon Paints", value: "Nippon Paints" },
            { label: "Causway", value: "Causway" },
          ],
        },
        {
          key: "type_select",
          id: "type_select",
          name: "productType",
          label: "Product Type",
          required: true,
          type: "select",
          value: newProduct.productType || "Paint",
          setValue: (val) => setNewProduct({ ...newProduct, productType: val }),
          break: false,
          options: [
            { label: "Cleaner", value: "Cleaner" },
            { label: "Paint", value: "Paint" },
            { label: "Undercoat", value: "Undercoat" },
            { label: "Varnish", value: "Varnish" },
            { label: "Waterproofing", value: "Waterproofing" },
          ],
        },
        {
          key: "room_select",
          id: "room_select",
          name: "roomType",
          label: "Room Type",
          required: true,
          type: "select",
          value: newProduct.roomType || "Living Room",
          setValue: (val) => setNewProduct({ ...newProduct, roomType: val }),
          break: false,
          options: [
            { label: "Living Room", value: "Living Room" },
            { label: "Kitchen", value: "Kitchen" },
            { label: "Bathroom", value: "Bathroom" },
            { label: "Bedroom", value: "Bedroom" },
            { label: "Children's Room", value: "Children's Room" },
            { label: "Dining Room", value: "Dining Room" },
            { label: "Hallway", value: "Hallway" },
            { label: "Home Office", value: "Home Office" },
          ],
        },
        {
          key: "finish_select",
          id: "finish_select",
          name: "finish",
          label: "Finish",
          required: true,
          type: "select",
          value: newProduct.finish || "Gloss",
          setValue: (val) => setNewProduct({ ...newProduct, finish: val }),
          break: false,
          options: [
            { label: "Gloss", value: "Gloss" },
            {
              label: "Gloss, Semi Gloss Matt",
              value: "Gloss, Semi Gloss Matt",
            },
            { label: "High Gloss", value: "High Gloss" },
            { label: "Low Sheen", value: "Low Sheen" },
            { label: "Matt", value: "Matt" },
            { label: "Mid Sheen", value: "Mid Sheen" },
            { label: "NA", value: "NA" },
            { label: "Semi Gloss", value: "Semi Gloss" },
          ],
        },
        {
          key: "position_multi_select",
          id: "position_multi_select",
          name: "position",
          label: "Position",
          required: true,
          multi: true,
          type: "multi_select",
          value: newProduct.position || [],
          setValue: (val) =>
            setNewProduct({
              ...newProduct,
              position: Array.isArray(val) ? val : [val],
            }),
          break: false,
          options: [
            { label: "Exterior", value: "Exterior" },
            { label: "Interior", value: "Interior" },
            { label: "Interior and Exterior", value: "Interior and Exterior" },
          ],
        },
        {
          key: "surface_multi_select",
          id: "surface_multi_select",
          name: "surface",
          label: "Surface",
          required: true,
          multi: true,
          type: "multi_select",
          value: newProduct.surface || [],
          setValue: (val) =>
            setNewProduct({
              ...newProduct,
              surface: Array.isArray(val) ? val : [val],
            }),
          break: false,
          options: [
            { label: "Bluestone", value: "Bluestone" },
            { label: "Doors", value: "Doors" },
            { label: "Furniture", value: "Furniture" },
            { label: "Metal", value: "Metal" },
            { label: "Walls", value: "Walls" },
            { label: "Windows", value: "Windows" },
            { label: "Wood", value: "Wood" },
          ],
        },
      ],
    },
    {
      title: "Additional Details",
      inputs: [
        {
          key: "image_file",
          id: "image_file",
          name: "image",
          label: "Product Image",
          close: true,
          type: "file",
          value: newProduct.image || "",
          setValue: (val) => setNewProduct({ ...newProduct, image: val }),
          break: false,
          multi: false,
          options: [
            { label: "Local", value: "Local" },
            { label: "Foreign", value: "Foreign" },
          ],
        },
      ],
    },
  ];

  const [datatableData, setDataTableData] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () =>{
      try{
        const response = await apiNonAuth.get('product');
        setDataTableData(response.data);
      }catch(err){

      }
      
    };
    fetchProducts();
  },[])

  const [columns, setColumns] = useState([
    {
      name: "Barcode",
      label: "Barcode",
      options: {
        filter: false
      }
    },
    {
      name: "Product Name",
      label: "Product Name",
      options: {
        filter: false
      }
    },
    {
      name: "Brand",
      label: "Brand",
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
                  label="Brand"
                options={["Dulux", "Robbialac", "Nippon paint", "Asian paint", "Kansai paint"]}
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
            return `Brand: ${value.join(", ")}`;
          }
          return false;
        },
      },
    },
    {
      name: "Product Type",
      label: "Product Type",
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
                    label="Product type"
                    options={["Cleaner", "Paint", "Undercoat", "Varnish", "Waterproofing"]}
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
            return `Product type: ${value.join(", ")}`;
          }
          return false;
        },
      },
    },
    {
      name: "Color",
      label: "Color",
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
                    label="Color"
                    options={["Cleaner", "Paint", "Undercoat", "Varnish", "Waterproofing"]}
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
            return `Product type: ${value.join(", ")}`;
          }
          return false;
        },
      },
    },
    {
      name: "Size",
      label: "Size (LTR)",
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
                    label="Size"
                    options={["L 1", "L 5", "L 10", "L 20", "L 50"]}
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
            return `Size: ${value.join(", ")}`;
          }
          return false;
        },
      },
    },
    {
      name: "Selling Price",
      label: "Selling Price (LKR)",
      options: {
        filter: false
      }
    },
    {
      name: "Stocks",
      label: "Stock",
      options: {
        filter: false
      }
    },
    {
      name: "Status",
      label: "Status",
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
                    label="Status"
                    options={["Available", "Unavailable"]}
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
            return `Status: ${value.join(", ")}`;
          }
          return false;
        },
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        buttonsConfig: [
          {
            title: "View item",
            type: "icon",
            icon: ViewIcon,
            color: "primary",
            size: "small",
            onClick: (index) => {
              navigate('/product/view/'+datatableData[index][0])
            },
          },
          {
            title: "Edit item",
            type: "icon",
            icon: EditIcon,
            color: "primary",
            size: "small",
            onClick: (index) => {
              console.log("Edit icon button clicked for row", index);
            },
          },
          {
            title: "Remove item",
            type: "icon",
            icon: DeleteIcon,
            color: "error",
            size: "small",
            onClick: (index) => {
              console.log("Delete icon button clicked for row", index);
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
        <Breadcrumb
          routeSegments={[
            { name: "Product", path: "/Product/list" },
            { name: "List" },
          ]}
        />
      </Box>

      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
        spacing={5}
      >
        <Box
          gap={"0.5em"}
          display={"flex"}
          flexWrap={"wrap"}
          sx={{ width: "100%" }}
        >
          <TButton
            title={"Add new product"}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            fun={setAddProductOn}
            label={"Product"}
          ></TButton>
          {/* <Tooltip title={'Add new product'}><Button startIcon={<AddIcon />} variant="contained" color="primary" fun={setAddProductOn}>Product</Button></Tooltip>
                <Tooltip title={'Add new bulk products'}><Button startIcon={<BulkAddIcon />} variant="contained" color="primary" fun={setAddProductOn}>Bulk products</Button></Tooltip> */}
        </Box>
        {/* <SimpleCard
          sx={{ width: "100%", top: "-3em" }}
          title={"Search Products"}
        >
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={"0.4em"}
            sx={{ width: "100%" }}
          >
            <Select
              sx={{ width: "20%" }}
              value={selectedAction}
              size="small"
              onChange={(event) => setSelectedAction(event.target.value)}
            >
              <MenuItem value={"barcode"}>Search by product barcode</MenuItem>
              <MenuItem value={"name"}>Search by product name</MenuItem>
              <MenuItem value={"color"}>Search by product color</MenuItem>
              <MenuItem value={"size"}>Search by product size</MenuItem>
              <MenuItem value={"finish"}>Search by product finish</MenuItem>
              <MenuItem value={"room"}>Search by product room type</MenuItem>
              <MenuItem value={"type"}>Search by product type</MenuItem>
              <MenuItem value={"surface"}>Search by product surface</MenuItem>
              <MenuItem value={"brand"}>Search by product brand</MenuItem>
              <MenuItem value={"all"}>Search by all</MenuItem>
            </Select>
            <SearchBarDefault
              sx={{ width: "80%" }}
              value={searchText}
              setValue={setSearchText}
              placeholder={"Search products..."}
              search={search}
            ></SearchBarDefault>
          </Box>
          {searchResult && searchResult.length > 0 && (
            <MuiTable
              search={false}
              print={false}
              download={false}
              columns={columns}
              dataTableData={searchResult}
              selectableRows={"none"}
              filterType={"text"}
            />
          )}
        </SimpleCard> */}
        <SimpleCard sx={{ width: "100%" }}>
          <MuiTable2
            print={true}
            download={true}
            title={"Products"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
            rowsPerPage={true}
            serverSide={true}
            path={'product'}
          />
        </SimpleCard>
      </Stack>

      <PopupFormDialog
        open={addProdcutOn}
        title="Add Product"
        submitButton="Add Product"
        titleIcon={<AddProductIcon />}
        fields={addProductFields}
        setOpen={setAddProductOn}
        reasonCloseOn={true}
        setValues={setNewProduct}
      />
    </Container>
  );
}

export default ProductList;
