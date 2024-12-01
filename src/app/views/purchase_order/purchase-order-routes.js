import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";
import PurchaseOrderUpsert from "./PurchaseOrderUpsert";

const PurchaseOrderList = Loadable(lazy(() => import("./PurchaseOrderList")));
const PurchaseOrderDetails = Loadable(
  lazy(() => import("./PurchaseOrderDetails"))
);
const SalesOrderDetails = Loadable(lazy(() => import("./SalesOrderDetails")));
const PurchaseOrderCreate = Loadable(lazy(() => import("./create-po")));

const PurchaseOrderRoutes = [
  {
    path: "/purchase-order/list",
    element: (
      // <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
      <PurchaseOrderList />
      // </AuthGuard>
    ),
  },
  {
    path: "/purchase-order/view/:id",
    element: (
      // <AuthGuard
      //   auth={[...authRoles.back_office, ...authRoles.inventory_manager]}
      // >
      <PurchaseOrderDetails />
      // </AuthGuard>
    ),
  },
  {
    path: "/sales-order/view",
    element: (
      // <AuthGuard
      //   auth={[
      //     ...authRoles.sales_manager,
      //     ...authRoles.inventory_manager,
      //     ...authRoles.back_office,
      //   ]}
      // >
      <SalesOrderDetails />
      // </AuthGuard>
    ),
  },
  {
    path: "/purchase-order/create",
    element: (
      <AuthGuard auth={[...authRoles.inventory_manager]}>
        // <PurchaseOrderUpsert type={"create"} />
        <PurchaseOrderCreate />
      </AuthGuard>
    ),
  },
  {
    path: "/purchase-order/update/:id",
    element: (
      // <AuthGuard auth={[...authRoles.inventory_manager]}>
      <PurchaseOrderUpsert type={"update"} />
      // </AuthGuard>
    ),
  },
];

export default PurchaseOrderRoutes;
