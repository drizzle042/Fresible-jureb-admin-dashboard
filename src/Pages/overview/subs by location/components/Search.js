import React, {useState, useEffect} from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Search = ({ styles, hooksContent, handleSearchInput, stateToFilter, setStateOption, stateOption }) => {

  const { filterData } = hooksContent;

  console.log(stateToFilter);
  const nigerianStates = [
    "Abia", 
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",	
    "Kano",	
    "Katsina",	
    "Kebbi",	 
    "Kogi",
    "Kwara",
    "Lagos",	
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  const [searchUrl, setSearchUrl] = useState({
    keyword: "",
    country: "",
    state: "",
    status: "",
  });
  
  const [country, setCountry] = useState("");
  function handleSelectCountry(e){
    setCountry(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      country: e?.target?.value,
    });
  };
  
  const [state, setState] = useState(stateToFilter ? stateToFilter : "");
  function handleSelectState(e){
    if (setStateOption){
      setStateOption("")
    }
    setState(e?.target?.value);
    setSearchUrl({
      ...searchUrl,
      state: e?.target?.value,
    });
  };

  const [status, setStatus] = useState("");
  function handleSelectStatus(e){
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
          value={country}
          onChange={handleSelectCountry}
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
          value={state}
          onChange={handleSelectState}
        >
          <MenuItem disabled value="">State</MenuItem>
          {nigerianStates.map((i) => (
            <MenuItem value={i.toLowerCase()}>{i}</MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.select_bar}>
        <Select
          className={styles.input}
          fullWidth
          size="small"
          displayEmpty
          value={status}
          onChange={handleSelectStatus}
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
