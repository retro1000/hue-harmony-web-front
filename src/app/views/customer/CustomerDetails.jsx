import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Stack,
  Box,
  styled,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Breadcrumb, SimpleCard } from "app/components";
//import { useAuth } from "app/hooks/useAuth";

function CustomerDetails() {
  const { id } = useParams();
 // const { role } = useAuth();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    // Fetch customer details using Axios
    axios
      .get(`/api/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]);

  // styled components
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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Customer", path: `/customer/user-${id}` },
            { name: `User-${id}` },
          ]}
        />
      </Box>
      <Stack
        textAlign="center"
        position="relative"
        justifyContent={"center"}
        spacing={3}
      >
        {/* {role === "BACKOFFICE" ? (
          <SimpleCard sx={{ width: "100%" }} alignItems={"center"} justifyContent={"center"}>
            <Stack>
              <Typography variant="h6" gutterBottom>
                Click below to Update Status
              </Typography>
              <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"center"}>
                <Button variant="contained" color="error">
                  Cancel
                </Button>
                <Button variant="contained" color="success">
                  Approve
                </Button>
              </Stack>
            </Stack>
          </SimpleCard>
        ) : (
          ""
        )} */}

        <Box display="flex" justifyContent="flex-start" mt={2} gap={2}>
          <ReleaseButton variant="contained" startIcon={<Edit />}>
            Edit
          </ReleaseButton>
        </Box>

        <SimpleCard sx={{ width: "100%" }} alignItems="center" justifyContent="center">
          <Typography variant="h5" gutterBottom>
            {customerData.customerDto.firstName} {customerData.customerDto.lastName}
          </Typography>
        </SimpleCard>

        <Stack sx={{ width: "100%" }}>
          <SimpleCard sx={{ width: "100%" }} alignItems="center" justifyContent="center">
            <TableContainer component={Paper} sx={{ width: "100%" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center">Business Name</StyledTableCell>
                    <StyledTableCell align="center">{customerData.businessName}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Contact Person</StyledTableCell>
                    <StyledTableCell align="center">{customerData.contactPerson}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Land Phone</StyledTableCell>
                    <StyledTableCell align="center">{customerData.landPhone}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Delivery Address</StyledTableCell>
                    <StyledTableCell align="center">{customerData.deliveryAddress}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Contact Person Number</StyledTableCell>
                    <StyledTableCell align="center">{customerData.contactPersonNumber}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="center">{customerData.address}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">NIC Number</StyledTableCell>
                    <StyledTableCell align="center">{customerData.nicNo}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Customer Email</StyledTableCell>
                    <StyledTableCell align="center">{customerData.customerDto.email}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center">Customer Contact Nos</StyledTableCell>
                    <StyledTableCell align="center">
                      {customerData.customerDto.contactNos.join(", ")}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
}

export default CustomerDetails;
