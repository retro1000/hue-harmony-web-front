import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const GrnList = Loadable(lazy(() => import("./GrnList")));
const GrnDetail = Loadable(lazy(() => import("./Grn")));
const GRNCreateForm = Loadable(lazy(() => import("./Grn-create")));

//grn create edit back
//approve inventory
const grnRoutes = [
  {
    path: "/grn/list",
    element: (
      // <AuthGuard auth={[...authRoles.inventory_manager, ...authRoles.back_office]}>
      <GrnList />
    ),
    // </AuthGuard>
  },
  {
    path: "/grn/view/:id",
    element: (
      <AuthGuard
        auth={[...authRoles.inventory_manager, ...authRoles.back_office]}
      >
        <GrnDetail />
      </AuthGuard>
    ),
  },
  {
    path: "/grn/create",
    element: (
      // <AuthGuard
      //   auth={[...authRoles.inventory_manager, ...authRoles.back_office]}
      // >
      <GRNCreateForm />
      // { </AuthGuard> }
    ),
  },
];

export default grnRoutes;
