import { lazy } from "react";
import Loadable from "app/components/Loadable";


const AccountDetail = Loadable(lazy(() => import("./AccountDeatils")));

const profileRoutes = [
  {
    path: "/AccountDetails",
    element: <AccountDetail />
  },
];

export default profileRoutes;
