import { createBrowserRouter } from "react-router-dom";
import DevicePage from "../views/devicePage";
import Devices from "../views/devices";
import Home from "../views/home";
import PageNotFound from "../views/pageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/devices",
    element: <Devices />,
  },
  {
    path: "/devices/:devicename",
    element: <DevicePage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
