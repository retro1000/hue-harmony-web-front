import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const PurchaseOrderList = Loadable(lazy(() => import("./PurchaseOrderList")));
const PurchaseOrderDetails = Loadable(
  lazy(() => import("./PurchaseOrderDetails"))
);

const PurchaseOrderRoutes = [
  {
    path: "/purchase-order/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <PurchaseOrderList />
      </AuthGuard>
    ),
  },
  {
    path: "/purchase-order/view/:id",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <PurchaseOrderDetails />
      </AuthGuard>
    ),
  },
];

export default PurchaseOrderRoutes;
