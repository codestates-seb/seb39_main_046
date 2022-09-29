import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";
import useStore from "../../../lib/store";

const Paging2 = () => {
    const { isCurrentPage2 } = useStore();
    const handlePageChange2 = (e) => {
        useStore.setState({ isCurrentPage2: e });
    };

    return (
        <Pagination
            activePage={isCurrentPage2}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange2}
        />
    );
};

export default Paging2;
