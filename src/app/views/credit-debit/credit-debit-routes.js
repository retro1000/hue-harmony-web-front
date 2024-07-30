import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const CreditList = Loadable(lazy(() => import("./CreditList")));
const DebitList = Loadable(lazy(() => import("./DebitList")));
const CreditDebitDetail = Loadable(lazy(() => import("./CreditDebitdetailss")));

const customerRoutes = [
  {
    path: "/credit-debit/credit/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <CreditList />
      </AuthGuard>
    ),
  },
  {
    path: "/credit-debit/debit/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <DebitList />
      </AuthGuard>
    ),
  },
  {
    path: "/credit-debit/view/:id",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <CreditDebitDetail />
      </AuthGuard>
    ),
  },
];

export default customerRoutes;
