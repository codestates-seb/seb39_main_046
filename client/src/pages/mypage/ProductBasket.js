import React from "react";
import styled from "styled-components";
import useStore from "../../lib/store";
import ProductDetail from "../../components/myPage/ProductDetail";
import { useQuery } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import PersonalInfo from "../../components/myPage/PersonalInfo";
import Loading from "../../components/common/loading/Loading";

const Getinfo = (logInfo) => {
    return axiosInstance.get("member/myPage");
};

const ProductBasket = () => {
    const { logInfo } = useStore();

    const { data, isLoading } = useQuery("infos", () => Getinfo(logInfo), {
        keepPreviousData: true,
        staleTime: 2000,
    });

    if (isLoading) return <Loading />;
    return (
        <>
            <Rcontainer>
                <RHearderBox>
                    <img src={data.data.member.profile} className="user_profile" alt={data.data.member.nickName} />{" "}
                    <div className="user_info">
                        <h2>
                            {" "}
                            {data.data.member.nickName} <span> 님의 찜꽁바구니: ) </span>{" "}
                        </h2>{" "}
                    </div>{" "}
                    {/* <PersonalInfo Persondata={data.data} /> */}{" "}
                </RHearderBox>{" "}
            </Rcontainer>{" "}
            <ProductDetail Persondata={data.data.member} />{" "}
        </>
    );
};

export default ProductBasket;
const Rcontainer = styled.section`
    text-align: center;
`;
const RHearderBox = styled.header`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.Blue_010};
    padding: 70px 0 50px;
    img {
        background-color: #fff;
        width: 200px;
        height: 200px;
        border-radius: 200px;
    }
    .user_info {
        color: ${({ theme }) => theme.colors.Blue_030};
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        font-weight: 700;
        span {
            color: ${({ theme }) => theme.colors.Gray_050};
        }
    }
`;
