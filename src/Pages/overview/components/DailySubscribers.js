import React from "react";
import { useState } from "react";
import useFetch from "../../../lib/components/Hooks/useFetch"
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Collapse } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const DailySubscribers = ({ styles }) => {

  const [selectedPeriod, setSelectedPeriod] = useState("DAILY");
  // Get chart data
  const { data, isLoading } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/meta/subscribers-count-by-period?period=${selectedPeriod}`)

  const subscribers = data?.data

  const [more, setMore] = React.useState(false);
  const handleMore = () => {
    setMore((prev) => !prev);
  };
  const handleMoreCickAway = () => {
    setMore(false);
  };

  return (
    <div className={styles.daily_subscribers}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>Daily Subscribers</h4>
          <p>View how many subscribers you have daily</p>
        </div>
        <div className={styles.action}>
          <select 
            style={{ 
              padding: "8px", 
              background: "white", 
              outline: "0", 
              borderRadius: "10px", 
              border: "1px solid #ccc"
              }}
            defaultValue={"DAILY"}
            onChange={(e) => {
              setSelectedPeriod(e?.target?.value)
            }}>
            <option value={"DAILY"}>Daily</option>
            <option value={"MONTHLY"}>Monthly</option>
            <option value={"ANNUALLY"}>Annually</option>
          </select>
          <div>
            <ClickAwayListener onClickAway={handleMoreCickAway}>
              <div className={styles.more}>
                <button onClick={handleMore}>
                  <MoreVertIcon />
                </button>
                <div style={{ position: "absolute", right: "0", zIndex: 1 }}>
                  <Collapse in={more}>
                    <ul style={{ border: more ? "1px solid #ccc" : "none" }}>
                      <li>Print PDF</li>
                      <li>Print JPEG</li>
                      <li>Download</li>
                    </ul>
                  </Collapse>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </div>
      <div className={styles.main_subscribers_section}>
        {isLoading && <LoaderComponent />}
        {subscribers &&
        <BarChart width={650} height={300} data={subscribers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateNameShort" />
          <YAxis dataKey="count" />
          <Bar barSize={30} dataKey="count" fill="#6C63F0" />
        </BarChart>}
      </div>
    </div>
  );
};

export default DailySubscribers;
