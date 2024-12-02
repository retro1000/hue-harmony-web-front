import React, {useEffect, useState} from "react";
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
import {useAxios} from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import {useNotistack} from "../../../hooks/useNotistack";

const cards = [
    {
        cardType: "VISA",
        offset: "1060",
        token: "s",
        expireDate: "01/25",
        chooseType: 'DEFAULT'
    },
    {
        cardType: "MASTER",
        offset: "5678",
        token: "4",
        expireDate: "12/24"
    },
    {
        cardType: "MASTER",
        offset: "1234",
        token: "q",
        expireDate: "11/23",
    },
];

const getBrandImage = (brand) => {
    switch (brand) {
        case 'VISA':
            return 'https://via.placeholder.com/100x40?text=Visa';
        case 'MASTER':
            return 'https://via.placeholder.com/100x40?text=MasterCard';
        default:
            return '';
    }
}

export default function PaymentMethod({
                                          paymentType,
                                          setPaymentType,
                                          setCardDetails,
                                          setOrderDetails,
                                          orderDetails
                                      }) {
    const { api } = useAxios()

    const {triggerNotification} = useNotistack()

    const { user, role } = useAuth()

    const [savedCards, setSavedCards] = useState(cards)

    const [selectedCard, setSelectedCard] = useState(savedCards?.find(card => card.chooseType === 'DEFAULT'));

    useEffect(() => {
        role === 'USER' && user && user?.userId > 0 &&
            api.get(`users/linked-cards/${user.userId}`)
               .then(res => {
                   if(res.status === 200 && res.data && res.data.length > 0) setSavedCards(res.data)
                })
               .catch(err => {
                    console.error(err)
                })
               .finally(() => {setSavedCards(cards)})
    }, []);

    const handlePaymentChange = (event) => {
        const selectedPaymentType = event.target.value;
        setPaymentType(selectedPaymentType);

        // Update order details
        setOrderDetails({
            ...orderDetails,
            paymentMethod: selectedPaymentType.toUpperCase(),
        });

        // Determine default card details if paymentType is 'card'
        if (selectedPaymentType === 'card') {
            const defaultCard =
                savedCards?.find((card) => card.chooseType === 'DEFAULT') ||
                (savedCards.length > 0 ? savedCards[0] : {});
            setCardDetails(defaultCard);
        } else {
            setCardDetails({});
        }
    };

    const handleCardSelection = (event) => {
        const {offset, expireDate, cardType, token, chooseType} = JSON.parse(event.target.value);
        setSelectedCard(JSON.parse(event.target.value));
        const card = {cardType: cardType, token: token, offset: offset, expireDate: expireDate, chooseType: chooseType || 'MENTIONED'}
        console.log(card)
        setCardDetails(card)
    };

    const addSavedCards = (card) => {
        if(!card) {
            triggerNotification([{text: 'No card found.', variant: 'error'}])
            return
        }
        if(savedCards.length === 0) {
            setSavedCards([...card])
            return;
        }

        if(!savedCards.find((c) => c.offset === card.offset && c.expireDate === card.expireDate && c.cardType === card.cardType))
            setSavedCards([...savedCards, card])

    }

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
                        mb={2}
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        <RadioGroup
                            value={JSON.stringify(selectedCard)}
                            onChange={handleCardSelection}
                            name="saved-cards"
                            sx={{width: "100%", display: "flex", gap: "0.5em"}}
                        >
                            {savedCards.map((card, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        value={JSON.stringify(card)}
                                        control={<Radio size="small"/>}
                                        label={
                                            <Card
                                                variant="outlined"
                                                sx={{
                                                    width: "140px", // Make card fill the grid item width
                                                    // maxWidth: "max-content", // Cap width to avoid overflow
                                                    border:
                                                        selectedCard === card.offset
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
                                                <CardContent sx={{padding: "!important 5px", mb: 1}}>
                                                    <CardMedia
                                                        component="img"
                                                        height="40"
                                                        image={getBrandImage(card.cardType)}
                                                        alt={card.cardType}
                                                        style={{
                                                            objectFit: "contain",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                    <Typography variant="body1" noWrap fontSize={"13px"}>
                                                        •••• •••• •••• {card.offset}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" fontSize={"12px"}>
                                                        Expiry date: {card.expireDate}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        }
                                    />
                                </Grid>
                            ))}
                        </RadioGroup>
                    </Box>
                    <StripePaymentForm setCardDetails={setCardDetails} setSelectedCard={setSelectedCard}
                                       addSavedCards={addSavedCards}/>
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
