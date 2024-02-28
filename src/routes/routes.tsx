import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "layout/dashboard";
import Login from "pages/login";
import DashboardHome from "pages/dashboard";
import UserControlPanel, { ucpRouteName } from "pages/user/control-panel/control-panel.page";
import Play, { playRouteName } from "pages/play/index.page";

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
        path: "play",
        children: [
          {
            path: playRouteName,
            element: <Play />,
            index: true,
          },
        ],
      },
      { path: "dashboard", element: <DashboardHome /> },
      // {
      //   path: "operating-area",
      //   element: <OperatingAreaIndex />,
      // },
      // {
      //   path: "branch",
      //   element: <Branch />,
      // },
      // {
      //   path: "message",
      //   children: [
      //     {
      //       path: "",
      //       element: <MessagesPage />
      //     },
      //     {
      //       path: "create",
      //       element: <CreateMessage />
      //     },
      //     {
      //       path: ":id",
      //       element: <MessageManagementDetail />
      //     },
      //   ]
      // }
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
