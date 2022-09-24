import React from "react";
import { useState, useRef } from "react";
import useFetch from "../../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Collapse } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import ReactToPrint from "react-to-print";

const DailySubscribers = ({ styles }) => {

  const [selectedPeriod, setSelectedPeriod] = useState("DAILY");

  function handleSelect(e){
    setSelectedPeriod(e?.target?.value);
  };
  // Get chart data
  const { data, isLoading } = useFetch(
    `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/meta/subscribers-count-by-period?period=${selectedPeriod}`
  );

  const subscribers = data?.data;
  const componentRef = useRef();
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
          <div className={styles.select_bar}>
            <Select
              className={styles.input}
              fullWidth
              size="small"
              displayEmpty
              value={selectedPeriod}
              onChange={handleSelect}
            >
              <MenuItem value="DAILY">Daily</MenuItem>
              <MenuItem value="MONTHLY">Monthly</MenuItem>
              <MenuItem value="ANNUALLY">Annually</MenuItem>
            </Select>
          </div>
          <div>
            <ClickAwayListener onClickAway={handleMoreCickAway}>
              <div className={styles.more}>
                <button onClick={handleMore}>
                  <MoreVertIcon />
                </button>
                <div style={{ position: "absolute", right: "0", zIndex: 1 }}>
                  <Collapse in={more}>
                    <ul style={{ border: more ? "1px solid #ccc" : "none" }}>
                      <ReactToPrint
                        trigger={() => <li>Print PDF</li>}
                        content={() => componentRef.current}
                      />
                    </ul>
                  </Collapse>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </div>
      <div className={styles.main_subscribers_section} ref={componentRef}>
        {isLoading && <LoaderComponent />}
        {subscribers && (
          <BarChart width={650} height={300} data={subscribers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateNameShort" />
            <YAxis dataKey="count" />
            <Bar barSize={30} dataKey="count" fill="#6C63F0" />
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default DailySubscribers;
