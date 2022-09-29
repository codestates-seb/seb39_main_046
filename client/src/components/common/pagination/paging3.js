import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";
import useStore from "../../../lib/store";

const Paging3 = () => {
    const { isCurrentPage3 } = useStore();
    const handlePageChange3 = (e) => {
        useStore.setState({ isCurrentPage3: e });
    };

    return (
        <Pagination
            activePage={isCurrentPage3}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange3}
        />
    );
};

export default Paging3;
