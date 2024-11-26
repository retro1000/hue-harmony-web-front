import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import PosTheme from "app/components/Themes/posTheme";

import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  Save,
  Payment,
  Cancel,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Make sure Grid is imported
import PosProductCard from "../../components/ProductCard/posProductCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { color } from "echarts";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PaymentIcon from "@mui/icons-material/Payment";
import PosNav from "app/components/Pos/PosNav";

const products = [
  {
    id: "P3452",
    name: "HP LAPTOP",
    price: 75000,
    availability: "170,000.667 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "P3453",
    name: "RAM 4GB",
    price: 7000,
    availability: "58.000 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "0013",
    name: "test for qu..",
    price: 0,
    availability: "7.000 Nos",
    imageUrl: "/assets/images/sample.jpeg",
  },
  {
    id: "0036",
    name: "test for ch..",
    price: 0,
    availability: "10.000 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "009",
    name: "TEST FOR GR..",
    price: 0,
    availability: "87.000 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "010",
    name: "Test For GR..",
    price: 0,
    availability: "14.000 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "012",
    name: "Test for GR..",
    price: 0,
    availability: "188.000 Kg",
    imageUrl: "/assets/images/sample.jpeg",
  },
  {
    id: "012365",
    name: "test for ro..",
    price: 0,
    availability: "99.000 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "013",
    name: "test for cr..",
    price: 0,
    availability: "80.000 Nos",
    imageUrl: "/assets/images/sample.jpeg",
  },
  {
    id: "013",
    name: "test for cr..",
    price: 0,
    availability: "80.000 Nos",
    imageUrl: "/assets/images/dulux.png",
  },
  {
    id: "013",
    name: "test for cr..",
    price: 0,
    availability: "80.000 Nos",
    imageUrl: "/assets/images/sample.jpeg",
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const deleteIconStyle = {
  color: "red",
};
// Sample data
const rows = [
  createData(
    "Frozen yoghurt",
    159,
    6.0,
    24,
    <DeleteIcon sx={deleteIconStyle}></DeleteIcon>
  ),
  createData(
    "Frozen yoghurt",
    159,
    6.0,
    24,
    <DeleteIcon sx={deleteIconStyle}></DeleteIcon>
  ),
  createData(
    "Eclair",
    262,
    16.0,
    24,
    <DeleteIcon sx={deleteIconStyle}></DeleteIcon>
  ),
  createData(
    "Cupcake",
    305,
    3.7,
    67,
    <DeleteIcon sx={deleteIconStyle}></DeleteIcon>
  ),
  createData(
    "Gingerbread",
    356,
    16.0,
    49,
    <DeleteIcon sx={deleteIconStyle}></DeleteIcon>
  ),
];
const tableCellStyle = {
  padding: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  backgroundColor: "#f5f5f5", // Example background color
};

const PosHome = () => {
  const [age, setAge] = React.useState("");

  const [data, setData] = useState(rows);

  // Handle change in input field
  const handleInputChange = (index, event) => {
    const newData = [...data];
    newData[index].fat = event.target.value;
    setData(newData);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <PosNav></PosNav>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 0, // Adds space between the boxes
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: "65%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            color: "white",
            padding: 0.5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              height: "5.5vh",
              padding: 1,
              justifyContent: "space-around",
              marginTop: -1.2,
            }}
          >
            <TextField
              label="Search By Product Name or Code"
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "white", mb: 0, height: "5vh", mr: 0.2 }}
            />
            <TextField
              label="Please Scan Or Enter Item Barcode Number"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: false }}
              sx={{ backgroundColor: "white", mb: 0, height: "5vh", mr: 0.2 }}
            />
            <div>
              <FormControl sx={{ minWidth: 120, height: "5vh" }}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ height: "4.7vh" }}
                >
                  <MenuItem value="">
                    <em>Barcode</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <Container
            sx={{
              maxHeight: "83vh", // Adjust height as needed
              overflowY: "scroll", // Always show vertical scrollbar
              overflowX: "hidden", // Hide horizontal scrollbar if not needed
              padding: 1, // Optional: adjust padding
              position: "relative",
              marginTop: 1,
              marginRight: 3, // Optional: adjust padding
              "&::-webkit-scrollbar": {
                width: 8, // Width of the scrollbar
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1", // Track color
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888", // Thumb color
                // Rounded corners
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555", // Thumb color on hover
              },
            }}
          >
            <Grid container spacing={2}>
              {" "}
              {/* Adjust spacing if needed */}
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <PosProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{
            width: "35%",
            height: "92.5vh",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            color: "white",
            boxShadow: 6,
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            color="grey.700"
            fontSize={"1.2rem"}
            fontWeight={"Bold"}
            marginTop={0.6}
            align="left"
            width={"98%"}
            height={"5vh"}
            padding={0.8}
            marginLeft={0.6}
            marginRight={0.6}
            style={{
              borderTop: "2px solid grey",
              borderBottom: "2px solid grey",
            }}
          >
            Please Add Items to Cart
          </Typography>
          <Box
            display={"flex"}
            width={"100%"}
            flexDirection={"row"}
            justifyContent="end"
            padding={1}
          >
            <Paper
              elevation={0}
              square
              sx={{
                marginTop: 1,
                background: "lightgreen",
                display: "flex",
                height: "3vh",
                padding: 0.3,
                paddingRight: 0.6,
              }}
            >
              <CheckCircleIcon
                sx={{ fontSize: 15, marginTop: 0.3 }}
              ></CheckCircleIcon>
              <Typography
                fontSize={"0.9rem"}
                fontWeight={500}
                sx={{ marginLeft: 0.4 }}
              >
                Save
              </Typography>
            </Paper>
          </Box>

          <Box width={"100%"} padding={1.5} height={"60vh"}>
            <TableContainer
              width="80%"
              component={Paper}
              elevation={0}
              maxHeight="10vh"
              position="relative"
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: 120,
                        padding: 0.8,
                        fontWeight: "Bold",
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                        color: "grey.800", // or a specific color code like '#424242' for a greyish black
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 100,
                        padding: 0.8,
                        fontWeight: "Bold",
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                        color: "grey.800", // or a specific color code like '#424242' for a greyish black
                      }}
                      align="left"
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 100,
                        padding: 0.8,
                        fontWeight: "Bold",
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                        color: "grey.800", // or a specific color code like '#424242' for a greyish black
                      }}
                      align="center"
                    >
                      Discount
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 90,
                        padding: 0.8,
                        fontWeight: "Bold",
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                        color: "grey.800", // or a specific color code like '#424242' for a greyish black
                      }}
                      align="center"
                    >
                      Price
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 70,
                        padding: 0.8,
                        fontWeight: "Bold",
                        fontSize: "1.1rem",
                        fontFamily: "Poppins, sans-serif",
                        color: "grey.800", // or a specific color code like '#424242' for a greyish black
                      }}
                      align="left"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        fontWeight: "bold",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        <Typography
                          component="span"
                          sx={{ fontWeight: "bold", fontSize: "inherit" }}
                        >
                          {row.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            component="span"
                            sx={{ color: "blue", fontSize: "inherit" }}
                          >
                            LKR
                          </Typography>
                          <input
                            type="number"
                            value={row.fat}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            style={{
                              width: "60%",
                              textAlign: "center",
                              border: "0.5px solid grey",
                              fontSize: "inherit",
                              fontWeight: 400,
                            }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{ fontSize: "0.9rem", fontWeight: 500 }}
                      >
                        <input
                          type="number"
                          value={row.fat}
                          onChange={(event) => handleInputChange(index, event)}
                          style={{
                            width: "80%",
                            textAlign: "center",
                            border: "0.5px solid grey",
                            fontSize: "inherit",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "grey.800",
                        }}
                      >
                        {row.calories}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "grey.800",
                        }}
                      >
                        {row.carbs}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "0.9rem", fontWeight: 500 }}
                      >
                        {row.protein}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid black",
              padding: 0.4,
              marginLeft: 0.4,
              marginRight: 0.4,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
              color="black"
            >
              <span>Sub Total</span>
              <span>0.00</span>
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
              color="black"
            >
              <span>Discount</span>
              <span>0.00</span>
            </Typography>

            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
              color="black"
            >
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 700 }}>0.00</span>
            </Typography>

            <Box
              display={"flex"}
              width={"100%"}
              flexDirection={"row"}
              justifyContent="end"
              padding={1}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent="space-between"
                gap={1}
              >
                <Button variant="contained" startIcon={<Save />}>
                  SAVE
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Cancel />}
                >
                  VOID
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Payment />}
                >
                  PAYMENT
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PosHome;
