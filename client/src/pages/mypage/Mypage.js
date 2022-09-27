import React from "react";
import styled from "styled-components";
import axios from 'axios';
import store from '../../lib/store';

import PersonalInfo from "../../components/myPage/PersonalInfo";
import ProductBasket from "../../components/myPage/ProductBasket";
import PbtiBanner2 from "../../components/myPage/PbtiBanner2";
import PersonalRivew from "../../components/myPage/PersonalRivew";
import MyLikeReview from "../../components/myPage/MyLikeReview";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { useState } from "react";

const Getinfo= (logInfo) => {
  return axios.get('member/myPage',{
    headers:{
      "Authorization": logInfo,
    }
  })
}

const Mypage = () => {
  const {logInfo}=store();
  const [nickname, setNickname] =useState("");
  const [email, setEmail] = useState("");


  const queryClient = useQueryClient();

  const {data, isError, error, isLoading, isFetching} = useQuery("infos", () =>Getinfo(logInfo),{
    // keepPreviousData:true,
    // staleTime:2000,
  })

  if(isLoading) return <h3>로딩중</h3>;

  // useEffect(()=>{
  //   setNickname(data.data.member.nickName);
  //   setEmail(data.data.member.username);
  //   console.log(nickname,email)
  // },[])



  // console.log(data.data.member.memberId);


  return (
    <div>
      {/* <Exper> */}
      <PersonalInfo  userdata = {data.data.member}/>
      <ProductBasket />
      <PbtiBanner2 />
      <PersonalRivew />
      <MyLikeReview />
      {/* </Exper> */}
    </div>
  );
};

// const Exper = styled.div`
//     margin-left: 311px;
//     margin-right:311px;
// `

export default Mypage;
