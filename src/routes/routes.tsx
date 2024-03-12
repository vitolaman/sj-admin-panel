import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "layout/dashboard";
import Login from "pages/login";
import DashboardHome from "pages/dashboard";
import UserControlPanel, {
  ucpRouteName,
} from "pages/user/control-panel/control-panel.page";
import Play, { playRouteName } from "pages/play/index.page";
import PlayDetail, { pdRouteName } from "pages/play/detail.page";
import CreatePlay, { cpRouteName } from "pages/play/create.page";
import WithdrawPlay, { wpRouteName } from "pages/play/withdraw.page";
import QuizList, { qlRouteName } from "pages/quiz/index.page";
import CreateQuiz, { cqRouteName } from "pages/quiz/create.page";
import UpdateQuiz, { uqRouteName } from "pages/quiz/update.page";
import ControlPanel from "pages/circle/ControlPanel";
import CircleDetail, { circleDetailRouteName } from "pages/circle/CircleDetail";
import Membership, { circleMembershipRouteName } from "pages/circle/Membership";
import WithdrawPage, { circleWithdrawRouteName } from "pages/circle/Withdrawal";
import MainBanner, { mainBannerRouteName } from "pages/banner/MainBanner";
import AdminFee, { afRouteName } from "pages/admin-fee/index.page";

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
          {
            path: pdRouteName,
            element: <PlayDetail />,
          },
          {
            path: cpRouteName,
            element: <CreatePlay />,
          },
          {
            path: wpRouteName,
            element: <WithdrawPlay />,
          },
        ],
      },
      {
        path: "quiz",
        children: [
          {
            path: qlRouteName,
            element: <QuizList />,
            index: true,
          },
          {
            path: cqRouteName,
            element: <CreateQuiz />,
          },
          {
            path: uqRouteName,
            element: <UpdateQuiz />,
          },
        ],
      },
      { path: afRouteName, element: <AdminFee /> },
      { path: "dashboard", element: <DashboardHome /> },
      {
        path: "circle",
        children: [
          {
            path: "control-panel",
            element: <ControlPanel />,
            index: true,
          },
          {
            path: circleDetailRouteName,
            element: <CircleDetail />,
          },
          {
            path: circleMembershipRouteName,
            element: <Membership />,
          },
          {
            path: circleWithdrawRouteName,
            element: <WithdrawPage />,
          },
        ],
      },
      {
        path: "banner",
        children: [
          {
            path: mainBannerRouteName,
            element: <MainBanner />,
          },
        ],
      },
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
