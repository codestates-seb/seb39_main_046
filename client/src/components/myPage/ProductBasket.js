import React from "react";
import styled from "styled-components";
import titleimg from "../../assets/images/userinfo/title.png";
import PersonalProducts from "./PersonalProducts";
import Paging from "../common/pagination/Paging";
import { useNavigate } from "react-router-dom";
import useStore from "../../lib/store";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import Loading from "../common/loading/Loading";

const GetBasket = async (log, company, logInfo) => {
    const { data } = await axios.get(`member/myPage/simplifiedProducts?page=${log}&company=${company}`, {
        headers: {
            Authorization: logInfo,
        },
    });
    return data;
};

const ProductBasket = ({ Persondata }) => {
    const queryClient = useQueryClient();
    const userName = Persondata.nickName;
    const more = "더보기 >";
    const navigate = useNavigate();
    const { logInfo, isCurrentPage } = useStore();
    const company = " ";

    useEffect(() => {
        queryClient.prefetchQuery(["JJimBascket", isCurrentPage], () => GetBasket(isCurrentPage, company, logInfo));
    }, [isCurrentPage, logInfo, company, queryClient]);

    const { data, isError, error, isLoading, isFetching } = useQuery(
        ["JJimBascket", isCurrentPage],
        () => GetBasket(isCurrentPage, company, logInfo),
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
        <Topdiv>
            <BasketTitle>
                <section>
                    <img src={titleimg} alt="이틀 이미지" />
                    <Username>
                        {userName}
                        <span>님의 찜꽁바구니</span>
                    </Username>
                    <p
                        onClick={() => {
                            navigate("/productbasket");
                        }}
                    >
                        {more}
                    </p>
                </section>
            </BasketTitle>
            <CarashelContent>
                {data.data &&
                    data.data.map((data, idx) => {
                        return <PersonalProducts key={idx} data={data} />;
                    })}
            </CarashelContent>
            <Pagibox>
                <Paging />
            </Pagibox>
        </Topdiv>
    );
};

export default ProductBasket;

const Topdiv = styled.div`
    margin-left: 300px;
    margin-right: 300px;
`;
const BasketTitle = styled.section`
    width: 100%;
    section {
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
    }
    img {
        /* margin-top:${({ theme }) => theme.margins.xl}; */
        width: 119px;
        height: 140px;
    }
    p {
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Orange_040};
        padding-top: ${({ theme }) => theme.paddings.xl};
        cursor: pointer;
    }
`;
const Username = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    text-align: center;
    color: ${({ theme }) => theme.colors.Blue_040};
    margin-right: 42px;
    span {
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        font-weight: 700;
        color: ${({ theme }) => theme.colors.Gray_090};
    }
`;
const CarashelContent = styled.section`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1280px;
    margin-bottom: 100px;
    margin-right: 250px;
`;

const Pagibox = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
`;
