import { lazy } from "react";
import Loadable from "app/components/Loadable";

const Wishlist = Loadable(lazy(() => import('../../views/wishlist/WishlistPage')));

const wishlistRoutes = [
  {
    path: "/wishlist",
    element: <Wishlist />
  }
];

export default wishlistRoutes;
