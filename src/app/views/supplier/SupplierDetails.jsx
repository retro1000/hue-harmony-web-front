import React, { useState, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";

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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  columns,
  datatableData,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Delete, Edit, Group } from "@mui/icons-material";

import { Breadcrumb, SimpleCard, MuiTable } from "app/components";
import { suppliers } from "./SupplierList";

import { useNotistack } from "app/hooks/useNotistack";
import { tableCellClasses } from "@mui/material";

import ViewIcon from "@mui/icons-material/RemoveRedEye";

function SupplierDetails() {

  const { id } = useParams();

  const location = useLocation();

  const [datatableData, setDataTableData] = useState([
    ['D#45er', 'Dulux', '11000.00', '13 Jun 2024', 'User1',  'Available'],
    ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Inactive'],
    ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Pending'],
    ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Blocked'],
    ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Sold'],
    ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
    ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
    ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
    ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
    ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
    ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
    ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
    ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
    ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
    ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
    ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
    ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
  ]);

  const [columns, setColumns] = useState([
    {
      name:'Barcode',
      label: 'Barcode',
    },
    {
      name:'Supplier Name',
      label: 'Supplier Name',
    },
    {
      name:'Grand Total',
      label: 'Grand Total (LKR)',
    },
    {
      name:'Created On',
      label: 'Created On',
    },
    {
      name:'Created By',
      label: 'Created By',
    },
    {
      name:'Status',
      label: 'Status',
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
          buttonsConfig: [
            {
              type: 'icon',
              icon: ViewIcon,
              color: 'primary',
              size: 'small',
              onClick: (index) => {
                console.log('Edit button clicked for row', index);
              },
            },
          ]
      },
    },
  ]);

  const { name, grandTotal, createdOn, createdBy, status } =
    location.state || {};
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const ReleaseButton = styled(Button)({
    backgroundColor: "#28a745",
    color: "#fff",
    borderRadius: "20px",
    padding: "8px 16px",
    textTransform: "none",
  });

  const data = [
    {
      id: id,
      name: name,
      grandTotal: grandTotal,
      createdOn: createdOn,
      createdBy: createdBy,
      status: status,
      Industry: "",
      DefaultCurrency: "LKR",
      CityTown: "",
      Country: "Sri Lanka",
      NationalID: "",
      Birthday: "",
      Status: "PENDING",
      Createdon: "",
    },
  ];
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledBadge = styled(Box)(({ theme }) => ({
    backgroundColor: "#f44336", // Red color
    color: "#fff",
    borderRadius: "12px",
    padding: "4px 12px",
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "bold",
  }));

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Suppliers", path: "/supplier/list" },
            { name: id },
          ]}
        />
      </Box>
      <Stack
        textAlign="center"
        position="relative"
        // alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
      >
        <SimpleCard
          sx={{ width: "100%" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack>
            <Typography variant="h6" gutterBottom>
              Click below to Update Status
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              position="relative"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button variant="contained" color="error">
                Cancel
              </Button>
              <Button variant="contained" color="success">
                Approve
              </Button>
            </Stack>
          </Stack>
        </SimpleCard>
        <Stack>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignContent="flex-start"
            alignItems="flex-start"
            mt={2}
            gap={2}
          >
            <ReleaseButton
              variant="contained"
              startIcon={<Edit />}
              sx={{
                backgroundColor: "warning",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
            >
              Edit
            </ReleaseButton>
            <ReleaseButton
              variant="contained"
              startIcon={<Edit />}
              sx={{
                backgroundColor: "#03DAC6",
                "&:hover": {
                  backgroundColor: "#478CCF",
                },
              }}
            >
              Action
            </ReleaseButton>
          </Box>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <SimpleCard
            sx={{ width: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            {data.map((customer) => (
              <Typography variant="h5" gutterBottom>
                {customer.name}
              </Typography>
            ))}
          </SimpleCard>
        </Stack>
        <Stack>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {data.map((customer) => (
                  <Fragment key={customer.id}>
                    <StyledTableRow>
                      <StyledTableCell align="center">Code</StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.id}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.name}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        Grand Total
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.grandTotal}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        Created On
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.createdOn}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">Industry</StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.Industry}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        Default Curreny
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.DefaultCurrency}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        City & Town
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.CityTown}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">Country</StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.Country}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        National Identification
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.NationalID}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">BirthDay</StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.Birthday}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledBadge>{customer.status}</StyledBadge>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        Creted On
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {customer.Createdon}
                      </StyledTableCell>
                    </StyledTableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          position="relative"
          alignItems="center"
          justifyContent="center"
        >
          <Stack>
            <SimpleCard
              sx={{ width: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
              {data.map((customer) => (
                <Typography variant="h5" gutterBottom>
                  {customer.name}
                </Typography>
              ))}
            </SimpleCard>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                  {data.map((customer) => (
                    <Fragment key={customer.id}>
                      <StyledTableRow>
                        <StyledTableCell align="center">Code</StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.id}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.name}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Grand Total
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.grandTotal}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Created On
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.createdOn}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Industry
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.Industry}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Default Curreny
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.DefaultCurrency}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          City & Town
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.CityTown}
                        </StyledTableCell>
                      </StyledTableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <Stack>
            <SimpleCard
              sx={{ width: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
              {data.map((customer) => (
                <Typography variant="h5" gutterBottom>
                  {customer.name}
                </Typography>
              ))}
            </SimpleCard>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                  {data.map((customer) => (
                    <Fragment key={customer.id}>
                      <StyledTableRow>
                        <StyledTableCell align="center">Code</StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.id}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.name}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Grand Total
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.grandTotal}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Created On
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.createdOn}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Industry
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.Industry}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          Default Curreny
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.DefaultCurrency}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          City & Town
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {customer.CityTown}
                        </StyledTableCell>
                      </StyledTableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>

        <SimpleCard title='Supplier GRN' sx={{ width: "100%" }}>
          <MuiTable
            print={true}
            download={true}
            // title={"Good recieved notes"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>

        <SimpleCard title='Supplier Invoices' sx={{ width: "100%" }}>
          <MuiTable
            print={true}
            download={true}
            // title={"Good recieved notes"}
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

export default SupplierDetails;
