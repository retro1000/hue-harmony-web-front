import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const InvoiceList = Loadable(lazy(() => import("./InvoiceList")));






const InvoiceRoutes = [
  {
    path: "/invoice/list",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <InvoiceList />
      </AuthGuard>
    ),
  },
  
];

export default InvoiceRoutes;
