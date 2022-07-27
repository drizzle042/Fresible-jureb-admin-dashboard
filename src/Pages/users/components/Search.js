import React from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import useFetch from "../../../lib/components/Hooks/useFetch";

const Search = ({ styles, openDialog, setData }) => {

  // fetch Search input data
  const {data, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators`)
  setData(data)

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
        <div className={styles.select_bar}>
          <Select
            className={styles.input}
            fullWidth
            size="small"
            value=""
            displayEmpty
          >
            <MenuItem disabled value="">
              Status
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
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
