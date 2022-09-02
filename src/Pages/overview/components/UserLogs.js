import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const UserLogs = ({ data, styles }) => {

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

  return (
    <div className={styles.recent_subscribers}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>User Logs</h4>
        </div>
      </div>
      <Divider />
      <div className={styles.user_logs}>
        {data?.map((item, index) => (
          <div
            style={{ backgroundColor: index % 2 === 0 ? "#F3F3F6" : "#fff" }}
            key={index}
            className={styles.log}
          >
            <div>
              <span>{item?.replacers[0]?.name}</span>
              {item?.text?.replace("$1", "").replace("$2", item?.replacers[1]?.name).replace("$3", item?.replacers[2]?.name).replace("$4", item?.replacers[3]?.name)}
            </div>
            <div>{
              item?.createdAt ?
                `${activityTime(item?.createdAt)} ago` :
                "unknown time"
            }</div>
          </div>
        ))}
      </div>
      <div className={styles.allWrapper}>
        <Divider />
        <div className={styles.viewAll}>
          <Link to="/organizations-activities">
            See all
            <span>
              <ArrowForwardIosIcon style={{ fontSize: 12 }} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogs;
