import React, {useState} from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useFetch from "../../../lib/components/Hooks/useFetch";

const Search = ({ styles, hooksContent, setData }) => {
  const { filterData } = hooksContent;
  // fetch Search input data
  const [resourceEndpoint, setResourceEndpoint] = useState("")
  const {data, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators/push-notification/fetch`)
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
            setResourceEndpoint(`?keyword=${e?.target?.value}`)
            handleSearchInput(resourceEndpoint)
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
    </div>
  );
};

export default Search;
