import { IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Layout from "../../Layout/Layout";
import styles from "./styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import usePaginator from "../../../lib/components/Hooks/PaginatorTemplate";
import useFetch from "../../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../../lib/components/LoaderComponent/Loader";
import FetchError from "../../../lib/components/Hooks/FetchError";


const UserLogs = () => {

    const navigate = useNavigate();
    const { PaginatorTemplate, pageNumber } = usePaginator();

    // Get requests
    const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/activities?page=${pageNumber}`);
    
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
                <div className={styles.user_logs} style={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px, solid, #fff", boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.05)" }}>
                    {data?.data?.map((item, index) => (
                    <div
                        style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#F3F3F6" }}
                        key={index}
                        className={styles.log}
                    >
                        <div style={{ fontSize: "0.8rem", fontWeight: "bold"}}>
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
                </div>}
                <PaginatorTemplate totalDocs={data?.data?.length} limit={data?.limit} page={data?.page} totalPages={data?.totalPages} />
            </main>
        </Layout>
    );
};

export default UserLogs;