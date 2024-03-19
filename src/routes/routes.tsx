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
import ExclusiveOffer, {
  exclussiveBannerRouteName,
} from "pages/banner/ExclussiveOffer";
import CreateMainBanner, { cmbRouteName } from "pages/banner/main/create.page";
import UpdateMainBanner, { umbRouteName } from "pages/banner/main/update.page";
import CreateExclussiveBanner, {
  cebRouteName,
} from "pages/banner/exclusive/create.page";
import UpdateExclussiveBanner, {
  uebRouteName,
} from "pages/banner/exclusive/update.page";
import PromoCode, { promoCodeRouteName } from "pages/promo-code/index.page";
import WelcomeBanner, {
  welcomeBannerRouteName,
} from "pages/push-notification/welcome-banner/index.page";
import CreateWelcomeBanner, {
  cwbRouteName,
} from "pages/push-notification/welcome-banner/create.page";
import UpdateWelcomeBanner, {
  uwbRouteName,
} from "pages/push-notification/welcome-banner/update.page";
import BlastPushNotification, {
  pushNotifRouteName,
} from "pages/push-notification/blast-push-notification/index.page";

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
      { path: promoCodeRouteName, element: <PromoCode /> },
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
            index: true,
          },
          {
            path: exclussiveBannerRouteName,
            element: <ExclusiveOffer />,
          },
          {
            path: cmbRouteName,
            element: <CreateMainBanner />,
          },
          {
            path: umbRouteName,
            element: <UpdateMainBanner />,
          },
          {
            path: cebRouteName,
            element: <CreateExclussiveBanner />,
          },
          {
            path: uebRouteName,
            element: <UpdateExclussiveBanner />,
          },
        ],
      },
      {
        path: "push-notification",
        children: [
          {
            path: pushNotifRouteName,
            element: <BlastPushNotification />,
            index: true,
          },
          {
            path: welcomeBannerRouteName,
            element: <WelcomeBanner />,
          },
          {
            path: cwbRouteName,
            element: <CreateWelcomeBanner />,
          },
          {
            path: uwbRouteName,
            element: <UpdateWelcomeBanner />,
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
