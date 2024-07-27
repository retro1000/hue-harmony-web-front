import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const CreateInvoice = Loadable(lazy(() => import("./CreateInvoice")));
const SalesInvoiceList = Loadable(lazy(() => import("./SalesInvoiceList")));
const PurchaseInvoiceList = Loadable(lazy(() => import("./PurchaseInvoiceList")));


const InvoiceRoutes = [
  {
    path: "/invoice/create-invoice",
    element: (
      <AuthGuard auth={authRoles.back_office}>
        <CreateInvoice />
      </AuthGuard>
    ),
  },
  {
    path: "/invoice/sales/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <SalesInvoiceList />
      </AuthGuard>
    ),
  },
  {
    path: "/invoice/purchase/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office]}>
        <PurchaseInvoiceList />
      </AuthGuard>
    ),
  },
  
];

export default InvoiceRoutes;
