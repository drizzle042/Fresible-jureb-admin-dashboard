import React from "react";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import Image1 from "./assets/images/total-users.png";
import Image2 from "./assets/images/active-users.png";
import Image3 from "./assets/images/total-revenue.png";
import { Grid } from "@mui/material";
import DailySubscribers from "./components/DailySubscribers";
import RecentSubscribers from "./components/RecentSubscribers";
import UserLogs from "./components/UserLogs";
import SubscribersByLocation from "./components/SubscribersByLocation";
import useFetch from "../../lib/components/Hooks/useFetch"
import LoaderComponent from "../../lib/components/LoaderComponent/Loader"
import FetchError from "../../lib/components/Hooks/FetchError"



const Overview = () => {

  // Get requests and Overview data
  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/meta/overview`);

  const recentSubs = data?.data?.recentSubscribers?.slice(0, 4);

  return (
    <Layout>
     
      <main className={styles.main}>
        
        {isLoading && <LoaderComponent />}
        {error && <FetchError error={error} />}
        {data && 
            <section>
              <div className={styles.reports}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div className={styles.report_content}>
                      <p>Total Users</p>
                      <div className={styles.img}>
                        <img src={Image1} alt="Total Users" />
                      </div>
                      <h3>{data?.data?.topStats?.usersCount.toLocaleString()}</h3>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div className={styles.report_content}>
                      <p>Active Users</p>
                      <div className={styles.img}>
                        <img src={Image2} alt="Active Users" />
                      </div>
                      <h3>{data?.data?.topStats?.activeUsersCount.toLocaleString()}</h3>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div className={styles.report_content}>
                      <p>Total Revenue</p>
                      <div className={styles.img}>
                        <img src={Image3} alt="Total Revenue" />
                      </div>
                      <h3>₦{data?.data?.topStats?.totalRevenue.toLocaleString()}</h3>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className={styles.reports}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <DailySubscribers styles={styles} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <RecentSubscribers styles={styles} data={recentSubs}/>
                  </Grid>
                </Grid>
              </div>
              <div className={styles.reports}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <UserLogs data={data?.data?.logs} styles={styles} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <SubscribersByLocation styles={styles} data={data?.data?.subscribersByLocation}/>
                  </Grid>
                </Grid>
              </div>
            </section>
        }
      </main>
    </Layout>
  );
};

export default Overview;
