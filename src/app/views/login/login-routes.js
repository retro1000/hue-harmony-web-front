import { lazy } from "react";
import Loadable from "app/components/Loadable";

const Login = Loadable(lazy(() => import('../login/LoginPage.jsx')));

const loginRoutes = [
  {
    path: "/login/login",
    element: <Login />
  }
];

export default loginRoutes;
