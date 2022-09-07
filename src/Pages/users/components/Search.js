import React, {useState, useEffect} from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const Search = ({ styles, openDialog, handleSearchInput }) => {

  const [searchUrl, setSearchUrl] = useState({
    keyword: "",
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
      <div className={styles.left}>
        <div className={styles.search_bar}>
          <TextField
            className={styles.input}
            fullWidth
            size="small"
            placeholder="Enter Text Here..."
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
            value={status}
            onChange={handleSelect}
            displayEmpty
          >
            <MenuItem disabled value="">
              Status
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </div>
      </div>
      <div className={styles.add_btn}>
        <Button
          onClick={openDialog}
          color="secondary"
          endIcon={<AddIcon />}
          variant="contained"
        >
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Search;
