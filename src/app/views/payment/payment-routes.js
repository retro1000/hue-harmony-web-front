import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const PaymentList = Loadable(lazy(() => import("./PaymentList")));


const PaymentRoutes = [
  { 
    path: "/payment/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <PaymentList />
      </AuthGuard>
  }
];

export default PaymentRoutes;
