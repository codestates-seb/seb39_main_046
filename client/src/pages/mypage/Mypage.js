import React from "react";
import styled from "styled-components";
import axios from "axios";
import store from "../../lib/store";
import PersonalInfo from "../../components/myPage/PersonalInfo";
import ProductBasket from "../../components/myPage/ProductBasket";
import PbtiBanner2 from "../../components/myPage/PbtiBanner2";
import PersonalRivew from "../../components/myPage/PersonalRivew";
import MyLikeReview from "../../components/myPage/MyLikeReview";
import { useQuery } from "react-query";

const Getinfo = (logInfo) => {
    return axios.get("member/myPage", {
        headers: {
            Authorization: logInfo,
        },
    });
};

const Mypage = () => {
    const { logInfo } = store();
    // const { member } = useMypage();
    // console.log(member);

    // const queryClient = useQueryClient();

    const { data, isLoading } = useQuery("infos", () => Getinfo(logInfo), {
        keepPreviousData: true,
        staleTime: 2000,
    });

    if (isLoading) return <h3> 로딩중 </h3>;

    return (
        <>
            {" "}
            {/* <Exper> */} <PersonalInfo Persondata={data.data} />{" "}
            {data.data.jjimProducts === null ? (
                <Nodata> 찜상품이 없어요! </Nodata>
            ) : (
                <ProductBasket Persondata={data.data} PersonMyJJimProduct={data.data.jjimProducts} />
            )}{" "}
            <PbtiBanner2 />{" "}
            {data.data.myReviews === null ? (
                <Nodata> 내 리뷰가 없어요! </Nodata>
            ) : (
                <PersonalRivew Persondata={data.data} PersonRivew={data.data.myReviews} />
            )}{" "}
            {data.data.jjimReviews === null ? (
                <Nodata> 찜리뷰가 없어요! </Nodata>
            ) : (
                <MyLikeReview Persondata={data.data} PersonlikeReview={data.data.jjimReviews} />
            )}{" "}
            {/* </Exper> */}{" "}
        </>
    );
};

const Nodata = styled.h2`
    text-align: center;
`;

// const Exper = styled.div`
//     margin-left: 311px;
//     margin-right:311px;
// `

export default Mypage;
