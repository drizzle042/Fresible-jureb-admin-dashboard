import { styled } from '@mui/material/styles';
import styles from "../../styles/styles.module.css";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import useFetch from "../../../../lib/components/Hooks/Requests/useFetch";
import { Activity } from '../../../../lib/components/Endpoints/Endpoints';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { Link } from 'react-router-dom';
  

const AdminLogs = ({ open, setOpen }) => {

  const { data } = useFetch(Activity.getAdminActivities);
  
    let activityTime = (createdAt) => {
      let now = new Date();
      let dateCreated = new Date(createdAt);
      let time = (now - dateCreated)/1000;
      var specificTime
  
      if (time < 60){
        specificTime = Math.ceil(time) + " secs";
      }else if (time >= 60 && time < 3600){
        specificTime = Math.ceil(time/60) + " mins";
      }else if(time >= 3600 && time < 86400){
        specificTime = Math.ceil(time/3600) + " hrs";
      }else {
        specificTime = Math.ceil(time/86400) + " days";
      }
  
      return specificTime
    };
  
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
                width: 500,
                boxSizing: 'border-box',
                height: '400px',
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
            <Divider/>
            <div className={styles.user_logs} style={{height:'400px',overflowY:'auto'}}>
              {data?.data?.slice(0,20).map((item, index) => (
                <div key={index}>
                { index > 0 && <Divider /> }
                <div
                  style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#fff" }}
                  className={styles.log}
                >
                  <div>
                    <span className='text sm'>{item?.replacers[0]?.name}</span>
                    <span className='text sm'>{item?.text?.replace("$1", "").replace("$2", item?.replacers[1]?.name).replace("$3", item?.replacers[2]?.name).replace("$4", item?.replacers[3]?.name)}</span>
                  </div>
                  <div  className={[styles.time,'text sm'].join(' ')}>{
                    item?.createdAt ?
                      `${activityTime(item?.createdAt)} ago` :
                      "unknown time"
                  }</div>
                </div>
                </div>
              ))}
            </div>
            <Divider/>
            <div className='blue' style={{padding:'15px 20px'}}>
              <Link to="/admin-activities">
                See all
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: 12 }} />
                </span>
              </Link>
            </div>
            
          </Drawer>
        </Box>
    );
};

export default AdminLogs;