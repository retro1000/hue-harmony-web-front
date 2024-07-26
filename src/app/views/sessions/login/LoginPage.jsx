
import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../../../components/login/LoginForm";
import ImageSection from "../../../components/login/ImageSection";

const LoginPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", width: "100%", marginTop: "-27px" }}>
      <LoginForm loginTitle={"Login"} loginSubtitle={"Log In for free to access to in any of our products"} />
        <ImageSection />
      </Box>
    </Box>
  );
};

export default LoginPage;
