import React from "react";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Recommend.css";
import ProductBox from "../../../components/common/product/ProductBox";
import RecommendReco from "../../../assets/images/main/RecommendCharcter.png";

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
        spaceBetween={17}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
        speed={1500}
        breakpoints={{
          740: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 17,
          },
        }}
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
  padding-top: 30px;
  width: 100%;
  height: 450px;
  padding-left: 8px;
  padding-right: 12px;
`;
const StyleSwipper = styled(SwiperSlide)`
  cursor: pointer;
  height: 355px;
  border-radius: 20px;
`;
