import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Layout from "../../Layout/Layout";
import styles from "./styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";
import useFetch from "../../../lib/components/Hooks/Requests/useFetch";
import { Activity } from "../../../lib/components/Endpoints/Endpoints";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FetchError from "../../../lib/components/Hooks/FetchError";
import { useState } from "react";


const AdminLogs = () => {

    const navigate = useNavigate();
    const { PaginatorTemplate, pageNumber } = usePaginator();

    // Get requests
    const { data, isLoading, error, handleSearchInput } = useFetch(`${Activity.getAdminActivities}/?page=${pageNumber}`);
    
    const [searchUrl, setSearchUrl] = useState({
      keyword: ""
    });

    useEffect(() => {
      handleSearchInput(searchUrl);
      // eslint-disable-next-line
    }, [searchUrl])

    let activityTime = (createdAt) => {
      let now = new Date();
      let dateCreated = new Date(createdAt);
      let time = (now - dateCreated)/1000;
      var specificTime
  
      if (time < 60){
        specificTime = Math.ceil(time) + " secs";
      }else if (time >= 60 && time < 3600){
        specificTime = Math.ceil(time/60) + " mins";
      }else if(time >= 3600 && time < 86400){
        specificTime = Math.ceil(time/3600) + " hrs";
      }else {
        specificTime = Math.ceil(time/86400) + " days";
      }
  
      return specificTime
    }; 

    return (
        <Layout>
          <main className={styles.main}>
            <IconButton onClick={() => navigate(-1)}>
                <KeyboardBackspaceIcon />
            </IconButton>
            {isLoading && <LoaderComponent />}
            {error && <FetchError error={error} />}
            {data && 
              <>
                <div >
                  <div className={styles.search_bar} style={{margin:'30px 0px'}}>
                    <TextField
                      className={styles.input}
                      fullWidth
                      style={{width:'400px'}}
                      size="small"
                      placeholder="Search by organization, admin, or plans"
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
                  <div 
                    className={styles.user_logs} 
                    style={{ 
                      backgroundColor: "#fff", 
                      borderRadius: "11px", 
                      border: "1px, solid, #fff", 
                      boxShadow: "0px 2.93842px 17.6305px rgba(37, 51, 66, 0.15)" 
                    }}>
                  {
                    data?.data?.map((item, index) => (
                      <div
                          style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#F3F3F6" }}
                          key={index}
                          className={styles.log}
                      >
                          <div className="text">
                          <span>{item?.replacers[0]?.name}</span>
                          {item?.text?.replace("$1", "").replace("$2", item?.replacers[1]?.name).replace("$3", item?.replacers[2]?.name).replace("$4", item?.replacers[3]?.name)}
                          </div>
                          <div>{
                            item?.createdAt ?
                                `${activityTime(item?.createdAt)} ago` :
                                "unknown time"
                          }</div>
                      </div>
                  ))}
                  </div>
                </div>
                <PaginatorTemplate 
                  totalDocs={data?.data?.length} 
                  limit={data?.limit} 
                  page={data?.page} 
                  totalPages={data?.totalPages} />
              </>
            }
          </main>
        </Layout>
    );
};

export default AdminLogs;