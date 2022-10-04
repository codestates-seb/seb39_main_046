import React from "react";
import styled from "styled-components";
import RivesBundle from "./RivesBundle";
import MypageRivew from "../common/pagination/myPage/MypageRivew";
import useStore from "../../lib/store";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../common/loading/Loading";
import { useEffect } from "react";
// import { useMypage } from "../../lib/api/useMypage";

const GetmyRivew = async (method, page, logInfo) => {
    const { data } = await axiosInstance.get(`/member/myPage/myReviews/${method}?page=${page}`);
    return data;
};

const PersonalRivew = ({ Persondata }) => {
    // const {myReviews} = useMypage();
    const queryClient = useQueryClient();
    const userName = Persondata.member.nickName;
    const { logInfo, ismyReviewsCurrentPage } = useStore();
    const method = 1;

    useEffect(() => {
        queryClient.prefetchQuery(["MyReivew", ismyReviewsCurrentPage], () =>
            GetmyRivew(method, ismyReviewsCurrentPage, logInfo),
        );
    }, [method, ismyReviewsCurrentPage, logInfo, queryClient]);

    const { data, isError, error, isLoading, isFetching } = useQuery(
        ["MyReivew", ismyReviewsCurrentPage],
        () => GetmyRivew(method, ismyReviewsCurrentPage, logInfo),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    );

    if (isLoading) return <Loading />;
    if (isFetching) return <Loading />;
    if (isError)
        return (
            <>
                <h3> 오류발생 </h3> <p> {error.toString()} </p>{" "}
            </>
        );

    return (
        <Maindive>
            <TitleDiv>
                <UserName>
                    {" "}
                    {userName} <Welcome> 님이 남긴 리뷰 </Welcome>{" "}
                </UserName>{" "}
            </TitleDiv>{" "}
            <Productbox>
                {" "}
                {data.data &&
                    data.data.map((data, idx) => {
                        return <RivesBundle key={idx} data={data} />;
                    })}{" "}
            </Productbox>{" "}
            <Pagibox>
                <MypageRivew PageInfo={Persondata.myReviews} />{" "}
            </Pagibox>{" "}
        </Maindive>
    );
};

export default PersonalRivew;

const Maindive = styled.div`
    padding-bottom: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const TitleDiv = styled.div`
    text-align: center;
    margin-bottom: 70px;
`;
const Productbox = styled.section`
    max-width: 1180px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    .itemgrid {
        box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.5);
        background-color: blue;
    }
`;

const UserName = styled.span`
    color: ${({ theme }) => theme.colors.Blue_040};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    line-height: 160%;
`;
const Welcome = styled.span`
    color: ${({ theme }) => theme.colors.Gray_090};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    line-height: 160%;
`;

const Pagibox = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
`;
