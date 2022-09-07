import React, {useState, useEffect} from "react";
import { 
  InputAdornment, 
  TextField, 
  Select, 
  MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Search = ({ styles, hooksContent, handleSearchInput }) => {
  const { filterData } = hooksContent;

  const [searchUrl, setSearchUrl] = useState({
    keyword: "",
    dateFrom: "",
    dateTo: "",
    status: ""
  });

  useEffect(() => {
    handleSearchInput(searchUrl);
    // eslint-disable-next-line
  }, [searchUrl])

  const [status, setStatus] = useState("");

  function handleSelect(e){
    setStatus(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      status: e?.target?.value,
    });
  };

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
            setSearchUrl({
              ...searchUrl,
              keyword: e?.target?.value,
            });
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
              setSearchUrl({
                ...searchUrl,
                dateFrom: e,
              });
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
              setSearchUrl({
                ...searchUrl,
                dateTo: e,
              });
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
          value={status}
          onChange={handleSelect}
        >
          <MenuItem disabled value="">Status</MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Search;
