import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const SubscribersByLocation = ({ styles, data }) => {
  
  const subscribers = data;
  
  return (
    <div className={styles.recent_subscribers}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>Subscribers by Location</h4>
        </div>
      </div>
      <Divider />
      <div className={styles.sub_by_location}>
        {subscribers?.map((item, index) => (
          <div key={index}>
            <div className={styles.location}>
              <div>{item?.name}</div>
              <div>{item?.totaldocs?.toLocaleString()}</div>
              <div>
                <Link to={`/organizations/${index}`}>View details</Link>
              </div>
            </div>
            {index !== subscribers?.length - 1 && <Divider />}
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

export default SubscribersByLocation;
