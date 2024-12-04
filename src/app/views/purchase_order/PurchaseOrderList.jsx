import { useState, useEffect } from "react";
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
  MuiTable2,
  CheckBoxGroup,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/AddBox";
import AddPurchaseOrderIcon from "@mui/icons-material/AddBox";
import { useAxios } from "app/hooks/useAxios";

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
  const { api } = useAxios();
  const { apiNonAuth } = useAxios();

  const navigate = useNavigate();

  const handleCreatePurchaseOrder = () => {
    navigate("/purchase-order/create");
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

  const [searchResult, setSearchResult] = useState([]);

  const [datatableData, setDatatableData] = useState([]);

  // useEffect(() => {
  //   const fetchPurchaseOrders = async () => {
  //     try {
  //       const response = await apiNonAuth.get("/purchase-orders/getPO");
  //       const data = response.data.map((order) => [
  //         order.po_number,
  //         order.supplier_name,
  //         order.contact_person,
  //         order.order_date,
  //         order.total_amount,
  //         order.status,
  //       ]);
  //       setDatatableData(data);
  //     } catch (error) {
  //       console.error("Error fetching purchase orders", error);
  //     }
  //   };

  //   fetchPurchaseOrders();
  // }, []);

  const [columns, setColumns] = useState([
    {
      name: "Purchase Order Id",
      label: "Purchase Order Id",
      options: {
        filter: false,
        // display: false
      }

    },
    {
      name: "Description",
      label: "Description",
      options: {
        filter: false
      }
    },
    // {
    //   name: "Brands",
    //   label: "Brands",
    //   options: {
    //     filter: true,
    //     filterType: "custom",
    //     filterOptions: {
    //       logic: (value, filters) => {
    //         // Custom logic to determine if a row is displayed
    //         return filters.length > 0 && !filters.includes(value);
    //       },
    //       display: (filterList, onChange, index, column) => (
    //         <div style={{ padding: '16px' }}>
    //           <CheckBoxGroup
    //               label="Brand"
    //             options={["Dulux", "Robbialac", "Nippon Paint", "Asian Paint", "Kansai Paint"]}
    //             selectedOptions={filterList[index] || []}
    //             onChange={(selected) => {
    //               filterList[index] = selected;
    //               onChange(filterList[index], index, column);
    //             }}
    //           />
    //         </div>
    //       ),
    //     },
    //     customFilterListRender: (value) => {
    //       // Render custom filter values in the filter chip
    //       if (value.length) {
    //         return `Brands: ${value.join(", ")}`;
    //       }
    //       return false;
    //     },
    //   },
    // },
    // {
    //   name: "Room Type",
    //   label: "Room Type",
    //   options: {
    //     filter: true,
    //     filterType: "custom",
    //     filterOptions: {
    //       logic: (value, filters) => {
    //         // Custom logic to determine if a row is displayed
    //         return filters.length > 0 && !filters.includes(value);
    //       },
    //       display: (filterList, onChange, index, column) => (
    //           <div style={{ padding: '16px' }}>
    //             <CheckBoxGroup
    //                 label="Room type"
    //                 options={["Bathroom", "Bedroom", "Childrens Room", "Kitchen", "Living Room", "Home Office", "Hallway", "Dining Room"]}
    //                 selectedOptions={filterList[index] || []}
    //                 onChange={(selected) => {
    //                   filterList[index] = selected;
    //                   onChange(filterList[index], index, column);
    //                 }}
    //             />
    //           </div>
    //       ),
    //     },
    //     customFilterListRender: (value) => {
    //       // Render custom filter values in the filter chip
    //       if (value.length) {
    //         return `Room type: ${value.join(", ")}`;
    //       }
    //       return false;
    //     },
    //   },
    // },
    // {
    //   name: "Finish",
    //   label: "Finish",
    //   options: {
    //     filter: true,
    //     filterType: "custom",
    //     filterOptions: {
    //       logic: (value, filters) => {
    //         // Custom logic to determine if a row is displayed
    //         return filters.length > 0 && !filters.includes(value);
    //       },
    //       display: (filterList, onChange, index, column) => (
    //           <div style={{ padding: '16px' }}>
    //             <CheckBoxGroup
    //                 label="Finish"
    //                 options={["Gloss", "Gloss Semi Gloss Matte", "High Gloss", "Low Sheen", "Matt", "Mid Sheen", "Semi Gloss"]}
    //                 selectedOptions={filterList[index] || []}
    //                 onChange={(selected) => {
    //                   filterList[index] = selected;
    //                   onChange(filterList[index], index, column);
    //                 }}
    //             />
    //           </div>
    //       ),
    //     },
    //     customFilterListRender: (value) => {
    //       // Render custom filter values in the filter chip
    //       if (value.length) {
    //         return `Finish: ${value.join(", ")}`;
    //       }
    //       return false;
    //     },
    //   },
    // },
    // {
    //   name: "Size",
    //   label: "Size (LTR)",
    //   options: {
    //     filter: true,
    //     filterType: "custom",
    //     filterOptions: {
    //       logic: (value, filters) => {
    //         // Custom logic to determine if a row is displayed
    //         return filters.length > 0 && !filters.includes(value);
    //       },
    //       display: (filterList, onChange, index, column) => (
    //           <div style={{ padding: '16px' }}>
    //             <CheckBoxGroup
    //                 label="Size"
    //                 options={["L 1", "L 5", "L 10", "L 20", "L 50"]}
    //                 selectedOptions={filterList[index] || []}
    //                 onChange={(selected) => {
    //                   filterList[index] = selected;
    //                   onChange(filterList[index], index, column);
    //                 }}
    //             />
    //           </div>
    //       ),
    //     },
    //     customFilterListRender: (value) => {
    //       // Render custom filter values in the filter chip
    //       if (value.length) {
    //         return `Size: ${value.join(", ")}`;
    //       }
    //       return false;
    //     },
    //   },
    // },
    {
      name: "Supplier",
      label: "Supplier",
      options: {
        filter: false
      }
    },
    // {
    //   name: "Stocks",
    //   label: "Stock",
    //   options: {
    //     filter: false
    //   }
    // },
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
                    options={["Approved", "Rejected", "Pending"]}
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
                  type: "icon",
                  icon: ViewIcon,
                  color: "primary",
                  size: "small",
                  onClick: (id, upadteDataTable, row={}) => {
                    const selectedOrder = row;
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
      // options: {
      //   buttonsConfig: [
      //     {
      //       title: "View item",
      //       type: "icon",
      //       icon: ViewIcon,
      //       color: "primary",
      //       size: "small",
      //       onClick: (id, upadteDataTable) => {
      //         navigate('/productDetails/'+id)
      //       },
      //     },
      //     {
      //       title: "Edit item",
      //       type: "icon",
      //       icon: EditIcon,
      //       color: "primary",
      //       size: "small",
      //       onClick: (id, upadteDataTable) => {
      //         navigate('/product/update/'+id)
      //       },
      //     },
      //     {
      //       title: "Remove item",
      //       type: "icon",
      //       icon: DeleteIcon,
      //       color: "error",
      //       size: "small",
      //       onClick: (id, upadteDataTable) => {
      //         // console.log(data)
      //         apiNonAuth.delete("product/delete/"+id)
      //           .then(response => {
      //             if(response.status===200){
      //               triggerNotification([{text: "Product deleted successfully.", variant: 'success'}])
      //               upadteDataTable(id);
      //             }
      //           })
      //           .catch(error => {

      //           })
      //       },
      //     },
      //   ],
      // },
    },
  ]);

  // const [columns, setColumns] = useState([
  //   {
  //     name: "PO Number",
  //     label: "PO ID",
  //   },
  //   {
  //     name: "Supplier Name",
  //     label: "Supplier Name",
  //   },
  //   {
  //     name: "Contact Person",
  //     label: "Suppier_ID",
  //   },
  //   {
  //     name: "Order Date",
  //     label: "Description",
  //   },
  //   // {
  //   //   name: "Total Amount",
  //   //   label: "Total Amount (LKR)",
  //   // },
  //   {
  //     name: "Status",
  //     label: "Status",
  //   },
  //   {
  //     name: "Actions",
  //     label: "Actions",
  //     options: {
  //       buttonsConfig: [
  //         {
  //           type: "icon",
  //           icon: ViewIcon,
  //           color: "primary",
  //           size: "small",
  //           onClick: (index) => {
  //             const selectedOrder = datatableData[index];
  //             const orderrData = {
  //               id: selectedOrder[0],
  //               supplierName: selectedOrder[1],
  //               contactPerson: selectedOrder[2],
  //               orderDate: selectedOrder[3],
  //               totalAmount: selectedOrder[4],
  //               status: selectedOrder[5],
  //             };
  //             navigate(`/purchase-order/view/${orderrData.id}`, {
  //               state: orderrData,
  //             });
  //           },
  //         },
  //       ],
  //     },
  //   },
  // ]);

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
            // onClick={handleCreatePurchaseOrder}
            fun={handleCreatePurchaseOrder}
          ></TButton>
        </Box>
        {/* <SimpleCard
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
        </SimpleCard> */}
        <SimpleCard sx={{ width: "100%" }}>
          <MuiTable2
            print={true}
            download={true}
            title={"Purchase Orders"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
            rowsPerPage={true}
            serverSide={true}
            path={'purchase-order'}
            columnOrder={["purchaseOrderId", "description", "supplier", "status"]}
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
