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

function Reservation() {
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

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Inventory", path: "/Inventory/Reservation" },
            { name: "Reservation" },
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
              <Button variant="contained" color="success">
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
          <Stack spacing={3} alignItems="center">
            <Paper
              elevation={4}
              style={{ padding: "16px", marginBottom: "16px", width: "100%" }}
            >
              <Typography variant="h5" textAlign="right">
                Reservation Form#: 119
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
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
                    <CenteredTableCell style={{ width: "100px" }}>
                      #
                    </CenteredTableCell>
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
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            startIcon={<Edit />}
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              minWidth: "unset",
                              padding: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              minWidth: "unset",
                              padding: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                          <ReleaseButton variant="contained">
                            Release
                          </ReleaseButton>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Description />}
                            sx={{
                              backgroundColor: "#03DAC6",
                              color: "#fff",
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              minWidth: "unset",
                              padding: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              "&:hover": {
                                backgroundColor: "#018786",
                              },
                            }}
                          />
                        </Stack>
                      </CenteredTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

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
                />
              </Stack>
            </Paper>
          </Stack>
        </SimpleCard>
      </Stack>
    </Container>
  );
}

export default Reservation;
