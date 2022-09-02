import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Search = ({ styles, hooksContent, handleSearchInput }) => {
  const { filterData } = hooksContent;
  // const [resourceEndpoint, setResourceEndpoint] = useState("")

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
          // onInput={(e) => {
          //   setResourceEndpoint(`?keyword=${e?.target?.value}`);
          //   handleSearchInput(resourceEndpoint);
          // }}
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
          value={hooksContent?.status}
          onChange={(e) => {
            hooksContent?.handleChange(filterData.status);
            // setResourceEndpoint(`${resourceEndpoint}?status=${e?.target?.value}`);
            // handleSearchInput(resourceEndpoint);
          }}
        >
          <MenuItem disabled value="">Country</MenuItem>
          <MenuItem value="nigeria">Nigeria</MenuItem>
        </Select>
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
            // setResourceEndpoint(`${resourceEndpoint}?status=${e?.target?.value}`);
            // handleSearchInput(resourceEndpoint);
          }}
        >
          <MenuItem disabled value="">State</MenuItem>
          <MenuItem value="lagos">Lagos</MenuItem>
          <MenuItem value="kebbi">Kebbi</MenuItem>
          <MenuItem value="ondo">Ondo</MenuItem>
          <MenuItem value="enugu">Enugu</MenuItem>
          <MenuItem value="kwara">Kwara</MenuItem>
          <MenuItem value="adamawa">Adamawa</MenuItem>
        </Select>
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
            // setResourceEndpoint(`${resourceEndpoint}?status=${e?.target?.value}`);
            // handleSearchInput(resourceEndpoint);
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
