import React, {useState, useEffect} from "react";
import { InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Search = ({ styles, hooksContent, handleSearchInput, openNewMessage }) => {
  const { filterData } = hooksContent;

  const [searchUrl, setSearchUrl] = useState({
    term: "",
    dateFrom: "",
    dateTo: "",
  });
  
  useEffect(() => {
    handleSearchInput(searchUrl);
    // eslint-disable-next-line
  }, [searchUrl])

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
            maxDate={new Date()}
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
            maxDate={new Date()}
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
      <div className={styles.add_btn}>
        <Button
          onClick={openNewMessage}
          variant="contained"
          color="secondary"
        >
          New Message
        </Button>
      </div>
    </div>
  );
};

export default Search;
