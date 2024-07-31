import { lazy } from "react";
import Loadable from "app/components/Loadable";

const Login = Loadable(lazy(() => import('../../sessions/login/LoginPage')));

const loginRoutes = [
  {
    path: "/login",
    element: <Login />
  }
];

export default loginRoutes;
