import { lazy } from "react";
import Loadable from "app/components/Loadable";
import { authRoles } from "app/auth/authRoles";
import AuthGuard from "app/auth/AuthGuard";

const AddProduct = Loadable(lazy(() => import("./AddProduct")));
const ProductList = Loadable(lazy(() => import("./ProductList")));
const StoreProductList = Loadable(lazy(() => import("./StoreProductList")));
const ProductView = Loadable(lazy(() => import("./ProductView")));
const FilterProduct = Loadable(lazy(() => import('./FilterProduct.jsx')))
const UpdateProduct = Loadable(lazy(() => import('./UpdateProduct.jsx')))
//inventory variation view
const productRoutes = [
  {
    path: "/product/list",
    element: (
      <AuthGuard auth={[...authRoles.back_office, ...authRoles.inventory_manager]}>
        <ProductList />
      </AuthGuard>
    ),
  },
  {
    path: "/product/store/list",
    element: (
      // <AuthGuard auth={authRoles.admin}>
        <StoreProductList />
      // </AuthGuard>
    ),
  },
  {
    path: "/product/update",
    element: (
      <AuthGuard auth={authRoles.admin}>
        <UpdateProduct />
       </AuthGuard>
    ),
  },
  {
    path: "/product/create",
    element: (
      // <AuthGuard auth={authRoles.admin}>
        <AddProduct />
      // </AuthGuard>
    ),
  },
 
  //ProductDetails link to /product/details/view/:id
  //single variation view
  {
    path: "/product/detail/:id",
    element: (
      <AuthGuard auth={authRoles.admin}>
        <ProductView />
      </AuthGuard>
    ),
  },
  {
    path: "/product/view/:id",
    element: (
      <AuthGuard auth={authRoles.userOrGuest}>
        <ProductView />
      </AuthGuard>
    ),
  },
  {
    path: "/product/filter-product",
    element: (
      <AuthGuard auth={authRoles.userOrGuest}>
        <FilterProduct />
      </AuthGuard>
    )
  }
];

export default productRoutes;
