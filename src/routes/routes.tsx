import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "layout/dashboard";
import Login from "pages/login";
import DashboardHome from "pages/dashboard";

const protectedRoutes: RouteObject[] = [
  { path: "", element: <Navigate to="/dashboard" /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardHome />, index: true },
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
  { path: "*", element: <Navigate to="/dashboard" /> },
];

const publicRoutes: RouteObject[] = [
  { path: "", element: <Login /> },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

export { publicRoutes, protectedRoutes };
