import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme } from "./components";
// ALL CONTEXTS
// import { AuthProvider } from "./contexts/Auth0Context";
import { AuthProvider } from "./contexts/JWTAuthContext";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";

// FAKE SERVER
import "../fake-db";

import "@fontsource/roboto";

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";
import {STRIPE_PUBLISHABLE_KEY} from "../config";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
        <AuthProvider>
            <MatxTheme>
                <Elements stripe={stripePromise}>
                    <CssBaseline />
                   {content}
                </Elements>
            </MatxTheme>
        </AuthProvider>
    </SettingsProvider>
  );
}
