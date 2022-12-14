import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const SubscribersByLocation = ({ styles, data }) => {
  return (
    <div className={styles.recent_subscribers}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>Subscribers by Location</h4>
        </div>
      </div>
      <Divider />
      <div className={styles.sub_by_location}>
        {data?.map((item, index) => (
          <div key={index}>
            <div className={styles.location}>
              <div>{item?.state}</div>
              <div>{item?.count}</div>
              <div>
                <Link to={`/subs-by-location/${item?.state?.toLowerCase()}`}>View details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.allWrapper}>
        <Divider />
        <div className={styles.viewAll}>
          <Link to="/subs-by-location">
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
