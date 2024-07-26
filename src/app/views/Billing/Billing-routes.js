import { lazy } from "react";
import Loadable from "app/components/Loadable";


const BillingDetails = Loadable(lazy(() => import('../Billing/BillingDetails')))
const Cart = Loadable(lazy(() => import('../Billing/CartPage')))




const BillingRoutes = [
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/BillingDetails",
    element: <BillingDetails />
  },
  
];

export default BillingRoutes;
