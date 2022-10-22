import React from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Chip from "@mui/material/Chip";

const TabLabel = ({ title, label, styles }) => {
  return (
    <div className={styles.tabs}>
      <span>{title}</span>
      <Chip label={label} />
    </div>
  );
};

const TabHeaders = ({ handleChange, styles, data }) => {
  return (
    <div style={{ borderBottom: "1px solid #ccc" }}>
      <TabList
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
      >
        <Tab
          label={<TabLabel styles={styles} title="All" label={data?.data?.all} />}
          value={""}
        />
        <Tab
          label={<TabLabel styles={styles} title="Monthly" label={data?.data?.monthly} />}
          value={"MONTHLY"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Quarterly" label={data?.data?.quarterly} />}
          value={"QUARTERLY"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Bi-annually" label={data?.data?.biannually} />}
          value={"BIANNUALLY"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Annually" label={data?.data?.annually} />}
          value={"ANNUALLY"}
        />
      </TabList>
    </div>
  );
};

export default TabHeaders;
