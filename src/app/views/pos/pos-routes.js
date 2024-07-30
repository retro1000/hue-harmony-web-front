import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const PosHomePage = Loadable(lazy(() => import("./Pos-home")));
const PosOrderList = Loadable(lazy(()=>import("./Order-list")))
const SalesSummary = Loadable(lazy(()=>import("./Sales-summary")))

const PosRoutes = [
    {
        path: "/pos-home",
        element: (
            <AuthGuard auth={[...authRoles.cachier, ...authRoles.sales_manager]}>
                <PosHomePage />
            </AuthGuard>
        ),
    },
    {
        path: "pos/order-list",
        element: (
            <AuthGuard auth={[...authRoles.cachier, ...authRoles.sales_manager]}>
                <PosOrderList />
            </AuthGuard>
        ),
    },
    {
        path: "pos/sales-summary",
        element: (
            <AuthGuard auth={[...authRoles.cachier, ...authRoles.sales_manager]}>
                <SalesSummary />
            </AuthGuard>
        ),
    },
    
];

export default PosRoutes;
