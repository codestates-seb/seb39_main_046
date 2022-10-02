import React from "react";
import styled from "styled-components";
import axios from "axios";
import useStore from "../../lib/store";
import ProductDetail from "../../components/myPage/ProductDetail";
import { useQuery, useQueryClient } from "react-query";
import PersonalInfo from "../../components/myPage/PersonalInfo";
import Loading from "../../components/common/loading/Loading";

const Getinfo = (logInfo) => {
    return axios.get("member/myPage", {
        headers: {
            Authorization: logInfo,
        },
    });
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
                    <PersonalInfo Persondata={data.data} />
                </RHearderBox>
            </Rcontainer>
            <ProductDetail Persondata={data.data.member} />
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
`;
