import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/AddBox";
import AddSupplierIcon from "@mui/icons-material/Storefront";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function SupplierList() {
  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [addSupplierOn, setAddSupplierOn] = useState(false);

  const [newSupplier, setNewSupplier] = useState({});

  const addSupplierFields = {
    require: [
      {
        key: "sup_name_text",
        required: true,
        id: "sup_name_text",
        name: "supplierName",
        label: "Supplier Name",
        type: "text",
        placeholder: "Enter supplier name",
        value: newSupplier.supplierName || "",
        setValue: (val) =>
          setNewSupplier({ ...newSupplier, supplierName: val }),
      },
      {
        key: "address_text",
        required: true,
        id: "sup_name_text",
        name: "supplierAddress",
        label: "Supplier Address",
        type: "text",
        placeholder: "Enter supplier address",
        value: newSupplier.supplierAddress || "",
        setValue: (val) =>
          setNewSupplier({ ...newSupplier, supplierAddress: val }),
        sx: { width: "50%" },
      },
      {
        key: "type_select",
        id: "type_select",
        name: "supplierType",
        label: "Supplier Type",
        required: true,
        type: "select",
        value: newSupplier.supplierType || "Local",
        setValue: (val) =>
          setNewSupplier({ ...newSupplier, supplierType: val }),
        break: true,
        options: [
          { label: "Local", value: "Local" },
          { label: "Foreign", value: "Foreign" },
        ],
      },
      {
        key: "land_tel",
        id: "land_tel",
        required: true,
        name: "landPhone",
        label: "Land Phone",
        type: "tel",
        placeholder: "Enter landphone number",
        value: newSupplier.landPhone || "",
        setValue: (val) => setNewSupplier({ ...newSupplier, landPhone: val }),
      },
      {
        key: "mobile_tel",
        id: "mobile_tel",
        name: "mobilePhone",
        label: "Mobile Phone",
        type: "tel",
        placeholder: "Enter mobile number",
        value: newSupplier.mobilePhone || "",
        setValue: (val) => setNewSupplier({ ...newSupplier, mobilePhone: val }),
      },
    ],
    optional: [
      {
        key: "sup_email_text",
        required: false,
        id: "sup_email_text",
        name: "supplierEmail",
        label: "Supplier Email",
        type: "email",
        placeholder: "Enter supplier email",
        value: newSupplier.supplierEmail || "",
        setValue: (val) =>
          setNewSupplier({ ...newSupplier, supplierEmail: val }),
      },
      {
        key: "industry_select",
        id: "industry_select",
        name: "supplierIndustry",
        label: "Supplier Inustry",
        type: "select",
        value: newSupplier.supplierIndustry || "Local",
        setValue: (val) =>
          setNewSupplier({ ...newSupplier, supplierIndustry: val }),
        break: false,
        multi: false,
        options: [
          { label: "Local", value: "Local" },
          { label: "Foreign", value: "Foreign" },
        ],
      },
      {
        key: "category_select",
        id: "category_select",
        name: "supplierCategory",
        label: "Supplier Category",
        type: "select",
        value: newSupplier.supplierCategory || "Local",
        setValue: (val) =>
          setNewSupplier({ ...newSupplier, supplierCategory: val }),
        break: false,
        multi: false,
        options: [
          { label: "Local", value: "Local" },
          { label: "Foreign", value: "Foreign" },
        ],
      },
    ],
  };

  const [searchResult, setSearchResult] = useState([
    [
      "D#45er",
      "Wall paint",
      "Dulux",
      "Paint",
      "Red",
      "4 Ltr",
      "11000.00",
      "13",
      "Available",
    ],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ]);

  const [datatableData, setDataTableData] = useState([
    ["1", "Dulux", "qwe", "13 Jun 2024", "User1", "Available"],
    [
      "D#45er",
      "Wall paint",
      "Dulu",
      "Paint",
      "Red",
      "4 Ltr",
      "11000.00",
      "13",
      "Inactive",
    ],
    [
      "D#45er",
      "Wall paint",
      "Dulux",
      "Paint",
      "Red",
      "4 Ltr",
      "11000.00",
      "13",
      "Pending",
    ],
    [
      "D#45er",
      "Wall paint",
      "Dulux",
      "Paint",
      "Red",
      "4 Ltr",
      "11000.00",
      "13",
      "Blocked",
    ],
    [
      "D#45er",
      "Wall paint",
      "Dulux",
      "Paint",
      "Red",
      "4 Ltr",
      "11000.00",
      "13",
      "Sold",
    ],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "Barcode",
      label: "Barcode",
    },
    {
      name: "Supplier Name",
      label: "Supplier Name",
    },
    {
      name: "Grand Total",
      label: "Grand Total (LKR)",
    },
    {
      name: "Created On",
      label: "Created On",
    },
    {
      name: "Created By",
      label: "Created By",
    },
    {
      name: "Status",
      label: "Status",
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        buttonsConfig: [
          {
            type: "icon",
            icon: ViewIcon,
            color: "primary",
            size: "small",
            onClick: (index) => {
              const selectedSupplier = datatableData[index];
              const supplierData = {
                id: selectedSupplier[0],
                name: selectedSupplier[1],
                grandTotal: selectedSupplier[2],
                createdOn: selectedSupplier[3],
                createdBy: selectedSupplier[4],
                status: selectedSupplier[5],
              };
              navigate(`/supplier/view/${supplierData.id}`, {
                state: supplierData,
              });
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
          routeSegments={[{ name: "Good recieved note" }, { name: "List" }]}
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
            title={"Add new supplier"}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            fun={setAddSupplierOn}
            label={"Supplier"}
          ></TButton>
        </Box>
        <SimpleCard
          sx={{ width: "100%", top: "-3em" }}
          title={"Search Good recieved notes"}
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
              <MenuItem value={"barcode"}>Search by barcode</MenuItem>
              <MenuItem value={"grn"}>Search by GRN code</MenuItem>
              <MenuItem value={"name"}>Search by supplier name</MenuItem>
              <MenuItem value={"all"}>Search by all</MenuItem>
            </Select>
            <SearchBarDefault
              sx={{ width: "80%" }}
              value={searchText}
              setValue={setSearchText}
              placeholder={"Search Good recieved notes..."}
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
        </SimpleCard>
        <SimpleCard sx={{ width: "100%" }}>
          <MuiTable
            print={true}
            download={true}
            title={"Good recieved notes"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
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
