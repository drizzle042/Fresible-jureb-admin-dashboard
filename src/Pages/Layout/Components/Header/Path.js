import { useLocation } from "react-router-dom";

const content = [
  {
    title: "Profile",
    subtitle: "Welcome! You can make changes to your account from here",
    path: "organization-profile",
  },
  {
    title: "Account Settings",
    subtitle: "Manage all your account preferences on this page",
    path: "account",
  },
  {
    title: "Dashboard",
    subtitle: "Welcome! You are exploring your financial dashboard",
    path: "dashboard",
  },
  {
    title: "Account Settings",
    subtitle: "Manage all your account preferences on this page",
    path: "settings",
  },
  {
    title: "Payslip",
    subtitle: "You can view all current and past payslip information here",
    path: "payslip",
  },

  {
    title: "Performance Evaluation",
    subtitle: "Manage all past and ongoing evaluations here.",
    path: "performance-evaluation",
  },
  {
    title: "Resignation",
    subtitle: "Start your off boarding process here",
    path: "resignation",
  },
  {
    title: "Query",
    subtitle: "Manage your query here.",
    path: "query",
  },
  {
    title: "Memo",
    subtitle: "You can manage memos sent here",
    path: "memo",
  },
  {
    title: "Meetings",
    subtitle: "You can manage all meetings scheduled here",
    path: "meetings",
  },
  {
    title: "Leave Management",
    subtitle: "You can manage employee Leave applications from here.",
    path: "leave",
  },
];
const Path = () => {
  const { pathname } = useLocation();
  const checkPath = () => {
    const path = pathname.split("/");
    const items = content.filter((item) =>
      path[2] === "human-resources"
        ? item.path === path[3]
        : path[2] === "organization-profile"
        ? item.path === path[2]
        : path[1] === "account"
        ? item.path === path[1]
        : path[2] === "payslip"
        ? item.path === path[2]
        : item.path === path[1]
    );
    return items;
  };

  return { checkPath };
};

export default Path;
