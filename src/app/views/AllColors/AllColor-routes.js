import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";


const AllColors = Loadable(lazy(() => import("./AllColors")));

const allColorRoutes = [
  { 
    path: "/allcolors",
    element: 
//      <AuthGuard auth={authRoles.user}>
        <AllColors />
//      </AuthGuard>
  }
];

export default allColorRoutes;
