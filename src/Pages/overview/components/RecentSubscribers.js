import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DefaultImg from "../../../lib/components/defaultImg";


const RecentSubscribers = ({ styles, data }) => {
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
        {data?.map((item, index) => (
          <div key={index} className={styles.subscriber}>
            <div>
              {item?.organizationLogo === "" ? 
                <DefaultImg name={item?.organizationName}/> : 
                <img src={item?.organizationLogo} alt={item?.organizationName} />}
            </div>
            <div>
              <p>{item?.organizationName}</p>
              <p>{new Date(item?.date).toLocaleDateString("en-GB")}</p>
            </div>
            <div>
              <Link to={`/organizations/${item?.organizationId}`} className={styles.view}>
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
