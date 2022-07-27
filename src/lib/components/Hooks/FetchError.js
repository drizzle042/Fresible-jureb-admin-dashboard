import internetError from "../../assets/images/internetConnection.png"
import "../LoaderComponent/loading.css"

const FetchError = ({error}) => {
    return ( 
        <div className="error-head">
            <img className="error-img" src={internetError} alt="no internet" />
            <p style={{textAlign: "center", padding: "0.2rem", color: "crimson", fontWeight: "bolder"}}>{ error }</p>
        </div>
     );
}
 
export default FetchError;