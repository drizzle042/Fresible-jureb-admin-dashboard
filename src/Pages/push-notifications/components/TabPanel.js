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
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
        onChange={handleChange}
      >
        <Tab
          label={<TabLabel styles={styles} title="All" label={data?.data?.all} />}
          value=""
        />
        <Tab
          label={<TabLabel styles={styles} title="Sent" label={data?.data?.sent} />}
          value="SENT"
        />
        <Tab
          label={<TabLabel styles={styles} title="Scheduled" label={data?.data?.scheduled} />}
          value="SCHEDULED"
        />
      </TabList>
    </div>
  );
};

export default TabHeaders;
