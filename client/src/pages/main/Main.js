import React from "react";
import styled from "styled-components";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/BannerCharater.png";
import BestProdcts from "../../components/main/bestProducts/BestProdcts";
import BestReview from "../../components/main/bestReviews/BestReview";
import PbtiBanner from "../../components/common/banner/PbtiBanner";
import Recommend from "../../components/main/recommendProducts/Recommend";

const Main = () => {
  return (
    <div>
      <Banner>
        <BHeader>
          흩어져있는 편의점 PB상품
          <br />
          <span>다들 헤쳐 모여!</span>
        </BHeader>
        <BImg>
          <img src={BChracter} alt="배너 캐릭터" />
        </BImg>
      </Banner>
      <BestProdcts />
      <Recommend />
      <PbtiBanner />
      <BestReview />
      {/* <NearStore/> */}
    </div>
  );
};

export default Main;
const BHeader = styled.header`
  margin: 0 auto;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.Gray_090};
  span {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    color: ${({ theme }) => theme.colors.Blue_030};
  }
`;

const BImg = styled.span`
  position: relative;
  top: -129px;
  left: 50px;
`;
