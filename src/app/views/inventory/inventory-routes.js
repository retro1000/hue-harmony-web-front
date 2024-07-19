import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const StockAdjustment = Loadable(lazy(() => import("./StockAdjustment")));
const Reservation = Loadable(lazy(() => import("./Reservation")));
const GRN = Loadable(lazy(() => import("./Grn")));

const inventoryRoutes = [
  {
    path: "/inventory/stock-adjustment",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <StockAdjustment />
      </AuthGuard>
    ),
  },
  {
    path: "/inventory/reservation",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <Reservation />
      </AuthGuard>
    ),
  },
  {
    path: "/inventory/grn",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <GRN />
      </AuthGuard>
    ),
  },
];

export default inventoryRoutes;
