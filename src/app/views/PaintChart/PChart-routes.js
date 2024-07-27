import { lazy } from "react";
import Loadable from "app/components/Loadable";


const PaintChart = Loadable(lazy(() => import('../PaintChart/PaintColorChart')))



const PChartRoutes = [
  {
    path: "/paintchart",
    element: <PaintChart />
  },
];

export default PChartRoutes;
