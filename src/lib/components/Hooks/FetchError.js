import Button from "@mui/material/Button";
import internetError from "../../assets/images/internetConnection.png"
import "../LoaderComponent/loading.css"

const FetchError = ({error, reFetch}) => {
    return ( 
        <div className="error-head">
            <img className="error-img" src={internetError} alt="no internet" />
            <p style={{textAlign: "center", padding: "0.2rem", color: "crimson", fontWeight: "bolder"}}>{ error }</p>
            <br />
            {
                window.navigator.onLine ?
                    <Button
                        sx={{
                            backgroundColor: "#1F53D7",
                            border: "1px",
                            minWidth: "100px",
                            color: "#fff"
                        }}
                        onClick={() => window.location.reload()}>
                        Reload
                    </Button> :
                    ""
            }
        </div>
     );
}
 
export default FetchError;