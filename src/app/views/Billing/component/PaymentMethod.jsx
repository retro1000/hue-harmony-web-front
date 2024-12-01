import React, { useState } from "react";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
} from "@mui/material";
import StripePaymentForm from "../../../components/StripeGatewayForm/StripePaymentForm";

const cards = [
    {
        brand: "Visa",
        brandImage: "https://via.placeholder.com/100x40?text=Visa",
        last4: "1060",
        expiry: "01/25",
        name: "Kumar",
    },
    {
        brand: "MasterCard",
        brandImage: "https://via.placeholder.com/100x40?text=MasterCard",
        last4: "5678",
        expiry: "12/24",
        name: "Kumar",
    },
    {
        brand: "Discover",
        brandImage: "https://via.placeholder.com/100x40?text=Discover",
        last4: "1234",
        expiry: "11/23",
        name: "Kumar",
    },
];

export default function PaymentMethod({
                                          paymentType,
                                          setPaymentType,
                                          onAddNewCard,
                                          savedCards = cards,
                                          setCardDetails
                                      }) {
    const [selectedCard, setSelectedCard] = useState("");

    const handleNewCard = () => {
        if (paymentType === "card") {
            onAddNewCard(true);
        }
    };

    const handlePaymentChange = (event) => {
        setPaymentType(event.target.value);
    };

    const handleCardSelection = (event) => {
        setSelectedCard(event.target.value);
    };

    const isCreditDebitSelected = paymentType === "card";

    return (
        <RadioGroup value={paymentType} name="payment-method" onChange={handlePaymentChange}>
            <FormControlLabel
                value="card"
                control={<Radio size="small"/>}
                label={
                    <Typography variant="subtitle1" gutterBottom>
                        Credit or Debit Card
                    </Typography>
                }
            />
            {isCreditDebitSelected && (
                <Box mt={2} ml={3} width={"100%"}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        <RadioGroup
                            value={selectedCard}
                            onChange={handleCardSelection}
                            name="saved-cards"
                            sx={{ width: "100%" }}
                        >
                            {savedCards.map((card, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        value={card.last4}
                                        control={<Radio size="small" />}
                                        label={
                                            <Card
                                                variant="outlined"
                                                sx={{
                                                    width: "max-content", // Make card fill the grid item width
                                                    maxWidth: "max-content", // Cap width to avoid overflow
                                                    border:
                                                        selectedCard === card.last4
                                                            ? "2px solid #3f51b5"
                                                            : "1px solid #ccc",
                                                    borderRadius: "8px",
                                                    opacity: isCreditDebitSelected ? 1 : 0.5,
                                                    pointerEvents: isCreditDebitSelected ? "auto" : "none",
                                                    cursor: "pointer",
                                                    position: "relative",
                                                    "&:hover": {
                                                        borderColor: isCreditDebitSelected
                                                            ? "#3f51b5"
                                                            : "inherit",
                                                    },
                                                }}
                                            >
                                                <CardContent>
                                                    <CardMedia
                                                        component="img"
                                                        height="40"
                                                        image={card.brandImage}
                                                        alt={card.brand}
                                                        style={{
                                                            objectFit: "contain",
                                                            marginBottom: "8px",
                                                        }}
                                                    />
                                                    <Typography variant="body1" noWrap>
                                                        •••• •••• •••• {card.last4}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Expiry date: {card.expiry}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Name: {card.name}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        }
                                    />
                                </Grid>
                            ))}
                        </RadioGroup>
                    </Box>
                    <br></br>
                    <StripePaymentForm setCardDetails={setCardDetails}/>
                    {/*<Button*/}
                    {/*    variant="outlined"*/}
                    {/*    size="small"*/}
                    {/*    style={{ marginTop: "16px" }}*/}
                    {/*    onClick={handleNewCard}*/}
                    {/*    disabled={!isCreditDebitSelected}*/}
                    {/*>*/}
                    {/*    Add New Card*/}
                    {/*</Button>*/}
                </Box>
            )}
            {/*<br />*/}
            <FormControlLabel value="cod" control={<Radio size="small"/>} label="Cash on Delivery" />
        </RadioGroup>
    );
}
