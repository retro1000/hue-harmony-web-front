import { useState } from "react";

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
import { Delete, Edit } from "@mui/icons-material";

import { Breadcrumb, SimpleCard, MuiTable } from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function StockAdjustment() {
  // const [datatableData, setDataTableData] = useState([
  //   ['Joe James', 'Example Inc.', 'Yonkers', 'NY'],
  //   ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
  //   ['Bob Herm', 'Example Inc.', 'Tampa', 'FL'],
  //   ['James Houston', 'Example Inc.', 'Dallas', 'TX'],
  //   ['Prabhakar Linwood', 'Example Inc.', 'Hartford', 'CT'],
  //   ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
  //   ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
  //   ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
  //   ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
  //   ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
  //   ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
  //   ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
  //   ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
  //   ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
  //   ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
  //   ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
  //   ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
  // ]);

  // const [columns, setColumns] = useState(['Name', 'Company', 'City', 'State']);
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
    <>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Inventory", path: "/Inventory/Stock Adjustment" },
              { name: "Stock Adjustment" },
            ]}
          />
        </Box>

        <Stack
          textAlign="center"
          position="relative"
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
        >
          {/* <MuiTable columns={columns} dataTableData={datatableData}/> */}
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
          <SimpleCard
            sx={{ width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack spacing={3}>
              {/* <Box p={3} bgcolor="#f5f5f5" borderRadius={2} height="100vh"> */}
              <Paper
                elevation={3}
                style={{ padding: "16px", marginBottom: "16px" }}
              >
                <Typography variant="h5" textAlign={"right"}>
                  Stock Adjustment#: 119
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Box></Box>
                  <Box></Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Box>
                      <Stack
                        direction="column"
                        spacing={1}
                        alignItems="flex-start"
                      >
                        <Typography variant="body1">
                          Stock Adjustment #:
                        </Typography>
                        <Typography variant="body1">Created On:</Typography>
                        <Typography variant="body1">Created by:</Typography>
                        <Typography variant="body1">Status:</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Stack
                        direction="column"
                        spacing={1}
                        alignItems="flex-end"
                      >
                        <Typography variant="body1">119</Typography>
                        <Typography variant="body1">
                          14/07/2024 01:10 PM
                        </Typography>
                        <Typography variant="body1">Codevus Bot</Typography>
                        <Typography variant="body1">
                          <span style={{ color: "orange" }}>Pending</span>
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* <TableContainer component={Paper} elevation={1}> */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        width: "50px",
                      }}
                    >
                      #
                    </TableCell>
                    <TableCell>Product Code</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>GRN Code</TableCell>
                    <TableCell>Store</TableCell>
                    <TableCell>Old Quantity</TableCell>
                    <TableCell>New Quantity</TableCell>
                    <TableCell>Cost Difference</TableCell>
                    <TableCell
                      style={{
                        maxwidth: "20px",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      style={{
                        height: "100px",
                      }}
                    >
                      <TableCell
                        style={{
                          width: "50px",
                        }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.grnCode}</TableCell>
                      <TableCell>{row.store}</TableCell>
                      <TableCell>{row.oldQty}</TableCell>
                      <TableCell>{row.newQty}</TableCell>
                      <TableCell>{row.costDiff}</TableCell>
                      <TableCell
                        style={{
                          maxwidth: "20px",
                        }}
                      >
                        <Stack direction="row" spacing={1}>
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
                              alignContent: "center",
                            }}
                          ></Button>
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
                              // alignContent: "center",
                            }}
                          ></Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <b>Total</b>
                    </TableCell>
                    <TableCell colSpan={2}>-9,975.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Paper
                elevation={3}
                style={{ padding: "16px", marginBottom: "16px" }}
              >
                <Stack>
                  <Typography variant="h6" textAlign={"left"}>
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
              {/* </TableContainer> */}
              {/* </Box> */}
            </Stack>
          </SimpleCard>
        </Stack>
      </Container>
    </>
  );
}

export default StockAdjustment;
