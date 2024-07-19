import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const CustomerList = Loadable(lazy(() => import("./CustomerList")));


const customerRoutes = [
  { 
    path: "/customer/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <CustomerList />
      </AuthGuard>
  },
  
];

export default customerRoutes;
