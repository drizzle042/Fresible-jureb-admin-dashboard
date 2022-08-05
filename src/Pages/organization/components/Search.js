import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Search = ({ styles, hooksContent, handleSearchInput }) => {
  const { filterData } = hooksContent;
  const [resourceEndpoint, setResourceEndpoint] = useState("")

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
            setResourceEndpoint(`?keyword=${e?.target?.value}`);
            handleSearchInput(resourceEndpoint);
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
            onChange={(e) => {
              hooksContent.setDateFrom(e);
              setResourceEndpoint(`${resourceEndpoint}?dateFrom=${e}`);
              handleSearchInput(resourceEndpoint);
            }}
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
            onChange={(e) => {
              hooksContent.setDateTo(e);
              setResourceEndpoint(`${resourceEndpoint}?dateTo=${e}`);
              handleSearchInput(resourceEndpoint);
            }}
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
          displayEmpty
          value={hooksContent?.status}
          onChange={(e) => {
            hooksContent?.handleChange(filterData.status);
            console.log(e?.target?.value)
            setResourceEndpoint(`${resourceEndpoint}?status=${e?.target?.value}`);
            handleSearchInput(resourceEndpoint);
          }}
        >
          <MenuItem disabled value="">Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Search;
