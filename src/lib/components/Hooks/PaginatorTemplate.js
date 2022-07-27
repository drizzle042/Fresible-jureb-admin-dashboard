import { useState } from "react";
import styles from "../../../Pages/organization/styles/styles.module.css"

const usePaginator = () => {

    const [pageNumber, setPageNumber ] = useState(1)

    function addPage(totalPages){
        if (pageNumber < totalPages){
            setPageNumber(pageNumber + 1)
        }
    }
    
    function subtractPage(){
        if (pageNumber > 1){
            setPageNumber(pageNumber - 1)
        }
    }

    const PaginatorTemplate = ({totalDocs, limit, page, totalPages}) => {
        return (
            <div className={styles.pagination}>
                <div>
                Displaying <span>{totalDocs}</span> of <span>{limit}</span> Per Page
                </div>
                <div>
                <span className={styles.pageNumber}>
                    <span>{ page }</span>
                    <span style={{ margin: "0 5px" }}>of</span>
                    <span>{totalPages}</span>
                </span>
                <span className={styles.action} onClick={subtractPage}>-</span>
                <span 
                    className={styles.action_2} 
                    onClick={() => addPage(totalPages)}
                >+</span>
                </div>
            </div>
        );
    }
    return { pageNumber, PaginatorTemplate };
};
 
export default usePaginator;