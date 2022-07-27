import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useFetch from "../../../lib/components/Hooks/useFetch";

const Search = ({ styles, hooksContent, setData }) => {
  const { filterData } = hooksContent;
  // fetch Search input data
  const {data, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/invoices`)
  setData(data)
  return (
    <div className={styles.filters}>
      <div className={styles.search_bar}>
        <TextField
          className={styles.input}
          fullWidth
          size="small"
          placeholder="Enter Text Here..."
          value={hooksContent?.title}
          onChange={hooksContent?.handleChange(filterData.title)}
          onInput={(e) => {
            handleSearchInput(e?.target?.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className={styles.searchIcon} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.date_bar}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date From"
            inputFormat="MM/dd/yyyy"
            value={hooksContent.dateFrom}
            onChange={(e) => hooksContent.setDateFrom(e)}
            renderInput={(params) => (
              <TextField
                className={styles.input}
                fullWidth
                size="small"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.date_bar}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date To"
            inputFormat="MM/dd/yyyy"
            value={hooksContent.dateTo}
            onChange={(e) => hooksContent.setDateTo(e)}
            renderInput={(params) => (
              <TextField
                className={styles.input}
                fullWidth
                size="small"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.select_bar}>
        <Select
          className={styles.input}
          fullWidth
          size="small"
          value={hooksContent?.status}
          onChange={hooksContent?.handleChange(filterData.status)}
          displayEmpty
        >
          <MenuItem disabled value="">
            Status
          </MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Search;
