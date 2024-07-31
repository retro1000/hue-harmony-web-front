import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const GrnList = Loadable(lazy(() => import("./GrnList")));
//grn create edit back
//approve inventory
const grnRoutes = [
  { 
    path: "/grn/list",
    element: 
      <AuthGuard auth={authRoles.inventory_manager}>
        <GrnList />
      </AuthGuard>
  },
  
];

export default grnRoutes;
