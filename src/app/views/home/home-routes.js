import { lazy } from "react";
import Loadable from "app/components/Loadable";


const Home = Loadable(lazy(() => import('../home/MainLayout.jsx')))


const homeRoutes = [
  {
    path: "/Home",
    element: <Home />
  }
];

export default homeRoutes;
