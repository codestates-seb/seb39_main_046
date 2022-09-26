import React from "react";
import styled from "styled-components";
import PersonalInfo from "../../components/myPage/PersonalInfo";
import ProductBasket from "../../components/myPage/ProductBasket";
import PbtiBanner2 from "../../components/myPage/PbtiBanner2";
import PersonalRivew from "../../components/myPage/PersonalRivew";
import MyLikeReview from "../../components/myPage/MyLikeReview";

const Mypage = () => {
  return (
    <div>
      {/* <Exper> */}
      <PersonalInfo />
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
