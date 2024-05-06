interface SubMenuItem {
  name: string;
  path: string;
}
interface MenuItem {
  name: string;
  path: string;
  child?: SubMenuItem[];
  expand?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: "User",
    path: "#",
    child: [
      { name: "Dashboard Monitoring", path: "/user/dashboard-monitoring" },
      { name: "Control Panel", path: "/user/control-panel" },
      {
        name: "Internal Staff Monitoring",
        path: "/user/internal-staff-monitoring",
      },
    ],
  },
  {
    name: "Content",
    path: "/content",
  },
  {
    name: "Trading",
    path: "/trading",
  },
  {
    name: "Play",
    path: "/play",
  },
  {
    name: "Quiz",
    path: "#",
    child: [
      { name: "Quiz List", path: "/quiz" },
      { name: "Quiz Category", path: "/quiz/category" },
      { name: "Question Bank", path: "/quiz/question-bank" },
    ],
  },
  {
    name: "Circle",
    path: "#",
    child: [
      { name: "Control Panel", path: "/circle/control-panel" },
      // { name: "Membership", path: "/circle/membership" },
    ],
  },
  {
    name: "Banner",
    path: "#",
    child: [
      { name: "Main Banner", path: "/banner/main-banner" },
      { name: "Exclusive Offers", path: "/banner/exclusive-offers" },
    ],
  },
  {
    name: "Admin Fee",
    path: "/admin-fee",
  },
  {
    name: "Promo Code",
    path: "/promo-code",
  },
  {
    name: "Seeds Coin Management",
    path: "/seeds-coin-management",
  },
  {
    name: "Blog",
    path: "#",
    child: [
      { name: "Event Highlight", path: "/blog/event-highlight" },
      { name: "Article", path: "/blog/article" },
    ],
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Withdrawal",
    path: "#",
    child: [
      { name: "Withdraw Quiz", path: "/withdraw-quiz" },
      { name: "Withdraw Play", path: "/play/withdraw" },
      { name: "Withdraw Circle", path: "/circle/withdraw" },
      { name: "Disbursement Request", path: "/withdrawal/disbursement-request" },
    ],
  },
  {
    name: "Referral Code",
    path: "/referral-code",
  },
  {
    name: "Push Notification",
    path: "#",
    child: [
      {
        name: "Blast Push Notification",
        path: "/push-notification/blast-push",
      },
      { name: "Welcome Banner", path: "/push-notification/welcome-banner" },
    ],
  },
  {
    name: "Gallery",
    path: "/quiz-gallery",
  },
];

export { menuItems };
export type { MenuItem };
