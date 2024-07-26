import { lazy } from "react";
import Loadable from "app/components/Loadable";


const PaintChart = Loadable(lazy(() => import('../PaintChart/PaintColorChart')))
const Abc = Loadable(lazy(() => import('../PaintChart/abc')))


const PChartRoutes = [
  {
    path: "/paintchart",
    element: <PaintChart />
  },
  {
    path: "/abc",
    element: <Abc />
  },
  
];

export default PChartRoutes;
