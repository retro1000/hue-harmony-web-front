import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {useNotistack} from "../../hooks/useNotistack";

// Load Stripe instance


const StripePaymentForm = ({ setCardDetails, setSelectedCard, addSavedCards }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { triggerNotifications } = useNotistack()

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            return; // Stripe.js has not loaded yet
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        cardElement.clear();

        if (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
            return;
        }

        const newCard = {
            cardType: paymentMethod.card.brand.toUpperCase(),
            offset: paymentMethod.card.last4,
            expireDate: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
            token: paymentMethod.id,
            chooseType: 'NEW'
        }

        setCardDetails(newCard)
        setSelectedCard(newCard);
        addSavedCards(newCard)

        // Send paymentMethod.id to your backend to save or process the payment
        console.log("Payment Method ID:", paymentMethod.id);

        setIsLoading(false);

        triggerNotifications([{message: "Card saved successfully.", variants: "success"}])
    };

    return (
        // <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                color: "#32325d",
                                fontFamily: "Arial, sans-serif",
                                fontSmoothing: "antialiased",
                                fontSize: "16px",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#fa755a",
                                iconColor: "#fa755a",
                            },
                        },
                    }}
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit" disabled={!stripe || isLoading}>
                    {isLoading ? "Saving..." : "Add Card"}
                </button>
            </form>
        // </Elements>
    );
};

export default StripePaymentForm
