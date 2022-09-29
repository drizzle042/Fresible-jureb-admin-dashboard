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
          label={<TabLabel styles={styles} title="All" label={data?.data?.length} />}
          value="1"
        />
        <Tab
          label={<TabLabel styles={styles} title="Sent" label={data?.data?.filter(i => i?.scheduled !== true).length} />}
          value="2"
        />
        <Tab
          label={<TabLabel styles={styles} title="Scheduled" label={data?.data?.filter(i => i?.scheduled === true).length} />}
          value="3"
        />
      </TabList>
    </div>
  );
};

export default TabHeaders;
