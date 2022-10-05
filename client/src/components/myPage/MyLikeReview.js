import React, { useEffect } from "react";
import styled from "styled-components";
import axiosInstances from "../../utils/axiosInastance";
import useStore from "../../lib/store";

import MyLikeReviewContain from "./MyLikeReviewContain";
import MyLikeReviesPage from "../common/pagination/myPage/MyLikeReviesPage";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../common/loading/Loading";

const GetmyLikeReviews = async (page, methodId, logInfo) => {
    const { data } = await axiosInstances.get(`member/myPage/simplifiedHeartReviews?page=${page}&methodId=${methodId}`);
    return data;
};

const MyLikeReview = ({ Persondata }) => {
    const queryClient = useQueryClient();
    const userName = Persondata.member.nickName;
    const { logInfo, ismyLikeReives } = useStore();
    const page = 1;
    const methodId = 3;
    // console.log(PersonlikeReview);

    useEffect(() => {
        queryClient.prefetchQuery(["LikeReviews", ismyLikeReives], () =>
            GetmyLikeReviews(ismyLikeReives, methodId, logInfo),
        );
    }, [ismyLikeReives, methodId, queryClient, logInfo]);

    const { data, isError, error, isLoading, isFetching } = useQuery(
        ["LikeReviews", ismyLikeReives],
        () => GetmyLikeReviews(ismyLikeReives, methodId, logInfo),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    );

    if (isLoading) return <h3>로딩중</h3>;
    if (isFetching) return <h3>로딩중</h3>;

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
                    <MyLikeReviesPage PageInfo={Persondata.jjimReviews} />
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
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
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
