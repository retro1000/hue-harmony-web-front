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

  const [columns, setColumns] = useState([
    "#ID",
    "Updated On",
    "Status Change",
    "Remarks",
    "Changed By",
  ]);

  const dataUp = [
    {
      PO: "1",
      supplier: "Cash",
      createdon: "14/07/2024",
      createdby: "14/07/2024",
      store: "MAIN STORE",
      creditperiod: "30",
      purchaseordertype: "LOCAL",
      payableaccount: "ACCOUNT Payable",
      status: "Pending",
    },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payment", path: "/Payment/Purchase Order" },
            { name: "BulkPayment" },
          ]}
        />
      </Box>

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
                On Hold
              </Button>
              <Button variant="contained" color="info">
                Approve
              </Button>
              <Button variant="contained" color="info">
                Place Order
              </Button>
              <Button variant="contained" color="success">
                Complete
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
                  {/* <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="body1">Account:</Typography>
                    <Typography variant="body1">Payment Method:</Typography>
                    <Typography variant="body1">Effective Date:</Typography>
                    <Typography variant="body1">Ref:</Typography>
                    <Typography variant="body1">Cheque No:</Typography>
                    <Typography variant="body1">Remarks:</Typography>
                  </Stack> */}
                </Box>
                {dataUp.map((data) => (
                  <Box>
                    {/* <Stack
                      direction="column"
                      spacing={1}
                      alignItems="flex-start"
                    >
                      <Typography variant="body1">{data.Account}</Typography>
                      <Typography variant="body1">
                        {data.paymentMethod}
                      </Typography>
                      <Typography variant="body1">
                        {data.effectiveDate}
                      </Typography>
                      <Typography variant="body1">{data.ref}</Typography>
                      <Typography variant="body1">{data.chequeNo}</Typography>
                      <Typography variant="body1">{data.remarks}</Typography>
                    </Stack> */}
                  </Box>
                ))}
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="body1">PO #:</Typography>
                    <Typography variant="body1">Supplier:</Typography>
                    <Typography variant="body1">Created On:</Typography>
                    <Typography variant="body1">Created by:</Typography>
                    <Typography variant="body1">Store:</Typography>
                    <Typography variant="body1">Credit Period:</Typography>
                    <Typography variant="body1">
                      Purchase Order Type:
                    </Typography>

                    <Typography variant="body1">Payable Account:</Typography>
                    <Typography variant="body1">Status:</Typography>
                  </Stack>
                </Box>
                {dataUp.map((data) => (
                  <Box>
                    <Stack direction="column" spacing={1} alignItems="flex-end">
                      <Typography variant="body1">{data.PO}</Typography>
                      <Typography variant="body1">{data.supplier}</Typography>
                      <Typography variant="body1">{data.createdon}</Typography>
                      <Typography variant="body1">{data.createdby}</Typography>
                      <Typography variant="body1">{data.store}</Typography>
                      <Typography variant="body1">
                        {data.creditperiod}
                      </Typography>
                      <Typography variant="body1">
                        {data.purchaseordertype}
                      </Typography>
                      <Typography variant="body1">
                        {data.payableaccount}
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
        <Paper
          elevation={3}
          style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
        >
          <Stack>
            <Typography variant="h6" textAlign="left">
              Advance Payments Summary for this Purchase Order
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
        <Paper
          elevation={3}
          style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
        >
          <Stack>
            <Typography variant="h6" textAlign="left">
              GRN Summary for this Purchase Order
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
