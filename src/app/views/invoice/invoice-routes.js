import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const CreateInvoice = Loadable(lazy(() => import("./CreateInvoice")));
const InvoiceList = Loadable(lazy(() => import("./InvoiceList")));






const InvoiceRoutes = [
  {
    path: "/invoice/create-invoice",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <CreateInvoice />
      </AuthGuard>
    ),
  },
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
