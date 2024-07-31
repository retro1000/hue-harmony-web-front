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
import PosRoutes from "./views/pos/pos-routes";
import loginRoutes from "./views/sessions/login/login-routes";
import signupRoutes from "./views/sessions/register/signup-routes";
import BillingRoutes from "./views/Billing/Billing-routes";
import profileRoutes from "./views/Profile/profile-routes";
import PChartRoutes from "./views/PaintChart/PChart-routes";
import InvoiceRoutes from "./views/invoice/invoice-routes";
import orderRoutes from "./views/order/order-routes";
import creditDebitRoutes from "./views/credit-debit/credit-debit-routes";
import productsDetails from "./views/ProductsDetails/PDetails-route";

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
      ...homeRoutes,
      ...loginRoutes,
      ...signupRoutes,
      ...BillingRoutes,
      ...profileRoutes,
      ...PChartRoutes,
      ...creditDebitRoutes,
      // dashboard route
      ...InvoiceRoutes,
      ...productsDetails,
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
