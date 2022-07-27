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

const TabHeaders = ({ handleChange, styles }) => {
  return (
    <div style={{ borderBottom: "1px solid #ccc" }}>
      <TabList
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
      >
        <Tab
          label={<TabLabel styles={styles} title="All" label={112} />}
          value={"1"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Monthly" label={12} />}
          value={"2"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Quarterly" label={52} />}
          value={"3"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Bi-annually" label={52} />}
          value={"4"}
        />
        <Tab
          label={<TabLabel styles={styles} title="Annually" label={87} />}
          value={"5"}
        />
      </TabList>
    </div>
  );
};

export default TabHeaders;
