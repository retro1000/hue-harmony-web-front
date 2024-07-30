import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const PaymentList = Loadable(lazy(() => import("./PaymentList")));
const BulkPaymentDetails = Loadable(lazy(() => import("./BulkPaymentDetails")));

const PaymentRoutes = [
  {
    path: "/payment/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.sales_manager]}>
        <PaymentList />
      </AuthGuard>
    ),
  },
  {
    path: "/payment/bulkpaymentdetails",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.sales_manager]}>
        <BulkPaymentDetails />
      </AuthGuard>
    ),
  },
];

export default PaymentRoutes;
