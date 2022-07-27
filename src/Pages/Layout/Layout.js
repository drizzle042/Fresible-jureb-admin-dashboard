import { Box } from "@mui/material";
import React from "react";
import Header from "./Components/Header/Header";
import OrgModal from "./Components/Sidebar/Components/OrgModal";
import Sidebar from "./Components/Sidebar/Sidebar";

const drawerWidth = 240;
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      {open && <OrgModal setOpen={setOpen} />}
      <Box sx={{ display: "flex" }}>
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          setOpen={setOpen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Header handleDrawerToggle={handleDrawerToggle} />
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
