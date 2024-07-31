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

function RetailOrderList() {
  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [searchResult, setSearchResult] = useState([
    [
      "ORD12345",
      "A to Z Paint Supplies",
      "Wall Paint",
      "10",
      "1,500.00",
      "15,000.00",
      "31 Jul 2024",
      "Admin1",
      "Completed",
    ],
    [
      "ORD67890",
      "Paints & More",
      "Acrylic Paint",
      "5",
      "2,000.00",
      "10,000.00",
      "29 Jul 2024",
      "Admin2",
      "Pending",
    ],
  ]);

  const [datatableData, setDataTableData] = useState([
    [
      "1",
      "ORD001",
      "Quality Paints Ltd.",
      "Oil-Based Paint",
      "20",
      "1,200.00",
      "24,000.00",
      "30 Jul 2024",
      "John Doe",
      "Completed",
    ],
    [
      "2",
      "ORD002",
      "Color World Inc.",
      "Gloss Paint",
      "15",
      "1,800.00",
      "27,000.00",
      "29 Jul 2024",
      "Jane Smith",
      "Pending",
    ],
    [
      "3",
      "ORD003",
      "Global Paint Co.",
      "Spray Paint",
      "10",
      "1,000.00",
      "10,000.00",
      "28 Jul 2024",
      "Alice Johnson",
      "Completed",
    ],
    [
      "4",
      "ORD004",
      "Paint Masters",
      "Matt Paint",
      "12",
      "900.00",
      "10,800.00",
      "27 Jul 2024",
      "Bob Williams",
      "Cancelled",
    ],
    [
      "5",
      "ORD005",
      "Decor Paints",
      "Primer",
      "8",
      "500.00",
      "4,000.00",
      "26 Jul 2024",
      "Charlie Brown",
      "Completed",
    ],
    [
      "6",
      "ORD006",
      "Paint Shoppe",
      "Varnish",
      "6",
      "2,500.00",
      "15,000.00",
      "25 Jul 2024",
      "Diana Ross",
      "Pending",
    ],
    [
      "7",
      "ORD007",
      "Ultimate Paint Supplies",
      "Enamel",
      "9",
      "1,300.00",
      "11,700.00",
      "24 Jul 2024",
      "Ethan Hunt",
      "Completed",
    ],
    [
      "8",
      "ORD008",
      "Premium Paints",
      "Acrylic Paint",
      "11",
      "1,600.00",
      "17,600.00",
      "23 Jul 2024",
      "Fiona Apple",
      "Cancelled",
    ],
    [
      "9",
      "ORD009",
      "Value Paints",
      "Latex Paint",
      "7",
      "2,100.00",
      "14,700.00",
      "22 Jul 2024",
      "George Clooney",
      "Completed",
    ],
    [
      "10",
      "ORD010",
      "Best Paints & Co.",
      "Thinner",
      "14",
      "800.00",
      "11,200.00",
      "21 Jul 2024",
      "Holly Golightly",
      "Pending",
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
      name: "Order Number",
      label: "Order Number",
    },
    {
      name: "Supplier Name",
      label: "Supplier Name",
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
      name: "Order Date",
      label: "Order Date",
    },
    {
      name: "Processed By",
      label: "Processed By",
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
                orderNumber: selectedSupplier[1],
                supplierName: selectedSupplier[2],
                productName: selectedSupplier[3],
                quantity: selectedSupplier[4],
                pricePerUnit: selectedSupplier[5],
                grandTotal: selectedSupplier[6],
                orderDate: selectedSupplier[7],
                processedBy: selectedSupplier[8],
                status: selectedSupplier[9],
              };
              navigate(`/order/view/${supplierData.id}`, {
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
          routeSegments={[
            { name: "Orders" },
            { name: "Retail" },
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
    </Container>
  );
}

export default RetailOrderList;
