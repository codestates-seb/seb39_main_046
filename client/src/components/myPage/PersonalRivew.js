import React from "react";
import styled from "styled-components";
import RivesBundle from "./RivesBundle";
import Paging2 from "../common/pagination/paging2";
import useStore from "../../lib/store";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Loading from "../common/loading/Loading";
import { useEffect } from "react";
// import { useMypage } from "../../lib/api/useMypage";

const GetmyRivew = async (method, page, logInfo) => {
    const { data } = await axios.get(`/member/myPage/myReviews/${method}?page=${page}`, {
        headers: {
            Authorization: logInfo,
        },
    });
    return data;
};

const PersonalRivew = ({ Persondata }) => {
    // const {myReviews} = useMypage();
    const queryClient = useQueryClient();
    const userName = Persondata.nickName;
    const { logInfo, isCurrentPage2 } = useStore();
    const method = 1;

    useEffect(() => {
        queryClient.prefetchQuery(["MyReivew", isCurrentPage2], () => GetmyRivew(method, isCurrentPage2, logInfo));
    }, [method, isCurrentPage2, logInfo, queryClient]);

    const { data, isError, error, isLoading, isFetching } = useQuery(
        ["MyReivew", isCurrentPage2],
        () => GetmyRivew(method, isCurrentPage2, logInfo),
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
                <h3>오류발생</h3>
                <p>{error.toString()}</p>
            </>
        );

    return (
        <Maindive>
            <TitleDiv>
                <UserName>
                    {userName}
                    <Welcome>님이 남긴 리뷰</Welcome>
                </UserName>
            </TitleDiv>
            <Productbox>
                {data.data &&
                    data.data.map((data, idx) => {
                        return <RivesBundle key={idx} data={data} />;
                    })}
            </Productbox>
            <Pagibox>
                <Paging2 />
            </Pagibox>
        </Maindive>
    );
};

export default PersonalRivew;

const Maindive = styled.div`
    padding-bottom: 100px;
`;

const TitleDiv = styled.div`
    text-align: center;
    margin-bottom: 70px;
`;
const Productbox = styled.section`
    height: 440px;
    display: flex;
    justify-content: center;
    align-items: center;
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
