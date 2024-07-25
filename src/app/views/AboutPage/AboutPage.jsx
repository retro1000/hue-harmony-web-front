
import React from "react";
import { Box, Typography, Grid, Container, Divider } from "@mui/material";
import AboutHeader from "../../components/aboutpage/AboutHeader";
import BrandCars from "../../components/aboutpage/BrandCars";
import PartnerLogos from "../../components/aboutpage/PartnerLogos";
import FAQSection from "../../components/aboutpage/FAQSection";

const AboutPage = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <br />
            <AboutHeader />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              With a proven track record of excellence and over 50 years of
              experience in Sri Lanka, AkzoNobel Paints, formally known as ICI
              Paints, is part of the world's biggest coatings manufacturer and
              number one in decorative paints and performance coatings.
              <br />
              <br />
              Technology and innovation have always been at the heart of
              AkzoNobel Group. As one of the world's largest paint manufacturers
              and the world's leading brand of premium quality paints, our
              success is often enhanced by our ability to meet market needs with
              quality products and value-added services.
              <br />
              <br />
              With the integration of ICI and AkzoNobel, we can leverage on
              global expertise and local insights to open up big opportunities
              for business synergies and improvements. We will also continue to
              provide our customers with the highest standard of products,
              service and support.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <br />
            <Box
              component="img"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1de2200e70480ec0afb979b5c9c1ea7e76bf00d9b4bb1805179d3a6778481c4?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
              alt="About Dulux"
              sx={{ width: "100%", height: "auto",borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Container>
      <BrandCars />
      <PartnerLogos />
      <FAQSection />
    </Box>
  );
};

export default AboutPage;
