import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const subscribers = [
  { id: "1", day: "Sunday", total_subscribers: 0 },
  { id: "2", day: "Monday", total_subscribers: 0 },
  { id: "3", day: "Tuesday", total_subscribers: 0 },
  { id: "4", day: "Wednesday", total_subscribers: 1 },
  { id: "5", day: "Thursday", total_subscribers: 0 },
  { id: "6", day: "Friday", total_subscribers: 0 },
  { id: "7", day: "Saturday", total_subscribers: 0 },
];

const DailySubscribers = ({ styles }) => {
  const [select, setSelect] = React.useState(false);
  const [more, setMore] = React.useState(false);

  const handleSelect = () => {
    setSelect((prev) => !prev);
  };

  const handleSelectClickAway = () => {
    setSelect(false);
  };
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
          <div>
            <ClickAwayListener onClickAway={handleSelectClickAway}>
              <div className={styles.select}>
                <button type="button" onClick={handleSelect}>
                  Daily
                  <span>
                    <ExpandMoreIcon />
                  </span>
                </button>
                <div style={{ position: "absolute", right: "0", zIndex: 1 }}>
                  <Collapse in={select}>
                    <select style={{ border: select ? "1px solid #ccc" : "none" }}>
                      <option value={"daily"}>Daily</option>
                      <option value={"monthly"}>Monthly</option>
                      <option value={"annually"}>Annually</option>
                    </select>
                  </Collapse>
                </div>
              </div>
            </ClickAwayListener>
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
        <BarChart width={650} height={300} data={subscribers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis dataKey="total_subscribers" />
          <Bar barSize={30} dataKey="total_subscribers" fill="#6C63F0" />
        </BarChart>
      </div>
    </div>
  );
};

export default DailySubscribers;
