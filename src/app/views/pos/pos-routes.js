import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const PosHomePage = Loadable(lazy(() => import("./Pos-homeN")));
const PosOrderList = Loadable(lazy(() => import("./Order-list")));
const SalesSummary = Loadable(lazy(() => import("./Sales-summary")));
const OrderDetails = Loadable(lazy(() => import("./Pos-Order-detail")));

const PosRoutes = [
  {
    path: "/pos-home",
    element: <PosHomePage />,
  },
  {
    path: "/pos/order-details",
    element: <OrderDetails />,
  },
  {
    path: "/pos/order-list",
    element: (
      // <AuthGuard auth={[...authRoles.cachier]}>
        <PosOrderList />
      // </AuthGuard>
    ),
  },
  {
    path: "/pos/sales-summary",
    element: (
      // <AuthGuard auth={[...authRoles.cachier]}>
        <SalesSummary />
      // </AuthGuard>
    ),
  },
];

export default PosRoutes;
