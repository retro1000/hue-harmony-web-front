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
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
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

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function InvoiceList() {
  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [searchResult, setSearchResult] = useState([
    [
      "INV12345",
      "Jane Doe",
      "Wall Paint",
      "5",
      "2,200.00",
      "11,000.00",
      "29 Jul 2024",
      "Manager1",
      "Completed",
    ],
    [
      "INV67890",
      "John Smith",
      "Acrylic Paint",
      "3",
      "3,500.00",
      "10,500.00",
      "27 Jul 2024",
      "Manager2",
      "Pending",
    ],
  ]);

  const [datatableData, setDataTableData] = useState([
    [
      "1",
      "INV001",
      "Emily Clark",
      "Oil-Based Paint",
      "8",
      "3,200.00",
      "25,600.00",
      "31 Jul 2024",
      "Admin",
      "Completed",
    ],
    [
      "2",
      "INV002",
      "Michael Johnson",
      "Primer",
      "10",
      "1,200.00",
      "12,000.00",
      "30 Jul 2024",
      "User2",
      "Pending",
    ],
    [
      "3",
      "INV003",
      "Sarah Williams",
      "Spray Paint",
      "12",
      "800.00",
      "9,600.00",
      "30 Jul 2024",
      "User3",
      "Cancelled",
    ],
    [
      "4",
      "INV004",
      "David Brown",
      "Gloss Paint",
      "6",
      "1,500.00",
      "9,000.00",
      "29 Jul 2024",
      "User4",
      "Completed",
    ],
    [
      "5",
      "INV005",
      "Jessica Garcia",
      "Varnish",
      "4",
      "2,000.00",
      "8,000.00",
      "28 Jul 2024",
      "User5",
      "Pending",
    ],
    [
      "6",
      "INV006",
      "James Miller",
      "Enamel",
      "5",
      "2,500.00",
      "12,500.00",
      "28 Jul 2024",
      "User6",
      "Completed",
    ],
    [
      "7",
      "INV007",
      "Olivia Martinez",
      "Lacquer",
      "7",
      "1,800.00",
      "12,600.00",
      "27 Jul 2024",
      "User7",
      "Cancelled",
    ],
    [
      "8",
      "INV008",
      "William Lee",
      "Latex Paint",
      "9",
      "2,200.00",
      "19,800.00",
      "26 Jul 2024",
      "User8",
      "Completed",
    ],
    [
      "9",
      "INV009",
      "Sophia Taylor",
      "Thinner",
      "10",
      "600.00",
      "6,000.00",
      "25 Jul 2024",
      "User9",
      "Pending",
    ],
    [
      "10",
      "INV010",
      "Lucas Anderson",
      "Matt Paint",
      "3",
      "1,000.00",
      "3,000.00",
      "24 Jul 2024",
      "User10",
      "Completed",
    ],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "Invoice Number",
      label: "Invoice Number",
    },
    {
      name: "Customer Name",
      label: "Customer Name",
    },
    {
      name: "Product Name",
      label: "Product Name",
    },
    {
      name: "Quantity",
      label: "Quantity",
    },
    {
      name: "Price per Unit",
      label: "Price per Unit (LKR)",
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
              const selectedInvoice = datatableData[index];
              const invoiceData = {
                id: selectedInvoice[0],
                name: selectedInvoice[1],
                grandTotal: selectedInvoice[6],
                createdOn: selectedInvoice[7],
                createdBy: selectedInvoice[8],
                status: selectedInvoice[9],
              };
              navigate(`/invoice/view/${invoiceData.id}`, {
                state: invoiceData,
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
        <Breadcrumb routeSegments={[{ name: "Invoice" }, { name: "List" }]} />
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
            title={"Add new invoice"}
            startIcon={<AddIcon />}
            variant={"contained"}
            label={"Invoice"}
            color={"primary"}
            fun={() => navigate("/invoice/create-invoice")}
          ></TButton>
        </Box>
        <SimpleCard
          sx={{ width: "100%", top: "-3em" }}
          title={"Search Invoices"}
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
              <MenuItem value={"barcode"}>Search by name</MenuItem>
              <MenuItem value={"name"}>Search by contact number</MenuItem>
              <MenuItem value={"name"}>Search by address</MenuItem>
              <MenuItem value={"all"}>Search by all</MenuItem>
            </Select>
            <SearchBarDefault
              sx={{ width: "80%" }}
              value={searchText}
              setValue={setSearchText}
              placeholder={"Search Invoices..."}
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
            title={"Invoices"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>
      </Stack>
    </Container>
  );
}

export default InvoiceList;
