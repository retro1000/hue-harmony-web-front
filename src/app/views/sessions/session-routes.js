import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));

// const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
// const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));

const sessionRoutes = [
  // { path: "/session/signup", element: <JwtRegister /> },
  // { path: "/session/signin", element: <JwtLogin /> },
  { 
    path: "/session/forgot-password",
    element:
      <AuthGuard auth={[...authRoles.manager, ...authRoles.cachier, authRoles.user]}>
        <ForgotPassword />
      </AuthGuard>
  },
  { path: "*", element: <NotFound /> }
];

export default sessionRoutes;
