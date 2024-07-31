import { useState, useEffect } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  TButton,
  SearchBarDefault,
  Breadcrumb,
  SimpleCard,
  MuiTable,
  SearchableSelectMultiple,
  NumSliderFilter,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import ErrorIcon from "@mui/icons-material/Error";
import FilterIcon from "@mui/icons-material/FilterAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function getCurrentDateTime() {
  const now = new Date();

  // Options for the date part
  const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
  const dateString = new Intl.DateTimeFormat("en-GB", dateOptions).format(now);

  // Options for the time part
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const timeString = new Intl.DateTimeFormat("en-GB", timeOptions).format(now);

  return `${
    dateString.replace(/ /g, " ") +
    " " +
    timeString.replace("am", "AM").replace("pm", "PM")
  }`;
}

function InventoryList() {
  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [currDate, setCurrDate] = useState(getCurrentDateTime());

  const [selectedBrand, setSelectedBrand] = useState();

  const [selectedColor, setSelectedColor] = useState();

  const [selectedType, setSelectedType] = useState();

  const [selectedSize, setSelectedSize] = useState();

  const [sellPriceMax, setSellPriceMax] = useState(20000);

  const [sellPriceMin, setSellPriceMin] = useState(1000);

  const [sellPriceRange, setSellPriceRange] = useState([
    sellPriceMin,
    sellPriceMax,
  ]);

  const [qtyMax, setQtyMax] = useState(30);

  const [qtyMin, setQtyMin] = useState(12);

  const [qtyRange, setQtyRange] = useState([qtyMin, qtyMax]);

  const [filterKeys, setFilterKeys] = useState({
    brand: [
      { label: "Dulux", value: 1 },
      { label: "All", value: 2 },
    ],
    type: [
      { label: "Wall", value: 1 },
      { label: "All", value: 1 },
    ],
    color: [
      { label: "Red", value: 1 },
      { label: "All", value: 1 },
    ],
    size: [
      { label: "4Ltr", value: 1 },
      { label: "2Ltr", value: 1 },
      { label: "All", value: 1 },
    ],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrDate(getCurrentDateTime());
    }, 1000 * 60); // Update every second

    return () => clearInterval(intervalId);
  });

  const [searchResult, setSearchResult] = useState([
    [
      "BRC123466",
      "Ceiling Paint",
      "PO001244",
      "GRN011",
      "Dulux",
      "Gloss",
      "White",
      "7",
      "14000.00",
      "14",
      "Available",
    ],
    [
      "BRC123467",
      "Wall Paint",
      "PO001245",
      "GRN012",
      "Nippon",
      "Emulsion",
      "Blue",
      "12",
      "21000.00",
      "7",
      "Available",
    ],
  ]);

  const [datatableData, setDataTableData] = useState([
    [
      "BRC123456",
      "Wall Paint",
      "PO001234",
      "GRN001",
      "Dulux",
      "Emulsion",
      "Red",
      "4",
      "12500.00",
      "25",
      "Available",
    ],
    [
      "BRC123457",
      "Ceiling Paint",
      "PO001235",
      "GRN002",
      "Nippon",
      "Gloss",
      "White",
      "5",
      "15000.00",
      "15",
      "Available",
    ],
    [
      "BRC123458",
      "Floor Paint",
      "PO001236",
      "GRN003",
      "Jotun",
      "Matt",
      "Grey",
      "10",
      "23000.00",
      "10",
      "Inactive",
    ],
    [
      "BRC123459",
      "Wood Finish",
      "PO001237",
      "GRN004",
      "Berger",
      "Wood",
      "Brown",
      "2",
      "8000.00",
      "8",
      "Pending",
    ],
    [
      "BRC123460",
      "Metal Paint",
      "PO001238",
      "GRN005",
      "Asian Paints",
      "Enamel",
      "Black",
      "1",
      "6500.00",
      "30",
      "Blocked",
    ],
    [
      "BRC123461",
      "Acrylic Primer",
      "PO001239",
      "GRN006",
      "Dulux",
      "Primer",
      "Clear",
      "5",
      "12000.00",
      "20",
      "Sold",
    ],
    [
      "BRC123462",
      "Exterior Paint",
      "PO001240",
      "GRN007",
      "Nippon",
      "Weatherproof",
      "Blue",
      "20",
      "45000.00",
      "5",
      "Available",
    ],
    [
      "BRC123463",
      "Textured Paint",
      "PO001241",
      "GRN008",
      "Jotun",
      "Textured",
      "Yellow",
      "18",
      "38000.00",
      "12",
      "Sold",
    ],
    [
      "BRC123464",
      "Stain Guard",
      "PO001242",
      "GRN009",
      "Berger",
      "Stain",
      "Green",
      "6",
      "14000.00",
      "18",
      "Available",
    ],
    [
      "BRC123465",
      "Anti Mold Paint",
      "PO001243",
      "GRN010",
      "Asian Paints",
      "Special",
      "Pink",
      "3",
      "9500.00",
      "25",
      "Available",
    ],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "Barcode",
      label: "Product Barcode",
    },
    {
      name: "Product Name",
      label: "Product Name",
    },
    {
      name: "Purchase Order Barcode",
      label: "PO Barcode",
    },
    {
      name: "GRN",
      label: "Goods Received Note",
    },
    {
      name: "Brand",
      label: "Brand",
    },
    {
      name: "Product Type",
      label: "Product Type",
    },
    {
      name: "Color",
      label: "Color",
    },
    {
      name: "Size",
      label: "Size (Liters)",
    },
    {
      name: "Selling Price",
      label: "Selling Price (LKR)",
    },
    {
      name: "QTY",
      label: "Quantity",
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        buttonsConfig: [
          {
            type: "icon",
            title: "View item",
            icon: ViewIcon,
            color: "primary",
            size: "small",
            onClick: (index) => {
              console.log("View button clicked for row", index);
            },
          },
          {
            type: "icon",
            title: "View issues",
            icon: ErrorIcon,
            color: "primary",
            size: "small",
            onClick: (index) => {
              console.log("View issues button clicked for row", index);
            },
          },
        ],
      },
    },
  ]);

  const search = () => {};

  const AccordionRoot = styled("div")(({ theme }) => ({
    width: "100%",
    "& .heading": {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Inventory" }, { name: "Summary" }]}
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
        {/* <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <Button variant="contained" color="primary">Create grn</Button>
              </Box> */}
        <SimpleCard sx={{ width: "100%" }}>
          <MuiTable
            print={true}
            download={true}
            title={`Inventory Summary As Of ${currDate}`}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>
        <div style={{ width: "100%" }}>
          <AccordionRoot>
            <Accordion
              sx={{ width: "100%", borderRadius: "8px", marginBottom: "1em" }}
            >
              <AccordionSummary
                sx={{ borderRadius: "8px" }}
                expandIcon={<ExpandMoreIcon />}
                id="panel-header"
                aria-controls="panel-content"
              >
                <Typography variant="h6" fontSize="1.3em">
                  Filter inventory
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ borderRadius: "8px" }}>
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
                    <MenuItem value={"barcode"}>Search by barcode</MenuItem>
                    <MenuItem value={"grn"}>Search by GRN code</MenuItem>
                    <MenuItem value={"name"}>Search by supplier name</MenuItem>
                    <MenuItem value={"all"}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault
                    sx={{ width: "80%" }}
                    value={searchText}
                    setValue={setSearchText}
                    placeholder={"Search inventory..."}
                    search={search}
                  ></SearchBarDefault>
                </Box>
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  sx={{ marginTop: "1em" }}
                >
                  <Box
                    width={"100%"}
                    display={"flex"}
                    flexWrap={"wrap"}
                    flexDirection={"column"}
                  >
                    <NumSliderFilter
                      heading={"Selling Price"}
                      label={"Price"}
                      curr={"LKR"}
                      range={sellPriceRange}
                      min={sellPriceMin}
                      max={sellPriceMax}
                      setRange={setSellPriceRange}
                    />
                    <NumSliderFilter
                      heading={"Stock Available"}
                      label={"Quantity"}
                      curr={""}
                      range={qtyRange}
                      min={qtyMin}
                      max={qtyMax}
                      setRange={setQtyRange}
                    />
                  </Box>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    flexWrap={"wrap"}
                    gap={"3em"}
                  >
                    <SearchableSelectMultiple
                      label={"Brand"}
                      multiple={false}
                      options={filterKeys.brand}
                      setSelectedValues={setSelectedBrand}
                      selectedValues={selectedBrand}
                      sx={{
                        width: "20%",
                        maxWidth: "200px",
                        minWidth: "150px",
                      }}
                    />
                    <SearchableSelectMultiple
                      label={"Color"}
                      multiple={false}
                      options={filterKeys.color}
                      setSelectedValues={setSelectedColor}
                      selectedValues={selectedColor}
                      sx={{
                        width: "20%",
                        maxWidth: "200px",
                        minWidth: "150px",
                      }}
                    />
                    <SearchableSelectMultiple
                      label={"Size"}
                      multiple={false}
                      options={filterKeys.size}
                      setSelectedValues={setSelectedSize}
                      selectedValues={selectedSize}
                      sx={{
                        width: "20%",
                        maxWidth: "200px",
                        minWidth: "150px",
                      }}
                    />
                    <SearchableSelectMultiple
                      label={"Product type"}
                      multiple={false}
                      options={filterKeys.type}
                      setSelectedValues={setSelectedType}
                      selectedValues={selectedType}
                      sx={{
                        width: "20%",
                        maxWidth: "200px",
                        minWidth: "150px",
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: "1em" }}>
                  <TButton
                    title={"Filter inventory"}
                    color="primary"
                    variant="contained"
                    startIcon={<FilterIcon />}
                    label={"Filter"}
                  />
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
              </AccordionDetails>
            </Accordion>
          </AccordionRoot>
        </div>
      </Stack>
    </Container>
  );
}

export default InventoryList;
