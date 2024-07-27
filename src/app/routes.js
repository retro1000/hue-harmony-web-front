import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import sessionRoutes from "./views/sessions/session-routes";
import productRoutes from "./views/product/product-routes";
import homeRoutes from "app/views/home/home-routes";
import grnRoutes from "./views/grn/grn-routes";
import userRoutes from "./views/user/user-routes";
import supplierRoutes from "./views/supplier/supplier-routes";
import customerRoutes from "./views/customer/customer-routes";
import InventoryRoutes from "./views/inventory/inventory-routes";
import PaymentRoutes from "./views/payment/payment-routes";
import PurchaseOrderRoutes from "./views/purchase_order/purchase-order-routes";
import posRoutes from "./views/pos/pos-routes"
import PosRoutes from "./views/pos/pos-routes";
import InvoiceRoutes from "./views/invoice/invoice-routes";
import orderRoutes from "./views/order/order-routes";

// E-CHART PAGE
const AppEchart = Loadable(
  lazy(() => import("app/views/charts/echarts/AppEchart"))
);
// Import lazy from React
const PosHomePage = Loadable(lazy(() => import("app/views/pos/Pos-home")));

// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [
  {
    element: (
      // <AuthGuard auth={authRoles.user}>
      <MatxLayout />
      // </AuthGuard>
    ),
    children: [
      ...orderRoutes,
      ...productRoutes,
      ...grnRoutes,
      ...userRoutes,
      ...supplierRoutes,
      ...customerRoutes,
      ...InventoryRoutes,
      ...PurchaseOrderRoutes,
      ...PaymentRoutes,
      // ...homeRoutes,
      // dashboard route
      ...InvoiceRoutes,
      {
        path: "/dashboard/default",
        element: (
          <AuthGuard auth={authRoles.manager}>
            <Analytics />
          </AuthGuard>
        ),
      },
      // e-chart route
      {
        path: "/charts/echarts",
        element: <AppEchart />,
        auth: authRoles.editor,
      },
    ],
  },

  // session pages route
  ...sessionRoutes,
  {
    children:[
      ...PosRoutes
    ]
  },
];

export default routes;
