import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";
import useStore from "../../../lib/store";

const Paging = () => {
    const { isCurrentPage } = useStore();
    const handlePageChange = (e) => {
        useStore.setState({ isCurrentPage: e });
    };

    return (
        <Pagination
            activePage={isCurrentPage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
        />
    );
};

export default Paging;
