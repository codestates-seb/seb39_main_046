import React from "react";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Recommend.css";
import ProductBox from "../../components/common/product/ProductBox";
import RecommendReco from "../../assets/images/main/RecommendCharcter.png";

const Recommend = () => {
  return (
    <ReivewContainer>
      <RTitleContainer>
        <RTitle>
          <h2>리코의 추천 상품</h2>
        </RTitle>
        <img src={RecommendReco} alt="추천 캐릭터" />
      </RTitleContainer>
      <SwiperBox
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={25}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <StyleSwipper>
          <ProductBox />
        </StyleSwipper>
        <StyleSwipper>
          <ProductBox />
        </StyleSwipper>
        <StyleSwipper>
          <ProductBox />
        </StyleSwipper>
        <StyleSwipper>
          <ProductBox />
        </StyleSwipper>
        <StyleSwipper>
          <ProductBox />
        </StyleSwipper>
      </SwiperBox>
    </ReivewContainer>
  );
};

export default Recommend;

const ReivewContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
`;
const RTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: relative;
    top: 20px;
    left: -10px;
  }
`;

const RTitle = styled.div`
  text-align: center;
  height: 100px;
  width: 100%;
  margin-left: 120px;
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
  }
`;
const SwiperBox = styled(Swiper)`
  padding: 30px;
  padding-left: 9px;
  padding-right: 17px;
  width: 100%;
  height: 450px;
`;
const StyleSwipper = styled(SwiperSlide)`
  cursor: pointer;
`;
