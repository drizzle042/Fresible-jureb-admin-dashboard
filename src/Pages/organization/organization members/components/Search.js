import React, {useState, useEffect} from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Search = ({ styles, hooksContent, handleSearchInput }) => {
  const { filterData } = hooksContent;

  const [searchUrl, setSearchUrl] = useState({
    keyword: "",
    dateFrom: "",
    dateTo: "",
    status: ""
  });

  const [status, setStatus] = useState("");

  function handleSelect(e){
    setStatus(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      status: e?.target?.value,
    });
  };

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
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Search;
