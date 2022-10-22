import React, { useContext, useEffect } from "react";
import { UserAccount } from "../../App";
import useFetch from "../../lib/components/Hooks/Requests/useFetch";
import { Account } from "../../lib/components/Endpoints/Endpoints";
import { Box } from "@mui/material";
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
  
  const [, setProfile] = useContext(UserAccount)
  const { data } = useFetch(Account.getAccount)
  // Put User profile in a global state
  useEffect(() => {
    if (data){
      setProfile(data)
    }
  }, [data, setProfile])
  
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
          <div style={{marginTop:'80px'}}>
            {children}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
