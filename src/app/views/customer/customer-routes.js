import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const CustomerList = Loadable(lazy(() => import("./CustomerList")));
const CustomerDetail = Loadable(lazy(() => import("./CustomerDetails")));
//approve customer sales manager
//add and edit customer backoffice
const customerRoutes = [
  {
    path: "/customer/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.sales_manager, ...authRoles.cachier]}>
        <CustomerList />
      </AuthGuard>
    ),
  },
  {
    path: "/customer/view/:id",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.sales_manager, ...authRoles.cachier]}>
        <CustomerDetail />
      </AuthGuard>
    ),
  },
];

export default customerRoutes;
