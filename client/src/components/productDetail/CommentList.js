import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Comment from "./Comment";
import Paging from "../common/pagination/Paging";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery } from "react-query";
import Loading from "../common/loading/Loading";
import useStore from "../../lib/store";
const getDeatilReview = async (productNum, pageNum) => {
    const { data } = await axiosInstance.get(`/review/productReviews/1?productId=${productNum}&page=${pageNum}`);
    return data;
};
const CommentList = () => {
    const { id } = useParams();
    const { isCurrentPage } = useStore();
    const { status, data, error, isFetching } = useQuery(
        ["productReview", id, isCurrentPage],
        () => getDeatilReview(id, isCurrentPage),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (e) => {
                console.log(e.message);
            },
        },
    );

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    if (isFetching) {
        return <Loading />;
    }

    return (
        <MainDiv>
            <div className="line"></div>
            <p className="review_count">{data.pageInfo.totalElements}개의 리뷰가 있어요!</p>
            <CommentArea>
                {data.data && data.data.map((data) => <Comment data={data} />)}
                <Paging />
            </CommentArea>
        </MainDiv>
    );
};

export default CommentList;

const MainDiv = styled.div`
    margin-top: 14px;
    .line {
        width: 100%;
        height: 2px;
        background-color: #fff;
        margin-bottom: 14px;
    }
    .review_count {
        text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.base};
        font-weight: 700;
        color: ${({ theme }) => theme.colors.Blue_030};
        margin-bottom: 14px;
    }
`;

const CommentArea = styled.section`
    height: 360px;
    overflow: auto;
`;
