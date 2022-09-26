import React from "react";
import styled from "styled-components";
import StoreLocation from "../../components/findStore/StoreLocation";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/FindStoreBanner.png";

const FindStore = () => {
  return (
    <div>
      <Banner>
        <BHeader>
          내 주변 편의점을 찾아보려면
          <br />
          <span>주변 편의점 찾기</span>
        </BHeader>
        <BImg>
          <img src={BChracter} alt="배너 캐릭터" />
        </BImg>
      </Banner>
      <FindStoreContiner>
        <StoreLocation />
      </FindStoreContiner>
    </div>
  );
};

export default FindStore;

const BHeader = styled.header`
  margin: 0 auto;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.Gray_050};
  span {
    color: ${({ theme }) => theme.colors.Blue_030};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: bold;
  }
`;

const BImg = styled.span`
  position: relative;
  top: -89px;
  left: 50px;
`;

const FindStoreContiner = styled.section`
  margin: 0 auto;
  width: 1280px;
`;
