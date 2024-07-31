import { useState } from "react";

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
  SearchBarDefault,
  Breadcrumb,
  SimpleCard,
  MuiTable,
  TButton,
  PopupFormDialog,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/AddBox";
import AddPaymentIcon from "@mui/icons-material/AddBox";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function PaymentList() {
  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [addPaymentOn, setAddPaymentOn] = useState(false);

  const [newPayment, setNewPayment] = useState({});

  const addPaymentFields = [
    {
      title: "Payment Details",
      inputs: [
        {
          key: "payment_date",
          required: true,
          id: "payment_date",
          name: "paymentDate",
          label: "Payment Date",
          type: "date",
          value: newPayment.paymentDate || null,
          setValue: (val) => setNewPayment({ ...newPayment, paymentDate: val }),
        },
        {
          key: "amount",
          required: true,
          id: "amount",
          name: "amount",
          label: "Amount",
          type: "number",
          placeholder: "Enter payment amount",
          value: newPayment.amount || "",
          setValue: (val) => setNewPayment({ ...newPayment, amount: val }),
        },
        {
          key: "method",
          required: true,
          id: "method",
          name: "method",
          label: "Payment Method",
          type: "select",
          value: newPayment.method || "Credit Card",
          setValue: (val) => setNewPayment({ ...newPayment, method: val }),
          options: [
            { label: "Credit Card", value: "Credit Card" },
            { label: "Bank Transfer", value: "Bank Transfer" },
            { label: "Cash", value: "Cash" },
          ],
        },
      ],
    },
    {
      title: "Recipient Details",
      inputs: [
        {
          key: "recipient_name",
          required: true,
          id: "recipient_name",
          name: "recipientName",
          label: "Recipient Name",
          type: "text",
          placeholder: "Enter recipient name",
          value: newPayment.recipientName || "",
          setValue: (val) =>
            setNewPayment({ ...newPayment, recipientName: val }),
        },
        {
          key: "recipient_account",
          required: true,
          id: "recipient_account",
          name: "recipientAccount",
          label: "Recipient Account",
          type: "text",
          placeholder: "Enter recipient account number",
          value: newPayment.recipientAccount || "",
          setValue: (val) =>
            setNewPayment({ ...newPayment, recipientAccount: val }),
        },
      ],
    },
    {
      title: "Additional Details",
      inputs: [
        {
          key: "payment_notes",
          required: false,
          id: "payment_notes",
          name: "paymentNotes",
          label: "Payment Notes",
          type: "text",
          rows: 6,
          placeholder: "Enter any additional notes",
          value: newPayment.paymentNotes || "",
          setValue: (val) =>
            setNewPayment({ ...newPayment, paymentNotes: val }),
          sx: { width: "100%", maxWidth: "600px" },
        },
      ],
    },
  ];

  const [searchResult, setSearchResult] = useState([
    [
      "INV001",
      "Alice Fernando",
      "15000.00",
      "30 Jul 2024",
      "Credit Card",
      "Completed",
    ],
    ["INV003", "Charlie Perera", "8000.00", "25 Jul 2024", "Cash", "Completed"],
    [
      "INV007",
      "Grace Wickramaratne",
      "5000.00",
      "12 Jul 2024",
      "Credit Card",
      "Completed",
    ],
  ]);

  const [datatableData, setDataTableData] = useState([
    [
      "INV001",
      "Alice Fernando",
      "15000.00",
      "30 Jul 2024",
      "Credit Card",
      "Completed",
    ],
    [
      "INV002",
      "Bob Silva",
      "22000.00",
      "28 Jul 2024",
      "Bank Transfer",
      "Pending",
    ],
    ["INV003", "Charlie Perera", "8000.00", "25 Jul 2024", "Cash", "Completed"],
    [
      "INV004",
      "David Wijesinghe",
      "17500.00",
      "22 Jul 2024",
      "Credit Card",
      "Completed",
    ],
    [
      "INV005",
      "Eve Gunasekara",
      "24000.00",
      "19 Jul 2024",
      "Bank Transfer",
      "Pending",
    ],
    [
      "INV006",
      "Frank Jayasinghe",
      "12000.00",
      "15 Jul 2024",
      "Cash",
      "Completed",
    ],
    [
      "INV007",
      "Grace Wickramaratne",
      "5000.00",
      "12 Jul 2024",
      "Credit Card",
      "Completed",
    ],
    [
      "INV008",
      "Harry Seneviratne",
      "26000.00",
      "10 Jul 2024",
      "Bank Transfer",
      "Pending",
    ],
    ["INV009", "Isla De Silva", "9500.00", "07 Jul 2024", "Cash", "Completed"],
    [
      "INV010",
      "John Samarasinghe",
      "30000.00",
      "05 Jul 2024",
      "Credit Card",
      "Completed",
    ],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "Invoice Number",
      label: "Invoice Number",
    },
    {
      name: "Customer Name",
      label: "Customer Name",
    },
    {
      name: "Amount (LKR)",
      label: "Amount (LKR)",
    },
    {
      name: "Payment Date",
      label: "Payment Date",
    },
    {
      name: "Payment Method",
      label: "Payment Method",
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
              console.log("Edit button clicked for row", index);
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
          routeSegments={[{ name: "Payment" }, { name: "Summary" }]}
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
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            label="Payment"
            title="Create new payment"
            fun={setAddPaymentOn}
          ></TButton>
        </Box>
        <SimpleCard
          sx={{ width: "100%", top: "-3em" }}
          title={"Search payments"}
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
              placeholder={"Search payments..."}
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
            title={"Payments"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>
      </Stack>

      <PopupFormDialog
        open={addPaymentOn}
        title="Create Payment"
        submitButton="Create Payment"
        titleIcon={<AddPaymentIcon />}
        fields={addPaymentFields}
        setOpen={setAddPaymentOn}
        reasonCloseOn={true}
        setValues={setNewPayment}
      />
    </Container>
  );
}

export default PaymentList;
