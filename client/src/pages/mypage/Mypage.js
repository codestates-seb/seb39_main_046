import React from "react";
import styled from "styled-components";
import axios from "axios";
import store from "../../lib/store";

import PersonalInfo from "../../components/myPage/PersonalInfo";
import ProductBasket from "../../components/myPage/ProductBasket";
import PbtiBanner2 from "../../components/myPage/PbtiBanner2";
import PersonalRivew from "../../components/myPage/PersonalRivew";
import MyLikeReview from "../../components/myPage/MyLikeReview";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useMypage } from "../../lib/api/useMypage";
// const Getinfo= (logInfo) => {
//   return axios.get('member/myPage',{
//     headers:{
//       "Authorization": logInfo,
//     }
//   })
// }

const Mypage = () => {
    const { member, myReviews, jjimReviews } = useMypage();
    console.log(member);
    // const {logInfo}=store();

    // const queryClient = useQueryClient();

    // const {data, isLoading} = useQuery("infos", () =>Getinfo(logInfo),{
    //   keepPreviousData:true,
    //   staleTime:2000,
    // })

    // if(isLoading) return <h3>로딩중</h3>;

    // useEffect(()=>{
    //   setNickname(data.data.member.nickName);
    //   setEmail(data.data.member.username);
    //   console.log(nickname,email)
    // },[])

    // console.log(data.data.member.memberId);

    return (
        <>
            <PersonalInfo Infodata={member} />
            <ProductBasket />
            <PbtiBanner2 />
            <PersonalRivew Infodata={member} InfoRives={myReviews} />
            <MyLikeReview Infodata={member} InfolikeRives={jjimReviews} />
        </>
    );
};

export default Mypage;
