import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./Pages/Authentication/SignIn/SignIn";
import Reset from "./Pages/Authentication/Components/Resetpassword/reset";
import Home from "./Pages/Home/Home";
import Overview from "./Pages/overview/Overview";
import UserLogs from "./Pages/overview/activity logs/UserLogs";
import AdminLogs from "./Pages/overview/activity logs/AdminLogs";
import SubsByLocation from "./Pages/overview/subs by location/SubsByLocation";
import SubsByPreciseLocation from "./Pages/overview/subs by location/SubsByPreciseLocation";
import Organizations from "./Pages/organization/Organizations";
import Members from "./Pages/organization/organization members/Users";
import ViewOrganization from "./Pages/organization/ViewOrganization";
import ViewOrgContactPerson from "./Pages/organization/ViewOrgContactPerson";
import OrganizationInvoicespdf from "./Pages/organization/components/Organizationinvoicepdf";
import Payments from "./Pages/payments/Payments";
import Notifications from "./Pages/push-notifications/Notifications";
import Settings from "./Pages/settings/Settings";
import Users from "./Pages/users/Users";
import Resetmail from "./Pages/Authentication/Components/Resetpassword/resetmail";
import Resetpage from "./Pages/Authentication/Components/Resetpassword page/resetpage";

const UserAccount = createContext()

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#343A40",
        dark: "#343A40",
      },
      secondary: {
        main: "#1F53D7",
      },
      danger: {
        main: "#FF0303",
      },
      success: {
        main: "#00DC7D",
      },
      gray: {
        main: "#BDBDBD",
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
    },
  });

  const [profile, setProfile] = useState(null)

  // const IsRoot = () => {
  //   if (profile?.data?.roleName  === "ROOT"){
  //     return <Users />
  //   } else {
  //     return <Navigate to={"/signin"} replace />
  //   }
  // }

  return (
    <ThemeProvider theme={theme}>
      <UserAccount.Provider value={[profile, setProfile]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/:id" element={<ViewOrganization />} />
            <Route path="/organizationUsers/:id" element={<ViewOrgContactPerson />} />
            <Route path="/organizations/pdf/:id" element={<OrganizationInvoicespdf />} />
            <Route path="/organizations/members/:id" element={<Members />} />
            <Route path="/organizations-activities" element={<UserLogs />} />
            <Route path="/admin-activities" element={<AdminLogs />} />
            <Route path="/subs-by-location" element={<SubsByLocation />} />
            <Route path="/subs-by-location/:state" element={<SubsByPreciseLocation />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/request-password-reset" element ={<Reset />} />
            <Route path="/success-check-your-mail" element ={<Resetmail />} />
            <Route path="/update-password" element ={<Resetpage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </BrowserRouter>
      </UserAccount.Provider>
    </ThemeProvider>
  );
}

export { App, UserAccount };
