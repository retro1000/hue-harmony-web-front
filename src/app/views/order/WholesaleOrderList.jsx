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

function WholesaleOrderList() {
  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [addSupplierOn, setAddSupplierOn] = useState(false);

  const [newSupplier, setNewSupplier] = useState({});

  const addSupplierFields = [
    {
      title: "Supplier Details",
      inputs: [
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
          setValue: (val) =>
            setNewSupplier({ ...newSupplier, mobilePhone: val }),
        },
      ],
    },
    {
      title: "Additional Details",
      inputs: [
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
    },
  ];

  const [searchResult, setSearchResult] = useState([
    [
      "PO#001",
      "Paint House Ltd",
      "25,000.00",
      "01 Jul 2024",
      "Alice Brown",
      "Pending",
    ],
    [
      "PO#002",
      "Color World",
      "40,000.00",
      "02 Jul 2024",
      "John Doe",
      "Completed",
    ],
    [
      "PO#003",
      "Paint Suppliers Inc.",
      "18,500.00",
      "03 Jul 2024",
      "Jane Smith",
      "Pending",
    ],
  ]);

  const [datatableData, setDataTableData] = useState([
    [
      "PO#001",
      "Paint House Ltd",
      "25,000.00",
      "01 Jul 2024",
      "Alice Brown",
      "Pending",
    ],
    [
      "PO#002",
      "Color World",
      "40,000.00",
      "02 Jul 2024",
      "John Doe",
      "Completed",
    ],
    [
      "PO#003",
      "Paint Suppliers Inc.",
      "18,500.00",
      "03 Jul 2024",
      "Jane Smith",
      "Pending",
    ],
    [
      "PO#004",
      "Brilliant Colors",
      "32,750.00",
      "04 Jul 2024",
      "Emma Johnson",
      "Completed",
    ],
    [
      "PO#005",
      "Urban Paints",
      "29,300.00",
      "05 Jul 2024",
      "Chris White",
      "Pending",
    ],
    [
      "PO#006",
      "Brush Strokes",
      "22,100.00",
      "06 Jul 2024",
      "Mike Green",
      "Cancelled",
    ],
    [
      "PO#007",
      "Royal Paints",
      "33,500.00",
      "07 Jul 2024",
      "Sara Black",
      "Completed",
    ],
    [
      "PO#008",
      "Master Colors",
      "45,000.00",
      "08 Jul 2024",
      "Diana King",
      "Completed",
    ],
    [
      "PO#009",
      "Supreme Coatings",
      "26,400.00",
      "09 Jul 2024",
      "Tom Blue",
      "Pending",
    ],
    [
      "PO#010",
      "Artistic Supplies",
      "27,900.00",
      "10 Jul 2024",
      "Lily Gray",
      "Completed",
    ],
    [
      "PO#011",
      "Spectrum Suppliers",
      "30,000.00",
      "11 Jul 2024",
      "Max White",
      "Completed",
    ],
    [
      "PO#012",
      "Rainbow Paints",
      "19,800.00",
      "12 Jul 2024",
      "Nina Red",
      "Pending",
    ],
    [
      "PO#013",
      "Ace Paints",
      "23,400.00",
      "13 Jul 2024",
      "Jack Orange",
      "Completed",
    ],
    [
      "PO#014",
      "Color Masters",
      "28,700.00",
      "14 Jul 2024",
      "Ella Purple",
      "Pending",
    ],
    [
      "PO#015",
      "Elegant Paints",
      "31,600.00",
      "15 Jul 2024",
      "Sam Yellow",
      "Completed",
    ],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "Order ID",
      label: "Order ID",
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

  const orderForm = () => {
    navigate('/order/crete-order'); // Redirects to the "Order" page
  };

  const search = () => {};

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Orders" },
            { name: "Wholesale" },
            { name: "Summary" },
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
            title={"Add order"}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            fun={orderForm}
            label={"Order"}
          ></TButton>
        </Box>
        <SimpleCard sx={{ width: "100%", top: "-3em" }} title={"Search orders"}>
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
              placeholder={"Search orders..."}
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
            title={"Orders"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>
      </Stack>

      <PopupFormDialog
        open={addSupplierOn}
        title="Add order"
        submitButton="Add order"
        titleIcon={<AddSupplierIcon />}
        fields={addSupplierFields}
        setOpen={setAddSupplierOn}
        reasonCloseOn={true}
        setValues={setNewSupplier}
      />
    </Container>
  );
}

export default WholesaleOrderList;
