import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const StockAdjustment = Loadable(lazy(() => import("./Pos-home")));

const inventoryRoutes = [
    {
        path: "/pos",
        element: (
            <AuthGuard auth={authRoles.manager}>
                <StockAdjustment />
            </AuthGuard>
        ),
    },
];

export default inventoryRoutes;
