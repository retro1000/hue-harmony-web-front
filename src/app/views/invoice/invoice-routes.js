import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const CreateInvoice = Loadable(lazy(() => import("./CreateInvoice")));
const InvoiceList = Loadable(lazy(() => import("./InvoiceList")));
const InvoiceDetail = Loadable(lazy(() => import("./InvoiceDetails")));

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
  {
    path: "/invoice/view/:id",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <InvoiceDetail />
      </AuthGuard>
    ),
  },
];

export default InvoiceRoutes;
