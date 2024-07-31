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

function InvoiceDetails() {
  const data = [
    {
      id: 1,
      product: "P553",
      totalcost: "Demo Product - 553",
      batch: "GRN-22080001",
      unitprice: "MAIN STORE",
      qty: "31 Nos",
      freeqty: "10 Nos",
      grosstotal: "10 Nos",
      discount: "10 Nos",
      nettotal: "10 Nos",
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
      invoice: "2",
      Invoiceddate: "Cash",
      creditdays: "14/07/2024",
      gpratio: "14/07/2024",
      generatedby: "MAIN STORE",
      salesrep: "Akila Kushantha",
      store: "MAIN STORE",
      currency: "LKR",
      currencyrate: "1.00",
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
                Reserve
              </Button>
              <Button variant="contained" color="info">
                Pack
              </Button>
              <Button variant="contained" color="primary">
                On Delivery
              </Button>
              <Button variant="contained" color="success">
                Delivered
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
              elevation={2}
              style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
            >
              <Typography variant="h5" textAlign="right">
                PO#: 11
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                textAlign="left"
                mt={2}
              >
                <Box>
                  <Typography variant="h6">CS0219</Typography>
                  <Typography variant="h6">Mr. Akila Kushantha</Typography>

                  <Typography variant="body1">Route:HOF head Office</Typography>
                </Box>
                {dataUp.map((data) => (
                  <Box></Box>
                ))}
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="body1">Invoice #:</Typography>
                    <Typography variant="body1">Invoiced Date:</Typography>
                    <Typography variant="body1">Credit Days:</Typography>
                    <Typography variant="body1">GP Ratio:</Typography>
                    <Typography variant="body1">Generated By:</Typography>
                    <Typography variant="body1">Sales Rep:</Typography>
                    <Typography variant="body1">Store:</Typography>
                    <Typography variant="body1">Agent:</Typography>
                    <Typography variant="body1">Currency:</Typography>
                    <Typography variant="body1">Curreny Rate:</Typography>
                    <Typography variant="body1">Status:</Typography>
                  </Stack>
                </Box>
                {dataUp.map((data) => (
                  <Box>
                    <Stack direction="column" spacing={1} alignItems="flex-end">
                      <Typography variant="body1">{data.invoice}</Typography>
                      <Typography variant="body1">
                        {data.Invoiceddate}
                      </Typography>
                      <Typography variant="body1">{data.creditdays}</Typography>
                      <Typography variant="body1">{data.gpratio}</Typography>
                      <Typography variant="body1">
                        {data.generatedby}
                      </Typography>
                      <Typography variant="body1">{data.salesrep}</Typography>

                      <Typography variant="body1">{data.store}</Typography>

                      <Typography variant="body1">{data.agent}</Typography>

                      <Typography variant="body1">{data.currency}</Typography>

                      <Typography variant="body1">
                        {data.currencyrate}
                      </Typography>

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
                    <CenteredTableCell>#</CenteredTableCell>
                    <CenteredTableCell>Product</CenteredTableCell>
                    <CenteredTableCell>Total Cost</CenteredTableCell>
                    <CenteredTableCell>Batch</CenteredTableCell>
                    <CenteredTableCell>Unit Price</CenteredTableCell>
                    <CenteredTableCell>Quantity</CenteredTableCell>
                    <CenteredTableCell>Free Quantity</CenteredTableCell>
                    <CenteredTableCell>Gross Total</CenteredTableCell>
                    <CenteredTableCell>Discount</CenteredTableCell>
                    <CenteredTableCell>NetTotal</CenteredTableCell>
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
                      <CenteredTableCell>{row.product}</CenteredTableCell>
                      <CenteredTableCell>{row.totalcost}</CenteredTableCell>
                      <CenteredTableCell>{row.batch}</CenteredTableCell>
                      <CenteredTableCell>{row.unitprice}</CenteredTableCell>
                      <CenteredTableCell>{row.qty}</CenteredTableCell>
                      <CenteredTableCell>{row.freeqty}</CenteredTableCell>
                      <CenteredTableCell>{row.grosstotal}</CenteredTableCell>
                      <CenteredTableCell>{row.discount}</CenteredTableCell>
                      <CenteredTableCell>{row.nettotal}</CenteredTableCell>
                      <CenteredTableCell style={{ qty: "20px" }}>
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
              <Box
                display="flex"
                justifyContent="space-between"
                textAlign="left"
                mt={2}
              >
                <Box>
                  <Typography variant="h5">Invoice Message:</Typography>
                  <Typography variant="body1">
                    LOREM IMfsdjjnfhsdjfhsdkf sdjfnsdkjf sdfjhnsdkjfhsf
                  </Typography>
                </Box>
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
      </Stack>
    </Container>
  );
}

export default InvoiceDetails;
