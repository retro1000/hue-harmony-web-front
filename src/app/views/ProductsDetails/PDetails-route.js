import { lazy } from "react";
import Loadable from "app/components/Loadable";


const ProductsDetails = Loadable(lazy(() => import('../ProductsDetails/ProductDetails')))



const productsDetails = [
  {
    path: "/productDetails",
    element: <ProductsDetails />
  },
];

export default productsDetails;
