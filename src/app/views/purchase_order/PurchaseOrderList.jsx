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
import AddPurchaseOrderIcon from "@mui/icons-material/AddBox";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function PurchaseOrderList() {
  const navigate = useNavigate();
  

  const handleCreatePurchaseOrder = () => {
    navigate('/purchase-order/create'); 
  };


  const [selectedAction, setSelectedAction] = useState("barcode");

  const [searchText, setSearchText] = useState(undefined);

  const [addPurchaseOrderOn, setAddPurchaseOrderOn] = useState(false);

  const [newPurchaseOrder, setNewPurchaseOrder] = useState({});

  const addPurchaseOrderFields = [
    {
      title: "Purchase Order Details",
      inputs: [
        {
          key: "po_number",
          required: true,
          id: "po_number",
          name: "poNumber",
          label: "PO Number",
          type: "text",
          placeholder: "Enter purchase order number",
          value: newPurchaseOrder.poNumber || "",
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, poNumber: val }),
        },
        {
          key: "order_date",
          required: true,
          id: "order_date",
          name: "orderDate",
          label: "Order Date",
          type: "date",
          value: newPurchaseOrder.orderDate || null,
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, orderDate: val }),
        },
        {
          key: "supplier_select",
          required: true,
          id: "supplier_select",
          name: "supplier",
          label: "Supplier",
          type: "select",
          value: newPurchaseOrder.supplier || 1,
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, supplier: val }),
          options: [
            { label: "Supp1", value: 1 },
            { label: "Supp2", value: 2 },
            { label: "Supp3", value: 3 },
          ],
        },
        {
          key: "total_amount",
          required: true,
          id: "total_amount",
          name: "totalAmount",
          label: "Total Amount",
          type: "number",
          placeholder: "Enter total amount",
          value: newPurchaseOrder.totalAmount || "",
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, totalAmount: val }),
        },
      ],
    },
    {
      title: "Shipping Details",
      inputs: [
        {
          key: "shipping_address",
          required: true,
          id: "shipping_address",
          name: "shippingAddress",
          label: "Shipping Address",
          type: "text",
          placeholder: "Enter shipping address",
          value: newPurchaseOrder.shippingAddress || "",
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, shippingAddress: val }),
        },
        {
          key: "delivery_date",
          required: true,
          id: "delivery_date",
          name: "deliveryDate",
          label: "Delivery Date",
          type: "date",
          value: newPurchaseOrder.deliveryDate || null,
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, deliveryDate: val }),
        },
      ],
    },
    {
      title: "Additional Details",
      inputs: [
        {
          key: "notes",
          required: false,
          id: "notes",
          name: "notes",
          label: "Notes",
          type: "text",
          rows: 6,
          placeholder: "Enter any additional notes",
          value: newPurchaseOrder.notes || "",
          setValue: (val) =>
            setNewPurchaseOrder({ ...newPurchaseOrder, notes: val }),
          sx: { width: "100%", maxWidth: "600px" },
        },
      ],
    },
  ];

  const [searchResult, setSearchResult] = useState([
    [
      "PO12345",
      "Dulux Paints",
      "John Doe",
      "30 Jul 2024",
      "100,000.00",
      "Pending",
    ],
    [
      "PO67890",
      "Sherwin-Williams",
      "Jane Smith",
      "25 Jul 2024",
      "150,000.00",
      "Completed",
    ],
    [
      "PO54321",
      "Asian Paints",
      "Bob Johnson",
      "20 Jul 2024",
      "200,000.00",
      "Cancelled",
    ],
  ]);

  const [datatableData, setDataTableData] = useState([
    [
      "PO12345",
      "Dulux Paints",
      "John Doe",
      "30 Jul 2024",
      "100,000.00",
      "Pending",
    ],
    [
      "PO67890",
      "Sherwin-Williams",
      "Jane Smith",
      "25 Jul 2024",
      "150,000.00",
      "Completed",
    ],
    [
      "PO54321",
      "Asian Paints",
      "Bob Johnson",
      "20 Jul 2024",
      "200,000.00",
      "Cancelled",
    ],
    [
      "PO11111",
      "Nippon Paint",
      "Alice White",
      "15 Jul 2024",
      "250,000.00",
      "Pending",
    ],
    [
      "PO22222",
      "PPG Industries",
      "Tom Brown",
      "10 Jul 2024",
      "180,000.00",
      "Shipped",
    ],
  ]);

  const [columns, setColumns] = useState([
    {
      name: "PO Number",
      label: "PO Number",
    },
    {
      name: "Supplier Name",
      label: "Supplier Name",
    },
    {
      name: "Contact Person",
      label: "Contact Person",
    },
    {
      name: "Order Date",
      label: "Order Date",
    },
    {
      name: "Total Amount",
      label: "Total Amount (LKR)",
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
              const selectedOrder = datatableData[index];
              const orderrData = {
                id: selectedOrder[0],
                supplierName: selectedOrder[1],
                contactPerson: selectedOrder[2],
                orderDate: selectedOrder[3],
                totalAmount: selectedOrder[4],
                status: selectedOrder[5],
              };
              navigate(`/purchase-order/view/${orderrData.id}`, {
                state: orderrData,
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
          routeSegments={[{ name: "Purchase order" }, { name: "Summary" }]}
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
      label="Purchase Order"
      title="Create new purchase order"
      onClick={handleCreatePurchaseOrder}
    ></TButton>
        </Box>
        <SimpleCard
          sx={{ width: "100%", top: "-3em" }}
          title={"Search purchase order"}
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
              <MenuItem value={"PurchaseOrder"}>
                Search by PurchaseOrder code
              </MenuItem>
              <MenuItem value={"name"}>Search by supplier name</MenuItem>
              <MenuItem value={"all"}>Search by all</MenuItem>
            </Select>
            <SearchBarDefault
              sx={{ width: "80%" }}
              value={searchText}
              setValue={setSearchText}
              placeholder={"Search purchase orders..."}
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
            title={"Purchase Orders"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>
      </Stack>

      <PopupFormDialog
        open={addPurchaseOrderOn}
        title="Create Purchase Order"
        submitButton="Create Purchase Order"
        titleIcon={<AddPurchaseOrderIcon />}
        fields={addPurchaseOrderFields}
        setOpen={setAddPurchaseOrderOn}
        reasonCloseOn={true}
        setValues={setNewPurchaseOrder}
      />
    </Container>
  );
}

export default PurchaseOrderList;
