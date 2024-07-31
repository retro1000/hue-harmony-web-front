import { lazy } from "react";
import Loadable from "app/components/Loadable";

const Signup = Loadable(lazy(() => import('../../sessions/register/signupPage')));

const signupRoutes = [
  {
    path: "/Signup",
    element: <Signup />
  }
];

export default signupRoutes;
