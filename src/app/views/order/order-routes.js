import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const WholesaleOrderList = Loadable(lazy(() => import("./WholesaleOrderList")));
const RetailOrderList = Loadable(lazy(() => import("./RetailOrderList")));
const OrderDetails = Loadable(lazy(() => import("./OrderDetails")));
const CreateOrder = Loadable(lazy(() => import("./create-sales-order")));

const orderRoutes = [
  {
    path: "/order/view/:id",
    element: (
      <AuthGuard auth={[...authRoles.sales_manager, ...authRoles.back_office]}>
        <OrderDetails />
      </AuthGuard>
    ),
  },
  {
    path: "/order/retail/list",
    element: (
      // <AuthGuard auth={[...authRoles.sales_manager, ...authRoles.back_office]}>
        <RetailOrderList />
      // </AuthGuard>
    ),
  },
  {
    path: "/order/wholesale/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.sales_manager]}>
        <WholesaleOrderList />
      </AuthGuard>
    ),
  },
  {
    path: "/order/crete-order",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.sales_manager]}>
        <CreateOrder />
        </AuthGuard> 
    ),
  },
  
];

export default orderRoutes;
