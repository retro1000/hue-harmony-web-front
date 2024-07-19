import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const UserList = Loadable(lazy(() => import("./UserList")));


const userRoutes = [
  { 
    path: "/user/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <UserList />
      </AuthGuard>
  },
  
];

export default userRoutes;
