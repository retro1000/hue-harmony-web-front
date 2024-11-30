import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../../../config";

// Load Stripe instance
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripePaymentForm = ({ setCardDetails }) => {
    const stripe = useStripe();
    const elements = useElements();

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

        if (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
            return;
        }

        setCardDetails({
            cardBrand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            expMonth: paymentMethod.card.exp_month,
            expYear: paymentMethod.card.exp_year,
        })

        // Send paymentMethod.id to your backend to save or process the payment
        console.log("Payment Method ID:", paymentMethod.id);

        setIsLoading(false);
        alert("Card added successfully!");
    };

    return (
        <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
                <CardElement options={{ hidePostalCode: true }} />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit" disabled={!stripe || isLoading}>
                    {isLoading ? "Saving..." : "Add Card"}
                </button>
            </form>
        </Elements>
    );
};

export default StripePaymentForm
