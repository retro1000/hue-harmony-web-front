import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const PurchaseOrderList = Loadable(lazy(() => import("./PurchaseOrderList")));
const PurchaseOrderDetails = Loadable(
  lazy(() => import("./PurchaseOrderDetails"))
);
const SalesOrderDetails = Loadable(lazy(() => import("./SalesOrderDetails")));

const PurchaseOrderRoutes = [
  {
    path: "/purchase-order/list",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <PurchaseOrderList />
      </AuthGuard>
    ),
  },
  {
    path: "/purchase-order/view/:id",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <PurchaseOrderDetails />
      </AuthGuard>
    ),
  },
  {
    path: "/sales-order/view",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <SalesOrderDetails />
      </AuthGuard>
    ),
  },
];

export default PurchaseOrderRoutes;
