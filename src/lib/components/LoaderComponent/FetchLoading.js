import "./loading.css"

const FetchLoading = () => {
    return ( 
        <div className="lds-hourglass-head">
            <div className="lds-hourglass"></div>
            <p className="one-moment">One moment please...</p>
        </div>
     );
}
 
export default FetchLoading;