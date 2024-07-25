import { lazy } from "react";
import Loadable from "app/components/Loadable";


const AboutPage = Loadable(lazy(() => import('../AboutPage/AboutPage')))


const aboutRoutes = [
  {
    path: "/About",
    element: <AboutPage />
  }
];

export default aboutRoutes;
