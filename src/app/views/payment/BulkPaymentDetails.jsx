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

function BulkPaymentDetails() {
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
      Account: "Pet Shop_Cash",
      paymentMethod: "Cash",
      effectiveDate: "14/07/2024",
      ref: "",
      chequeNo: "",
      remarks: "",
    },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payment", path: "/Payment/BulkPayment" },
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
                Cancel
              </Button>
              <Button variant="contained" color="secondary">
                Reject
              </Button>
              <Button variant="contained" color="info">
                Pending
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
                Bulk Payment#: 119
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box>
                  {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        {dataUp.map((row) => (
                          <TableRow>
                            <TableCell align="left">Account</TableCell>
                            <TableCell align="right">{row.Account}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer> */}
                  <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="body1">Account:</Typography>
                    <Typography variant="body1">Payment Method:</Typography>
                    <Typography variant="body1">Effective Date:</Typography>
                    <Typography variant="body1">Ref:</Typography>
                    <Typography variant="body1">Cheque No:</Typography>
                    <Typography variant="body1">Remarks:</Typography>
                  </Stack>
                </Box>
                {dataUp.map((data) => (
                  <Box>
                    <Stack
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
                    </Stack>
                  </Box>
                ))}
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="body1">Reservation #:</Typography>
                    <Typography variant="body1">Created On:</Typography>
                    <Typography variant="body1">Created by:</Typography>
                    <Typography variant="body1">Status:</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-end">
                    <Typography variant="body1">119</Typography>
                    <Typography variant="body1">14/07/2024 01:10 PM</Typography>
                    <Typography variant="body1">Codevus Bot</Typography>
                    <Typography variant="body1">
                      <span style={{ color: "orange" }}>Pending</span>
                    </Typography>
                  </Stack>
                </Box>
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
                    <Typography variant="h5">Total Amount</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="column" spacing={1} alignItems="flex-end">
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

export default BulkPaymentDetails;
