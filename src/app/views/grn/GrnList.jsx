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
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  PopupFormDialog,
  TButton,
  SearchBarDefault,
  Breadcrumb,
  SimpleCard,
  MuiTable,
  NumberFormatField,
  MuiTable2,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/RemoveRedEye'
import AddIcon from '@mui/icons-material/AddBox'
import AddGrnIcon from '@mui/icons-material/NoteAdd'
import useAuth from "app/hooks/useAuth";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function GrnList() {
  const [selectedAction, setSelectedAction] = useState("barcode");

  const {role} = useAuth()

  const navigate = useNavigate()

  const [searchText, setSearchText] = useState(undefined);

  const [addGrnOn, setAddGrnOn] = useState(false);

  const [newGrn, setNewGrn] = useState({});

  const popupListColumns = [
    {
      name: "Barcode",
      options: {
        customHeadRender: (columnMeta) => (
          <th style={{ width: "13%", borderBottom: "0.1em solid silver" }}>
            {columnMeta.name}
          </th>
        ),
        // customBodyRender: (value, tableMeta) => (
        //   <th style={{ width: '13%'}}>
        //     {value}
        //   </th>
        // )
      },
    },
    {
      name: "Name",
      options: {
        customHeadRender: (columnMeta) => (
          <th style={{ width: "15%", borderBottom: "0.1em solid silver" }}>
            {columnMeta.name}
          </th>
        ),
      },
    },
    {
      name: "Ordered Quantity",
      options: {
        customHeadRender: (columnMeta) => (
          <th style={{ width: "5%", borderBottom: "0.1em solid silver" }}>
            {columnMeta.name}
          </th>
        ),
      },
    },
    {
      name: "Received Quantity",
      options: {
        customHeadRender: (columnMeta) => (
          <th style={{ width: "12%", borderBottom: "0.1em solid silver" }}>
            {columnMeta.name}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => (
          <NumberFormatField
            inputProps={{
              // id:`${field.id}-input-${f_index++}`,
              type: "number",
              inputProps: {
                "aria-label": `-input-`,
                step: "any",
                inputMode: "decimal",
              },
            }}
            size={"small"}
            allowNegative={false}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
        ),
      },
    },
    {
      name: "Remark",
      options: {
        customHeadRender: (columnMeta) => (
          <th style={{ width: "30%", borderBottom: "0.1em solid silver" }}>
            {columnMeta.name}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => (
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
        ),
      },
    },
    {
      name: "Item Status",
      options: {
        customHeadRender: (columnMeta) => (
          <th style={{ width: "15%", borderBottom: "0.1em solid silver" }}>
            {columnMeta.name}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => (
          <Select value={value} size="small" fullWidth>
            <MenuItem value="Received">Received</MenuItem>
            <MenuItem value="Damaged">Damaged</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </Select>
        ),
      },
    },
  ];

  const popupListData = [
    ["A123", "Wall Paint Blue", 50, 45, "", "Received"],
    ["B456", "Ceiling Paint White", 30, 30, "", "Received"],
    ["C789", "Primer Red", 20, 18, "", "Damaged"],
  ];

  const addGrnFields = [
    {
      title: "GRN Details",
      inputs: [
        {
          key: "received_date",
          required: true,
          id: "received_date",
          name: "receivedDate",
          label: "Received Date",
          type: "date",
          value: newGrn.receivedDate || null,
          setValue: (val) => setNewGrn({ ...newGrn, receivedDate: val }),
        },
        {
          key: "supplier_select",
          id: "supplier_select",
          name: "supplier",
          label: "Supplier",
          required: true,
          type: "select",
          value: newGrn.supplier || 1,
          setValue: (val) => setNewGrn({ ...newGrn, supplier: val }),
          break: false,
          options: [
            { label: "Supp1", value: 1 },
            { label: "supp2", value: 2 },
            { label: "supp3", value: 3 },
          ],
        },
        {
          key: "order_text",
          required: true,
          id: "order_text",
          name: "purchaseOrder",
          label: "Purchase Order",
          type: "text",
          placeholder: "Enter the purchase order number",
          value: newGrn.purchaseOrder || "",
          setValue: (val) => setNewGrn({ ...newGrn, purchaseOrder: val }),
        },
        {
          key: "delivery_text",
          required: true,
          id: "delivery_text",
          name: "deliveryNote",
          label: "Delivery Note",
          type: "text",
          placeholder: "Enter the delivery note number",
          value: newGrn.deliveryNote || "",
          setValue: (val) => setNewGrn({ ...newGrn, deliveryNote: val }),
        },
      ],
    },
    {
      title: "Goods Details",
      inputs: [
        {
          key: "goods_list",
          id: "goods_list",
          name: "goods",
          label: "Receive Goods",
          required: true,
          type: "list",
          value: newGrn.goods || popupListData,
          setValue: (val) => setNewGrn({ ...newGrn, storeLocation: val }),
          break: false,
          col: popupListColumns,
        },
      ],
    },
    {
      title: "Inspection Details",
      inputs: [
        {
          key: "inspected_by_select",
          id: "inspected_by_select",
          name: "inspectedBy",
          label: "Inspected By",
          required: true,
          type: "select",
          value: newGrn.inspectedBy || 1,
          setValue: (val) => setNewGrn({ ...newGrn, inspectedBy: val }),
          break: false,
          options: [
            { label: "user1", value: 1 },
            { label: "user2", value: 2 },
          ],
        },
        {
          key: "inspection_date",
          required: true,
          id: "inspection_date",
          name: "inspectionDate",
          label: "Inspection Date",
          type: "date",
          value: newGrn.inspectionDate || null,
          setValue: (val) => setNewGrn({ ...newGrn, inspectionDate: val }),
        },
        {
          key: "inspection_status_select",
          id: "inspection_status_select",
          name: "inspectionStatus",
          label: "Inspection Status",
          required: true,
          type: "select",
          value: newGrn.inspectionStatus || "Approved",
          setValue: (val) => setNewGrn({ ...newGrn, inspectionStatus: val }),
          break: false,
          options: [
            { label: "Approved", value: "Approved" },
            { label: "Rejected", value: "Rejected" },
          ],
        },
        {
          key: "inspection_text",
          required: false,
          id: "inspection_text",
          name: "inspectionRemark",
          label: "Inspection Remark",
          type: "text",
          rows: 6,
          placeholder: "Enter inspection remark",
          value: newGrn.inspectionRemark || "",
          setValue: (val) => setNewGrn({ ...newGrn, inspectionRemark: val }),
          sx: { width: "100%", maxWidth: "600px" },
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
          break: true,
          type: "file",
          value: newGrn.image || "",
          setValue: (val) => setNewGrn({ ...newGrn, image: val }),
        },
        {
          key: "note_text",
          required: false,
          id: "note_text",
          name: "note",
          label: "Additional Note",
          type: "text",
          rows: 6,
          placeholder: "Enter additional note",
          value: newGrn.note || "",
          setValue: (val) => setNewGrn({ ...newGrn, note: val }),
          sx: { width: "100%", maxWidth: "600px" },
        },
      ],
    },
  ];

  const searchResult = [
    ["BAR123", "Acrylic Paint", "Red", "5 Ltr", "1500.00", "20", "Available"],
    [
      "BAR456",
      "Oil-Based Paint",
      "Blue",
      "10 Ltr",
      "3000.00",
      "15",
      "Received",
    ],
    ["BAR789", "Spray Paint", "Green", "2 Ltr", "600.00", "30", "Damaged"],
    ["BAR012", "Primer", "White", "4 Ltr", "800.00", "10", "Expired"],
    ["BAR345", "Varnish", "Clear", "1 Ltr", "200.00", "25", "Lost"],
  ];

  const datatableData = [
    ["BAR123", "Acrylic Paint", "1500.00", "10 Jul 2024", "User1", "Available"],
    [
      "BAR456",
      "Oil-Based Paint",
      "3000.00",
      "11 Jul 2024",
      "User2",
      "Received",
    ],
    ["BAR789", "Spray Paint", "600.00", "12 Jul 2024", "User3", "Damaged"],
    ["BAR012", "Primer", "800.00", "13 Jul 2024", "User4", "Expired"],
    ["BAR345", "Varnish", "200.00", "14 Jul 2024", "User5", "Lost"],
    ["BAR678", "Gloss Paint", "500.00", "15 Jul 2024", "User6", "Available"],
    ["BAR910", "Matt Paint", "700.00", "16 Jul 2024", "User7", "Received"],
    ["BAR111", "Lacquer", "900.00", "17 Jul 2024", "User8", "Damaged"],
    ["BAR121", "Enamel", "1200.00", "18 Jul 2024", "User9", "Expired"],
    ["BAR131", "Latex Paint", "1500.00", "19 Jul 2024", "User10", "Lost"],
  ];

  const columns = [
    {
      name: "Barcode",
      label: "Barcode",
    },
    {
      name: "Product Name",
      label: "Product Name",
    },
    {
      name: "Price",
      label: "Price (LKR)",
    },
    {
      name: "Date Received",
      label: "Date Received",
    },
    {
      name: "Received By",
      label: "Received By",
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
              navigate(`/grn/view/${datatableData[index][0]}`)
            },
          },
        ],
      },
    },
  ];

  const search = () => {};

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Good recieved note" }, { name: "List" }]}
        />
      </Box>

          <Stack sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}} spacing={5}>
              <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{width: '100%'}}>
              {role==='BACKOFFICE'?<TButton 
                  startIcon={<AddIcon />} 
                  variant="contained" 
                  color="primary" 
                  label='GRN' 
                  title="Create new GRN"
                  fun={setAddGrnOn}
                ></TButton>:''}
              </Box>
              {/* <SimpleCard sx={{width: '100%', top: '-3em'}} title={'Search Good recieved notes'}>
                <Box display={'flex'} flexWrap={'wrap'} gap={'0.4em'} sx={{width: '100%'}}>
                  <Select sx={{width: '20%'}} value={selectedAction} size="small" onChange={(event)=>setSelectedAction(event.target.value)}>
                    <MenuItem value={'barcode'}>Search by grn barcode</MenuItem>
                    <MenuItem value={'name'}>Search by supplier name</MenuItem>
                    <MenuItem value={'all'}>Search by all</MenuItem>
                  </Select>
                  <SearchBarDefault sx={{width: '80%'}} value={searchText} setValue={setSearchText} placeholder={'Search Good recieved notes...'} search={search}></SearchBarDefault>
                </Box>
                {searchResult && searchResult.length>0 && <MuiTable search={false} print={false} download={false} columns={columns} dataTableData={searchResult} selectableRows={'none'} filterType={'text'}/>}
              </SimpleCard> */}
              <SimpleCard sx={{width: '100%'}}>
                <MuiTable2 print={true} download={true} title={'Good recieved notes'} columns={columns} dataTableData={datatableData} selectableRows={'none'} filterType={'text'}                rowsPerPage={true}
           serverSide={true}
          path={'grn'}
columnOrder={["grnId", "description", "supplier", "status"]}/>
              </SimpleCard>
          </Stack>

          {role==='BACKOFFICE'?<PopupFormDialog
                  open={addGrnOn}
                  title="Create GRN"
                  submitButton="Create GRN"
                  titleIcon={<AddGrnIcon />}
                  fields={addGrnFields}
                  setOpen={setAddGrnOn}
                  reasonCloseOn={true}
                  setValues={setNewGrn}
                  // popupSx="lg"
                />:''}
        </Container>
    );
}

export default GrnList;
