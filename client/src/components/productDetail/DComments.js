import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DComment from "./DComment";
import Paging from "../common/pagination/Paging";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery } from "react-query";
import Loading from "../common/loading/Loading";
import useStore from "../../lib/store";

const getDeatilReview = async (sortNum, productNum, pageNum) => {
    const { data } = await axiosInstance.get(
        `/review/productReviews/${sortNum}?productId=${productNum}&page=${pageNum}`,
    );
    return data;
};
const CommentList = () => {
    const { id } = useParams();
    const [sortNum, setSortNum] = useState(2);

    const { isCurrentPage } = useStore();
    const { status, data, error, isFetching } = useQuery(
        ["productReview", sortNum, id, isCurrentPage],
        () => getDeatilReview(sortNum, id, isCurrentPage),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (data) => {},
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
            <div className="title">
                <p className="review_count">{data.pageInfo.totalElements}개의 리뷰가 있어요!</p>
                <ul className="sort_box">
                    <li className={sortNum === 2 ? "on" : ""} onClick={() => setSortNum(2)}>
                        최신순
                    </li>
                    <li className={sortNum === 1 ? "on" : ""} onClick={() => setSortNum(1)}>
                        좋아요
                    </li>
                </ul>
            </div>
            <CommentArea>
                {data.data && data.data.map((data) => <DComment Semidata={data} />)}
                <Paging pageInfo={data.pageInfo} />
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
    .title {
        position: relative;
        .review_count {
            text-align: center;
            font-size: ${({ theme }) => theme.fontSizes.base};
            font-weight: 700;
            color: ${({ theme }) => theme.colors.Blue_030};
            margin-bottom: 14px;
        }
        .sort_box {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            li {
                padding: 0 5px;
                cursor: pointer;
                color: ${({ theme }) => theme.colors.Gray_040};
            }
            .on {
                color: ${({ theme }) => theme.colors.Orange_040};
            }
        }
    }
`;

const CommentArea = styled.section`
    height: 360px;
    overflow: auto;
`;
