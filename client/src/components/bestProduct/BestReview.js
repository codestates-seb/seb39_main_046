import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestReview = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay : true,
    autoplaySpeed : 2000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows : true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <BestRiveTitle>
        <ReivewWrite>베스트 리뷰</ReivewWrite>
      </BestRiveTitle>
      <ReivewContainer>
      <Slider {...settings}>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
      </Slider>
      </ReivewContainer>
    </div>
  );
};

export default BestReview;

const BestRiveTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.interval.base};
`;
const ReivewWrite = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
`;
const ReivewContainer = styled.section`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin-left : 500px;
  margin-right: 500px;
  margin-bottom: ${({ theme }) => theme.interval.xl};
`;
const ReviewBox = styled.div`
  width: 220px;
  height: 220px;
  border: 2px solid rgba(204, 204, 204, 0.3);
  box-shadow: 0px 2px 20px rgba(204, 204, 204, 0.3);
  margin-right: ${({ theme }) => theme.margins.xxxl};
  background: url("/Character/상품준비 안됫음 .png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30% 90%;
  border-radius: 20px;
`;
