import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "layout/dashboard";
import Login from "pages/login";
import DashboardHome from "pages/dashboard";
import UserControlPanel, {
  ucpRouteName,
} from "pages/user/control-panel/control-panel.page";
import Play, { playRouteName } from "pages/play/index.page";
import SeedsAcademyList, {
  salRouteName,
} from "pages/seeds-academy/seeds-academy-list";
import CreateSeedsAcademy, {
  csaRouteName,
} from "pages/seeds-academy/seeds-academy-list/main/create.page";
import UpdateSeedsAcademy, {
  usaRouteName,
} from "pages/seeds-academy/seeds-academy-list/main/update.page";
import DetailCategory, {
  dcRouteName,
} from "pages/seeds-academy/seeds-academy-list/main/detail.page";
import CreateClass, {
  ccRouteName,
} from "pages/seeds-academy/seeds-academy-list/main/create-class.page";
import SubcriptionPlan, {
  spRouteName,
} from "pages/seeds-academy/subcription-plan";
import PlayDetail, { pdRouteName } from "pages/play/detail.page";
import CreatePlay, { cpRouteName } from "pages/play/create.page";
import WithdrawPlay, { wpRouteName } from "pages/play/withdraw.page";
import QuizList, { qlRouteName } from "pages/quiz/index.page";
import CreateQuiz, { cqRouteName } from "pages/quiz/create.page";
import UpdateQuiz, { uqRouteName } from "pages/quiz/update.page";
import QuestionBank, { qbRouteName } from "pages/quiz/question-bank.page";
import QuizGallery from "pages/gallery/index.page";
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
import Article, { articleRouteName } from "pages/blog/article/index.page";
import XPManagement, { xpRouteName } from "pages/xp-management/index.page";
import FormArticle, {
  createArticleRouteName,
  editArticleRouteName,
} from "pages/blog/article/form-article.page";
import CategoryListPage, {
  categoryQuizRouteName,
} from "pages/quiz/category-list.page";
import DisbursementRequest, {
  dRequestRouteName,
} from "pages/withdrawal/disbursement-request/index.page";
import Events, {
  eventsRouteName,
} from "pages/homepage-feature/events/index.page";
import CreateEvent, {
  cEventsRouteName,
} from "pages/homepage-feature/events/create.page";
import UpdateEvent, {
  uEventsRouteName,
} from "pages/homepage-feature/events/update.page";
import DetailEvent, {
  dEventsRouteName,
} from "pages/homepage-feature/events/detail.page";
import OpenAccount, {
  openAccountRouteName,
} from "pages/homepage-feature/open-account/index.page";
import CreateOpenAccount, {
  cOpenAccountRouteName,
} from "pages/homepage-feature/open-account/create.page";
import UpdateOpenAccount, {
  uOpenAccountRouteName,
} from "pages/homepage-feature/open-account/update.page";
import WithdrawQuiz, { withdrawQuizRouteName } from "pages/quiz/withdraw.page";
import Company from "pages/company/index.page";
import TeamBattle, { teamBattleRouteName } from "pages/team-battle/index.page";
import SeedsCoinManagement, {
  seedsCoinRouteName,
} from "pages/seeds-coin-management/index.page";
import UpdateCompany, {
  updateCompanyRouteName,
} from "pages/company/update.page";
import DetailCompany, {
  detailCompanyRouteName,
} from "pages/company/detail.page";
import UpsertBlastNotif, {
  ubnRouteName,
} from "pages/push-notification/blast-push-notification/upsert.page";
import DetailQuiz, { dqRouteName } from "pages/quiz/detail.page";

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
        path: "blog",
        children: [
          {
            path: articleRouteName,
            element: <Article />,
            index: true,
          },
          {
            path: createArticleRouteName,
            element: <FormArticle />,
            index: true,
          },
          {
            path: editArticleRouteName,
            element: <FormArticle />,
            index: true,
          },
        ],
      },
      {
        path: "homepage-feature",
        children: [
          { path: eventsRouteName, element: <Events />, index: true },
          { path: cEventsRouteName, element: <CreateEvent /> },
          { path: uEventsRouteName, element: <UpdateEvent /> },
          { path: dEventsRouteName, element: <DetailEvent /> },
          { path: openAccountRouteName, element: <OpenAccount /> },
          { path: cOpenAccountRouteName, element: <CreateOpenAccount /> },
          { path: uOpenAccountRouteName, element: <UpdateOpenAccount /> },
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
      { path: teamBattleRouteName, element: <TeamBattle /> },
      {
        path: "seeds-academy",
        children: [
          {
            path: salRouteName,
            element: <SeedsAcademyList />,
          },
          {
            path: csaRouteName,
            element: <CreateSeedsAcademy />,
          },
          {
            path: usaRouteName,
            element: <UpdateSeedsAcademy />,
          },
          {
            path: dcRouteName,
            element: <DetailCategory />,
          },
          {
            path: ccRouteName,
            element: <CreateClass />,
          },
          {
            path: spRouteName,
            element: <SubcriptionPlan />,
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
          {
            path: dqRouteName,
            element: <DetailQuiz />,
          },
          {
            path: categoryQuizRouteName,
            element: <CategoryListPage />,
          },
          {
            path: qbRouteName,
            element: <QuestionBank />,
          },
          {
            path: withdrawQuizRouteName,
            element: <WithdrawQuiz />,
          },
        ],
      },
      { path: promoCodeRouteName, element: <PromoCode /> },
      { path: seedsCoinRouteName, element: <SeedsCoinManagement /> },
      { path: xpRouteName, element: <XPManagement /> },
      { path: afRouteName, element: <AdminFee /> },
      {
        path: "company",
        children: [
          { path: "", element: <Company /> },
          { path: updateCompanyRouteName, element: <UpdateCompany /> },
          { path: detailCompanyRouteName, element: <DetailCompany /> },
        ],
      },
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
          {
            path: ubnRouteName,
            element: <UpsertBlastNotif />,
          },
          {
            path: `${ubnRouteName}/:id`,
            element: <UpsertBlastNotif />,
          },
        ],
      },
      {
        path: "withdrawal",
        children: [
          {
            path: dRequestRouteName,
            element: <DisbursementRequest />,
            index: true,
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
      { path: "quiz-gallery", element: <QuizGallery /> },
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
