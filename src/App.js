import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./Pages/Authentication/SignIn/SignIn";
import Home from "./Pages/Home/Home";
import Overview from "./Pages/overview/Overview";
import { Organizations } from "./Pages/organization/Organizations";
import ViewOrganization from "./Pages/organization/ViewOrganization";
import Payments from "./Pages/payments/Payments";
import Notifications from "./Pages/push-notifications/Notifications";
import Settings from "./Pages/settings/Settings";
import Users from "./Pages/users/Users";
import Security from "./Pages/settings/Security";

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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:id" element={<ViewOrganization />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<Settings />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
