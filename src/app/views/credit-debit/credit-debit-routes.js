import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const CreditList = Loadable(lazy(() => import("./CreditList")));
const DebitList = Loadable(lazy(() => import("./DebitList")));
const CreditDebitDetail = Loadable(lazy(() => import("./CreditDebitdetails")));
const DebitNote = Loadable(lazy(() => import("./Credit-DebitNote")));
const CreateCredit = Loadable(lazy(() => import("./create-credit")));
const CreateDebit = Loadable(lazy(() => import("./create-debit")));
//approve credit debit inventory manager
const creditDebitRoutes = [
  {
    path: "/credit-debit/credit/list",
    element: (
      <AuthGuard
        auth={[...authRoles.back_office, ...authRoles.inventory_manager]}
      >
        <CreditList />
      </AuthGuard>
    ),
  },
  {
    path: "/credit-debit/create-credit",
    element: (
      <AuthGuard auth={authRoles.back_office}>
        <CreateCredit />
      </AuthGuard>
    ),
  },
  {
    path: "/credit-debit/create-debit",
    element: (
      <AuthGuard auth={authRoles.back_office}>
        <CreateDebit />
      </AuthGuard>
    ),
  },
  {
    path: "/credit-debit/debit/list",
    element: (
      <AuthGuard
        auth={[...authRoles.back_office, ...authRoles.inventory_manager]}
      >
        <DebitList />
      </AuthGuard>
    ),
  },
  {
    path: "/credit/view/:id",
    element: (
      <AuthGuard
        auth={[...authRoles.back_office, ...authRoles.inventory_manager]}
      >
        <DebitNote />
      </AuthGuard>
    ),
  },
  {
    path: "/debit/view/:id",
    element: (
      <AuthGuard
        auth={[...authRoles.back_office, ...authRoles.inventory_manager]}
      >
        <DebitNote />
      </AuthGuard>
    ),
  },
];

export default creditDebitRoutes;
