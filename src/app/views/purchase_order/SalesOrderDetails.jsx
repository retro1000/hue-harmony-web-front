import { useState } from "react";
import {
  Stack,
  Box,
  styled,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Description, Edit } from "@mui/icons-material";
import { Breadcrumb, SimpleCard, MuiTable } from "app/components";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CenteredTableCell = styled(TableCell)({
  textAlign: "center",
});

const ReleaseButton = styled(Button)({
  backgroundColor: "#28a745",
  color: "#fff",
  borderRadius: "20px",
  padding: "8px 16px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#218838",
  },
});

function SalesOrderDetails() {
  const data = [
    {
      id: 1,
      code: "P553",
      name: "Demo Product - 553",
      grnCode: "GRN-22080001",
      store: "MAIN STORE",
      oldQty: "31 Nos",
      newQty: "10 Nos",
      costDiff: "-9,975.00",
    },
  ];

  const [datatableData, setDataTableData] = useState([
    ["Joe James", "Example Inc.", "Yonkers", "NY", "Akila"],
  ]);

  const [
    datatableDatacustomeroutstanding,
    setDataTableDatacustomeroutstanding,
  ] = useState([
    [
      "3,249,103.84",
      "3,249,103.84",
      "3,249,103.84",
      "3,249,103.84",
      "3,249,103.84",
      "3,249,103.84",
    ],
  ]);

  const [columns, setColumns] = useState([
    "#ID",
    "Updated On",
    "Status Change",
    "Remarks",
    "Changed By",
  ]);

  const [customeroutstandcolumns, setCustomerOutstandingColumns] = useState([
    "CURRENT (0-30 DAYS)",
    "OVERDUE(31-60 DAYS)",
    "OVERDUE(61-90)",
    "OVERDUE(91-120)",
    "PASTDUE(OVER 120 DAYS)",
    "TOTAL",
  ]);

  const dataUp = [
    {
      SO: "1",
      store: "Cash",
      gpratio: "14/07/2024",
      createdon: "14/07/2024",
      createdby: "MAIN STORE",
      status: "Pending",
    },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Purchase Order", path: "/Payment/Sales Order" },
            { name: "Sales Order" },
          ]}
        />
      </Box>

      <Paper
        elevation={3}
        style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
      >
        <Stack>
          <Typography variant="h6" textAlign="left">
            Customer Outstanding
          </Typography>
          <MuiTable
            columns={customeroutstandcolumns}
            dataTableData={datatableDatacustomeroutstanding}
            alignItems="center"
            justifyContent="center"
            search={false}
            download={false}
            print={false}
            filterType={false}
            selectableRows={false}
            title={false}
          />
        </Stack>
      </Paper>

      <Stack
        textAlign="center"
        position="relative"
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <SimpleCard
          sx={{ width: "100%" }}
          alignItems="center"
          justifyContent="center"
        >
          <Stack>
            <Typography variant="h6" gutterBottom>
              Click below to Update Status
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <Button variant="contained" color="error">
                Reject
              </Button>
              <Button variant="contained" color="secondary">
                Check Availability
              </Button>
              <Button variant="contained" color="info">
                Approve
              </Button>
            </Stack>
          </Stack>
        </SimpleCard>

        <SimpleCard
          sx={{ width: "100%" }}
          alignItems="center"
          justifyContent="center"
        >
          <Stack spacing={2} alignItems="center">
            <Paper
              elevation={3}
              style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
            >
              <Typography variant="h5" textAlign="right">
                PO#: 11
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box>
                  <Typography variant="h6">C</Typography>
                  <Typography variant="body1">CS0001</Typography>
                </Box>
                {dataUp.map((data) => (
                  <Box></Box>
                ))}
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="body1">SO #:</Typography>
                    <Typography variant="body1">Store:</Typography>
                    <Typography variant="body1">GP Ratio:</Typography>
                    <Typography variant="body1">Created On:</Typography>
                    <Typography variant="body1">Created by:</Typography>
                    <Typography variant="body1">Status:</Typography>
                  </Stack>
                </Box>
                {dataUp.map((data) => (
                  <Box>
                    <Stack direction="column" spacing={1} alignItems="flex-end">
                      <Typography variant="body1">{data.So}</Typography>
                      <Typography variant="body1">{data.store}</Typography>
                      <Typography variant="body1">{data.gpratio}</Typography>
                      <Typography variant="body1">{data.createdon}</Typography>
                      <Typography variant="body1">{data.createdby}</Typography>
                      <Typography variant="body1">
                        <span style={{ color: "orange" }}>{data.status}</span>
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Paper>

            <TableContainer sx={{ width: "100%" }} elevation={1}>
              <Table>
                <TableHead>
                  <TableRow>
                    <CenteredTableCell>Bill#</CenteredTableCell>
                    <CenteredTableCell>Product</CenteredTableCell>
                    <CenteredTableCell>Store Name</CenteredTableCell>
                    <CenteredTableCell>Issued Qty</CenteredTableCell>
                    <CenteredTableCell>Status</CenteredTableCell>
                    <CenteredTableCell style={{ maxWidth: "20px" }}>
                      Actions
                    </CenteredTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id} style={{ height: "100px" }}>
                      <CenteredTableCell style={{ width: "100px" }}>
                        {row.id}
                      </CenteredTableCell>
                      <CenteredTableCell>{row.code}</CenteredTableCell>
                      <CenteredTableCell>{row.name}</CenteredTableCell>
                      <CenteredTableCell>{row.grnCode}</CenteredTableCell>
                      <CenteredTableCell>{row.store}</CenteredTableCell>
                      <CenteredTableCell style={{ maxWidth: "20px" }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <ReleaseButton
                            variant="contained"
                            startIcon={<Edit />}
                            sx={{
                              backgroundColor: "warning",
                            }}
                          >
                            Edit
                          </ReleaseButton>
                        </Stack>
                      </CenteredTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack
              elevation={4}
              style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
            >
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="h5">Gross Total:</Typography>
                    <Typography variant="h5">DISCOUNT:</Typography>
                    <Typography variant="body2">VAT Payable</Typography>
                    <Typography variant="body2">SSCL</Typography>
                    <Typography variant="h5">GRAND TOTAL</Typography>
                    <Typography variant="h5">TOTAL PAID</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-end">
                    <Typography variant="h5">123,123.00 LKR</Typography>
                    <Typography variant="h5">123,123.00 LKR</Typography>
                    <Typography variant="body2">222.00 LKR</Typography>
                    <Typography variant="body2">222.00 LKR</Typography>
                    <Typography variant="h5">
                      <span style={{ color: "brown" }}>1,475.00 LKR</span>
                    </Typography>
                    <Typography variant="h5">
                      <span style={{ color: "red" }}>1,475.00 LKR</span>
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </SimpleCard>
        <Paper
          elevation={3}
          style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
        >
          <Stack>
            <Typography variant="h6" textAlign="left">
              WorkFlow Logs
            </Typography>
            <MuiTable
              columns={columns}
              dataTableData={datatableData}
              alignItems="center"
              justifyContent="center"
              search={false}
              download={false}
              print={false}
              filterType={false}
              selectableRows={false}
              title={false}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default SalesOrderDetails;
