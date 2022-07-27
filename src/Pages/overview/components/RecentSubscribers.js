import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import orgImage from "../assets/images/active-users.png";


const RecentSubscribers = ({ styles, data }) => {

  const subscribers = data;

  return (
    <div className={styles.recent_subscribers}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>Recent Subscribers</h4>
          <p>Report Center</p>
        </div>
      </div>
      <Divider />
      <div className={styles.subscribers}>
        {subscribers?.map((item, index) => (
          <div key={index} className={styles.subscriber}>
            <div>
              <img src={orgImage} alt={item?.name} />
            </div>
            <div>
              <p>{item?.name}</p>
              <p>{new Date(item?.joinDate).toLocaleDateString("en-GB")}</p>
            </div>
            <div>
              <Link to={`/organizations/${item?.orgId}`} className={styles.view}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.allWrapper}>
        <Divider />
        <div className={styles.viewAll}>
          <Link to="/organizations">
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

export default RecentSubscribers;
