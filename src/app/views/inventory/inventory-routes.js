import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const StockAdjustment = Loadable(lazy(() => import("./StockAdjustment")));
const StockAdjustmentList = Loadable(
  lazy(() => import("./StockAdjustmentList"))
);
const Reservation = Loadable(lazy(() => import("./Reservation")));
const GRN = Loadable(lazy(() => import("./Grn")));
const InventoryList = Loadable(lazy(() => import("./InventoryList")));
const CreditDebitNote = Loadable(lazy(() => import("./Credit-DebitNote")));

const inventoryRoutes = [
  {
    path: "/inventory/stock-adjustment",
    element: (
      <AuthGuard auth={authRoles.inventory_manager}>
        <StockAdjustment />
      </AuthGuard>
    ),
  },
  {
    path: "/inventory/stock-adjustment/list",
    element: (
      <AuthGuard auth={authRoles.inventory_manager}>
        <StockAdjustmentList />
      </AuthGuard>
    ),
  },
  {
    path: "/inventory/reservation",
    element: (
      <AuthGuard auth={authRoles.inventory_manager}>
        <Reservation />
      </AuthGuard>
    ),
  },
  {
    path: "/inventory/grn",
    element: (
      // <AuthGuard auth={authRoles.manager}>
      <GRN />
      // </AuthGuard>
    ),
  },
  {
    path: "/inventory/creditdebitnote",
    element: (
      <AuthGuard auth={authRoles.manager}>
        <CreditDebitNote />
      </AuthGuard>
    ),
  },
  {
    path: "/inventory/list",
    element: (
      <AuthGuard auth={[...authRoles.manager, ...authRoles.cachier]}>
        <InventoryList />
      </AuthGuard>
    ),
  },
];

export default inventoryRoutes;
