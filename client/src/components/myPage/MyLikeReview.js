import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import useStore from "../../lib/store";

import MyLikeReviewContain from "./MyLikeReviewContain";
import Paging3 from "../common/pagination/paging3";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../common/loading/Loading";

const GetmyLikeReviews = async (page, methodId, logInfo) => {
    const { data } = await axios.get(`member/myPage/simplifiedHeartReviews?page=${page}&methodId=${methodId}`, {
        headers: {
            Authorization: logInfo,
        },
    });
    return data;
};

const MyLikeReview = ({ Persondata }) => {
    const queryClient = useQueryClient();
    const userName = Persondata.nickName;
    const { logInfo, isCurrentPage3 } = useStore();
    const page = 1;
    const methodId = 3;
    // console.log(PersonlikeReview);

    useEffect(() => {
        queryClient.prefetchQuery(["LikeReviews", isCurrentPage3], () =>
            GetmyLikeReviews(isCurrentPage3, methodId, logInfo),
        );
    }, [isCurrentPage3, methodId, queryClient, logInfo]);

    const { data, isError, error, isLoading, isFetching } = useQuery(
        ["LikeReviews", isCurrentPage3],
        () => GetmyLikeReviews(isCurrentPage3, methodId, logInfo),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    );

    if (isLoading) return <h2>로딩중이에요</h2>;
    if (isFetching) return <Loading />;

    return (
        <Maindiv>
            <PageSection>
                <PageTtitle>
                    <span>{userName}</span>
                    <span>님이 찜꽁한 리뷰</span>
                </PageTtitle>
                <RivewSection>
                    {data.data &&
                        data.data.map((data, idx) => {
                            return <MyLikeReviewContain key={idx} data={data} />;
                        })}
                </RivewSection>
                <Pagibox>
                    <Paging3 />
                </Pagibox>
            </PageSection>
        </Maindiv>
    );
};

export default MyLikeReview;

const Maindiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;
`;

const PageSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 1280px;
`;

const PageTtitle = styled.div`
    text-align: center;
    margin-bottom: 40px;
    span:first-child {
        font-size: 40px;
        color: ${({ theme }) => theme.colors.Blue_040};
        font-weight: 700;
    }
    span:last-child {
        font-size: 40px;
        color: ${({ theme }) => theme.colors.Gray_090};
        font-weight: 700;
    }
`;
const RivewSection = styled.section`
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    .Productinformation {
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-right: ${({ theme }) => theme.margins.base};
        box-shadow: 0px 2px 16px rgba(204, 204, 204, 0.6);
        border-radius: 20px;
        padding: 14px;
    }
`;

const Pagibox = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
`;
