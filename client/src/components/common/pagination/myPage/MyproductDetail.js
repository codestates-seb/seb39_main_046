import React from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import useStore from "../../../../lib/store";

const MyproductDetail = ({pageInfo}) => {
    const { isProductDetail } = useStore();
    const handlePageChange = (e) => {
        useStore.setState({ isProductDetail: e });
    };
    return (
        <PageBox>
            <Pagination
                activePage={isProductDetail}
                itemsCountPerPage={pageInfo.pageInfo && pageInfo.pageInfo.size}
                totalItemsCount={pageInfo.pageInfo && pageInfo.pageInfo.totalElements}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
        </PageBox>
    );
};

export default MyproductDetail;

const PageBox = styled.section`
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    ul.pagination li {
        display: inline-block;
        width: 27px;
        height: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        border-radius: 30px;
    }

    ul.pagination li:first-child a {
        color: #437bec;
    }
    ul.pagination li:nth-child(2) a {
        color: #437bec;
    }
    ul.pagination li:nth-last-child(2) a {
        color: #437bec;
    }
    ul.pagination li:last-child a {
        color: #437bec;
    }

    ul.pagination li a {
        text-decoration: none;
        font-size: 1rem;
        border-radius: 30px;
        color: rgba(174, 174, 178, 1);
    }

    ul.pagination li.active a {
        color: white;
    }

    ul.pagination li.active {
        background-color: #437bec;
    }

    ul.pagination li a:hover,
    ul.pagination li a.active {
    }

    .page-selection {
        width: 48px;
        height: 30px;
        color: #437bec;
    }
`;
