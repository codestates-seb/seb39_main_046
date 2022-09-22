import React from "react";
import styled from "styled-components";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ReviewImg1 from "../../assets/images/main/Review-1.png";
import ReviewImg2 from "../../assets/images/main/Review-2.png";
import ReviewImg3 from "../../assets/images/main/Review-3.png";
import ReviewImg4 from "../../assets/images/main/Review-4.png";
import ReviewImg5 from "../../assets/images/main/Review-5.png";
const BestReview = () => {
  return (
    <ReivewContainer>
      <BestRiveTitle>
        <h2>베스트 리뷰</h2>
      </BestRiveTitle>
      <SwiperBox
        className="banner"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={23}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <StyleSwipper>
          <img src={ReviewImg1} />
        </StyleSwipper>
        <StyleSwipper>
          <img src={ReviewImg2} />
        </StyleSwipper>
        <StyleSwipper>
          <img src={ReviewImg3} />
        </StyleSwipper>
        <StyleSwipper>
          <img src={ReviewImg4} />
        </StyleSwipper>
        <StyleSwipper>
          <img src={ReviewImg5} />
        </StyleSwipper>
      </SwiperBox>
    </ReivewContainer>
  );
};

export default BestReview;

const ReivewContainer = styled.section`
  width: 1200px;
  height: 450px;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 100px;
`;
const BestRiveTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
  }
`;
const SwiperBox = styled(Swiper)`
  padding-top: 50px;
  height: 330px;
`;
const StyleSwipper = styled(SwiperSlide)`
  width: 220px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 20px rgba(204, 204, 204, 0.5);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  img {
    border-radius: 20px;
    width: 220px;
    &:hover {
      opacity: 0.6;
    }
  }
  &:hover {
    transform: translateY(-30px);
    transition: all 1s;
  }
`;
