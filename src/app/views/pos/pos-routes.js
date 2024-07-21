import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const PosHomePage = Loadable(lazy(() => import("./Pos-home")));

const PosRoutes = [
    {
        path: "/pos-home",
        element: (
            //<AuthGuard auth={authRoles.manager}>
                <PosHomePage />
            //</AuthGuard>
        ),
    },
    {
        path: "pos/order-list",
        element: (
            //<AuthGuard auth={authRoles.manager}>
                <PosHomePage />
            //</AuthGuard>
        ),
    },
];

export default PosRoutes;
