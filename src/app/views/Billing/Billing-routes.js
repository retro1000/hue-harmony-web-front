import { lazy } from "react";
import Loadable from "app/components/Loadable";
import AuthGuard from "app/auth/AuthGuard";
import { authRoles } from "app/auth/authRoles";


const BillingDetails = Loadable(lazy(() => import('../Billing/BillingDetails')))
const Cart = Loadable(lazy(() => import('../Billing/cart/CartPage')))




const BillingRoutes = [
  {
    path: "/cart",
    element:
    <AuthGuard auth={authRoles.user}>
      <Cart />
    </AuthGuard>
,
  },
  {
    path: "/BillingDetails",
    element: 
      <AuthGuard auth={authRoles.user}>
        <BillingDetails />
      </AuthGuard>
  },
];

export default BillingRoutes;
