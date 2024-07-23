import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const SupplierList = Loadable(lazy(() => import("./SupplierList")));
const SupplierDetail = Loadable(lazy(() => import("./SupplierDetails")));

const supplierRoutes = [
  {
    path: "/supplier/list",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <SupplierList />
      </AuthGuard>
    ),
  },
  {
    path: "/supplier/view/:id",
    element: (
      // <AuthGuard auth={authRoles.manager}>
      <SupplierDetail />
      // </AuthGuard>
    ),
  },
];

export default supplierRoutes;
