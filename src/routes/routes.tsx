import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "layout/dashboard";
import Login from "pages/login";
import UserControlPanel, {
  ucpRouteName,
} from "pages/user/control-panel/control-panel.page";
import Play, { playRouteName } from "pages/item/index.page";
import Pending, { pendingRouteName } from "pages/pending-stock/index.page";
import ItemDetail, { idRouteName } from "pages/item/detail.page";
import CreateItem, { ciRouteName } from "pages/item/create.page";
import Client, { clientRouteName } from "pages/client/index.page";
import ClientDetail, { cdRouteName } from "pages/client/detail.page";
import CreateClient, { ccRouteName } from "pages/client/create.page";
import IncomingStockList, { isiRouteName } from "pages/incoming-stock/index.page";
import IncomingStockDetail, { isdRouteName } from "pages/incoming-stock/detail.page";

const protectedRoutes: RouteObject[] = [
  { path: "", element: <Navigate to="/user/control-panel" /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "not-found", element: <>Page Not Found</> },
      {
        path: "user",
        children: [
          {
            path: ucpRouteName,
            element: <UserControlPanel />,
            index: true,
          },
        ],
      },
      {
        path: "item",
        children: [
          {
            path: playRouteName,
            element: <Play />,
            index: true,
          },
          {
            path: idRouteName,
            element: <ItemDetail />,
          },
          {
            path: ciRouteName,
            element: <CreateItem />,
          },
        ],
      },
      {
        path: "Gudang",
        children: [
          {
            path: isiRouteName,
            element: <IncomingStockList />,
            index: true,
          },
          {
            path: isdRouteName,
            element: <IncomingStockDetail />,
          },
        ],
      },
      {
        path: "pending-item",
        children: [
          {
            path: pendingRouteName,
            element: <Pending />,
            index: true,
          },
        ],
      },
      {
        path: "client",
        children: [
          {
            path: clientRouteName,
            element: <Client />,
            index: true,
          },
          {
            path: cdRouteName,
            element: <ClientDetail />,
          },
          {
            path: ccRouteName,
            element: <CreateClient />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/not-found" /> },
];

const publicRoutes: RouteObject[] = [
  { path: "", element: <Login /> },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

export { publicRoutes, protectedRoutes };
