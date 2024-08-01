
import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../../../components/login/SignupForm";
import ImageSection from "../../../components/login/ImageSection";

const LoginPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 25 , paddingRight: 25 }}>
      <Box sx={{ display: "flex", width: "100%", marginTop: "-27px" }}>
      <ImageSection />
      <LoginForm loginTitle={"Signup"} loginSubtitle={"Log In for free to access to in any of our products"} />
        
      </Box>
    </Box>
  );
};

export default LoginPage;
