import React from "react";
import styled from "styled-components";
import titleimg from "../../assets/images/userinfo/title.png";
import PersonalProducts from "./PersonalProducts";
import MyPagePaging2 from "../common/pagination/myPage/MyPagePaging2";
import { useNavigate } from "react-router-dom";
import useStore from "../../lib/store";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import Loading from "../common/loading/Loading";

const GetBasket = async (log, company, logInfo) => {
    const { data } = await axiosInstance.get(`member/myPage/simplifiedProducts?page=${log}&company=${company}`);
    return data;
};

const ProductBasket = ({ Persondata, PersonMyJJimProduct }) => {
    const queryClient = useQueryClient();
    const userName = Persondata.member.nickName;
    const more = "찜꽁바구니 더보기 ›";
    const navigate = useNavigate();
    const { logInfo, isJJimProductsCurrentPage } = useStore();
    const company = " ";

    useEffect(() => {
        queryClient.prefetchQuery(["JJimBascket", isJJimProductsCurrentPage], () =>
            GetBasket(isJJimProductsCurrentPage, company, logInfo),
        );
    }, [isJJimProductsCurrentPage, logInfo, company, queryClient]);

    const { data, isError, error, isLoading, isFetching } = useQuery(
        ["JJimBascket", isJJimProductsCurrentPage],
        () => GetBasket(isJJimProductsCurrentPage, company, logInfo),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    );

    if (isLoading) return <h3>로딩중</h3>;
    if (isFetching) return <h3>로딩중</h3>;
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
                <img src={titleimg} alt="하루 이미지" />
                <h2>
                    {userName}
                    <span>님의 최근 찜꽁바구니</span>
                </h2>
                <p
                    onClick={() => {
                        navigate("/productbasket");
                    }}
                >
                    {more}
                </p>
            </BasketTitle>
            <CarashelContent>
                {data.data &&
                    data.data.slice(0, 4).map((data, idx) => {
                        return <PersonalProducts key={idx} data={data} />;
                    })}
            </CarashelContent>
        </Topdiv>
    );
};

export default ProductBasket;

const Topdiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 110px;
`;
const BasketTitle = styled.section`
    max-width: 1180px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 119px;
        height: 140px;
    }
    h2 {
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
    }
    p {
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Orange_040};
        padding-top: ${({ theme }) => theme.paddings.xl};
        cursor: pointer;
    }
`;
const CarashelContent = styled.section`
    max-width: 1180px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    .itemgrid {
        box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.5);
    }
`;

const Pagibox = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
`;
