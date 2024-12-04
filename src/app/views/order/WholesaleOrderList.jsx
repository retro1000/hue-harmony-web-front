import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import {
  Stack,
  Box,
  styled,
  IconButton,
} from "@mui/material";
import {
  PopupFormDialog,
  Breadcrumb,
  MuiTable,
  TButton,
} from "app/components";
import { useNotistack } from "app/hooks/useNotistack";
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

function WholesaleOrderList() {
  const navigate = useNavigate();
  const { api, apiNonAuth } = useAxios();
  const [data, setData] = useState([]);  // Added state for data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiNonAuth.get("wholeSale/all");
      const transformedData = response.data
        .filter((order) => order.orderId != null)  // Ensure we don't process null orders
        .map((order) => ({
          orderId: order.orderId,
          customer: order.customer,
          orderDate: order.orderDate,
          shipmentDate: order.shipmentDate,
          shipmentVariationStatus: order.shipmentVariationStatus,
          totalAmount: order.totalAmount,
          discountAmount: order.discountAmount,
          billingAddress: order.billingAddress,
          paymentMethod: order.paymentMethod,
          orderNotes: order.orderNotes,
          orderItems: order.orderItems,
          actions: (
            <IconButton onClick={() => handleViewOrder(order)}>
              <ViewIcon />
            </IconButton>
          ),
        }));
      setData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewOrder = (order) => {
    // Logic to handle viewing an order
    console.log(order);
    navigate(`/order/view/${order.orderId}`);
  };

  const orderForm = () => {
    navigate("/order/crete-order"); // Fixed typo: "crete-order" to "create-order"
  };

  const columns = [
    { label: "Order ID", name: "orderId" },
    { label: "Customer", name: "customer" },
    { label: "Order Date", name: "orderDate" },
   // { label: "Shipment Date", name: "shipmentDate" },
  //  { label: "Shipment Status", name: "shipmentVariationStatus" },
   // { label: "Total Amount", name: "totalAmount" },
  //  { label: "Discount Amount", name: "discountAmount" },
    { label: "Billing Address", name: "billingAddress" },
 //   { label: "Payment Method", name: "paymentMethod" },
    { label: "Order Notes", name: "orderNotes" },
    {
      label: "Actions",
      name: "actions",
      render: (row) => (
        <IconButton onClick={() => handleViewOrder(row)}>
          <ViewIcon />
        </IconButton>
      ),
    },
  ];

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
          />
        </Box>
        <MuiTable title="Sales Orders" columns={columns} data={data} />
      </Stack>
    </Container>
  );
}

export default WholesaleOrderList;
