import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const InventoryList = Loadable(lazy(() => import("./InventoryList")));
const StockAdjustmentList = Loadable(lazy(() => import("./StockAdjustmentList")));


const InventoryRoutes = [
  { 
    path: "/inventory/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <InventoryList />
      </AuthGuard>
  },
  { 
    path: "/inventory/stock-adjustment/list",
    element: 
      <AuthGuard auth={authRoles.manager}>
        <StockAdjustmentList />
      </AuthGuard>
  },
  
];

export default InventoryRoutes;
