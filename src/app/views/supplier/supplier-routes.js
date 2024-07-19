import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const SupplierList = Loadable(lazy(() => import("./SupplierList")));


const supplierRoutes = [
  { 
    path: "/supplier/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <SupplierList />
      </AuthGuard>
  },
  
];

export default supplierRoutes;
