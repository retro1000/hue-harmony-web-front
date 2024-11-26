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

function Grn() {
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

  const [datatable1Data, setDataTableData1] = useState([
    ["1", "Example Inc.", "Yonkers", "NY", "270,000.00"],
  ]);
  const [datatable2Data, setDataTableData2] = useState([
    ["1", "Example Inc.", "Yonkers", "NY", "270,000.00"],
  ]);

  const [columnsTable1, setColumns1] = useState([
    "#ID",
    "Account",
    "Type",
    "Class Type",
    "Amount",
  ]);

  const [columnsTable2, setColumns2] = useState([
    "GLE",
    "Date",
    "Type",
    "Ref",
    "Entry Details",
    "Class",
  ]);

  return (
    <Container>
      <Stack spacing={3}>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Inventory", path: "/Inventory/Credit-Debit Note" },
              { name: "Credit-Debit Note" },
            ]}
          />
        </Box>
        <Paper
          elevation={5}
          style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
        >
          <Typography variant="h5" textAlign="right">
            Credit/Debit Note#: 119
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box>
              <Typography variant="body2">
                <b>Supplier-10</b>
              </Typography>
              <Typography variant="body1">Address - 10</Typography>
            </Box>
            <Box></Box>
            <Box>
              <Typography variant="body1">Type</Typography>
              <Typography variant="body1">Amount</Typography>
              <Typography variant="body1">Balance Amount</Typography>
              <Typography variant="body1">Account</Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <span style={{ color: "green" }}>Debit</span>
              </Typography>
              <Typography variant="body1">
                <span style={{ color: "green" }}>123,123.00</span>
              </Typography>
              <Typography variant="body1">
                <span style={{ color: "green" }}>0.00</span>
              </Typography>
              <Typography variant="body1">
                <span style={{ color: "green" }}>Pending</span>
              </Typography>
            </Box>
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
          <SimpleCard
            sx={{ width: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center">
              <Typography variant="h5">AMOUNT: 270,800.00</Typography>
            </Box>
            <Stack>
              <Typography variant="h6" textAlign="left">
                SCDN Entries
              </Typography>
              <MuiTable
                columns={columnsTable1}
                dataTableData={datatable1Data}
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
          </SimpleCard>
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
                  Cancel
                </Button>
                <Button variant="contained" color="success">
                  Approve
                </Button>
              </Stack>
            </Stack>
          </SimpleCard>
        </Stack>

        <Typography variant="h6" textAlign="left">
          Accounting Entries
        </Typography>
        <MuiTable
          columns={columnsTable2}
          dataTableData={datatable2Data}
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
    </Container>
  );
}

export default Grn;
