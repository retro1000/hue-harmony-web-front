
import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import Breadcrumb from "../../components/AccountManagement/Breadcrumb";
import Sidebar from "../../components/AccountManagement/Sidebar";
import ProfileForm from "../../components/AccountManagement/ProfileForm";

const AccountDetails = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Breadcrumb />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                Edit Your Profile
              </Typography>
              <br></br>
              <ProfileForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountDetails;
