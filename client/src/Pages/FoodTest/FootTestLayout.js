import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Banner from "../../Components/Common/Banner";
import BChracter from "../../Assets/images/BannerCharater.png";

const FootTestLayout = () => {
  return (
    <>
      <Banner>
        <BHeader>
          취향저격 상품 추천을 원해?
          <br />
          <span>편BTI 테스트</span>
        </BHeader>
        <BImg>
          <img src={BChracter} alt="배너 캐릭터" />
        </BImg>
      </Banner>
      <FoodTestContainer>
        <Outlet />
      </FoodTestContainer>
    </>
  );
};

export default FootTestLayout;

const BHeader = styled.header`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.Gray_050};
  span {
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    color: ${({ theme }) => theme.colors.Blue_030};
  }
`;

const BImg = styled.span`
  position: relative;
  top: -110px;
  left: 50px;
  img {
    /* position: relative;
    top: -110px;
    left: 170px; */
  }
`;

const FoodTestContainer = styled.section`
  width: 100%;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.Blue_010};
  display: flex;
  justify-content: center;
  align-items: center;
`;
