import { useState } from "react";
import { styled } from '@mui/material/styles';
import styles from "../../styles/styles.module.css";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Userimage from "../../../../lib/assets/images/user-img.png";
import Google from "../../../../lib/assets/images/google.png";
import CloseIcon from "@mui/icons-material/Close";
  

const AdminLogs = ({ open, setOpen }) => {

    const [notifications, ]=  useState([
      {id:1,
        image: Google,
        name: "Oregon",
        message:"subscribed to the standard plan",
        time:"2 mins ago"
      },
      {id:2,
        image:Userimage,
        name: "Medows",
        message:"subscribed to the standard plan",
        time:"3 mins ago"
      },
      {id:1,
        image: Google,
        name: "Oregon",
        message:"subscribed to the standard plan",
        time:"2 mins ago"
      },
      {id:2,
        image:Userimage,
        name: "Medows",
        message:"subscribed to the standard plan",
        time:"3 mins ago"
      },
      {id:1,
        image: Google,
        name: "Oregon",
        message:"subscribed to the standard plan",
        time:"2 mins ago"
      },
    ])
    
    function displayDrawer(isOpen) {
        if (isOpen === false) {
        return "none"
        }
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

    return ( 
        <Box sx={{ display: () => displayDrawer(open), position: "absolute" }}>
          <Drawer
            sx={{
              cursor:"pointer",
              width: 600,
              height: 20,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 600,
                boxSizing: 'border-box',
                height: 'calc(100% - 124px)',
                boxShadow: 4,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader style={{display:"flex", justifyContent:"space-between", marginTop:"15px", marginLeft:"0.8rem"}}>
              <h3>Notifications</h3>
              <CloseIcon onClick={handleDrawerClose}></CloseIcon>
            </DrawerHeader>
            <div className={styles.user_logs}>
              {notifications.map((data, index) => {
                return(
                  <TableRow 
                    key={index} 
                    sx={{ border: 0, backgroundColor: index % 2 === 0 ? "#F3F3F6" : "#fff" }} 
                    className={styles.log}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ border: 0 }}>
                      <img src={data.image} alt="logo"></img>
                    </TableCell>
                    <TableCell 
                      align="left"
                      sx={{ border: 0 }}>
                        <span className={styles.log_text}>{data.name} {data.message}</span>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ border: 0 }}>
                      <span className={styles.time}>{data.time}</span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </div>
          </Drawer>
        </Box>
    );
};

export default AdminLogs;