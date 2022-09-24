import React from "react";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import ReviewImg1 from "../../assets/images/main/Review-1.png";
import ReviewImg2 from "../../assets/images/main/Review-2.png";
import ReviewImg3 from "../../assets/images/main/Review-3.png";
import ReviewImg4 from "../../assets/images/main/Review-4.png";
import ReviewImg5 from "../../assets/images/main/Review-5.png";

import HeartButton from "../../components/common/button/HeartButton";

const BestReview = () => {
  return (
    <ReivewContainer>
      <BestRiveTitle>
        <h2>베스트 리뷰</h2>
      </BestRiveTitle>
      <SwiperBox
        modules={[Navigation, Pagination, Autoplay]}
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
          <ReviewInnerBox>
            <span>
              <HeartButton />
            </span>
            <img src={ReviewImg1} />
            <div className="review_contents_box">
              <h4>타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀</h4>
              <p className="review_contents">
                리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를
                쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요
                리뷰를 쓸꺼에요
              </p>
              <div className="member_container">
                <div className="member_info">
                  <p>reco</p>
                </div>
                <div className="member_date">yyyy. mm. dd</div>
              </div>
            </div>
          </ReviewInnerBox>
        </StyleSwipper>
        <StyleSwipper>
          <ReviewInnerBox>
            <span>
              <HeartButton />
            </span>
            <img src={ReviewImg2} />
            <div className="review_contents_box">
              <h4>타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀</h4>
              <p className="review_contents">
                리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를
                쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요
                리뷰를 쓸꺼에요
              </p>
              <div className="member_container">
                <div className="member_info">
                  <p>reco</p>
                </div>
                <div className="member_date">yyyy. mm. dd</div>
              </div>
            </div>
          </ReviewInnerBox>
        </StyleSwipper>
        <StyleSwipper>
          <ReviewInnerBox>
            <span>
              <HeartButton />
            </span>
            <img src={ReviewImg3} />
            <div className="review_contents_box">
              <h4>타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀</h4>
              <p className="review_contents">
                리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를
                쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요
                리뷰를 쓸꺼에요
              </p>
              <div className="member_container">
                <div className="member_info">
                  <p>reco</p>
                </div>
                <div className="member_date">yyyy. mm. dd</div>
              </div>
            </div>
          </ReviewInnerBox>
        </StyleSwipper>
        <StyleSwipper>
          <ReviewInnerBox>
            <span>
              <HeartButton />
            </span>
            <img src={ReviewImg4} />
            <div className="review_contents_box">
              <h4>타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀</h4>
              <p className="review_contents">
                리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를
                쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요
                리뷰를 쓸꺼에요
              </p>
              <div className="member_container">
                <div className="member_info">
                  <p>reco</p>
                </div>
                <div className="member_date">yyyy. mm. dd</div>
              </div>
            </div>
          </ReviewInnerBox>
        </StyleSwipper>
        <StyleSwipper>
          <ReviewInnerBox>
            <span>
              <HeartButton />
            </span>
            <img src={ReviewImg5} />
            <div className="review_contents_box">
              <h4>타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀</h4>
              <p className="review_contents">
                리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를
                쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요 리뷰를 쓸꺼에요리뷰에요
                리뷰를 쓸꺼에요
              </p>
              <div className="member_container">
                <div className="member_info">
                  <p>reco</p>
                </div>
                <div className="member_date">yyyy. mm. dd</div>
              </div>
            </div>
          </ReviewInnerBox>
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
  &:hover {
    transform: translateY(-30px);
    transition: all 1s;
  }
`;
const ReviewInnerBox = styled.div`
  position: relative;
  span {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 10;
  }
  img {
    border-radius: 20px;
    width: 235px;
  }
  .review_contents_box {
    display: none;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 223px;
    height: 220px;
    padding: 30px 20px;
    h4 {
      height: 30px;
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .review_contents {
      height: 90px;
      font-size: ${({ theme }) => theme.fontSizes.xs};
      color: ${({ theme }) => theme.colors.Gray_060};
      margin-top: 5px;
      margin-bottom: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .member_container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: ${({ theme }) => theme.colors.Gray_050};
    }
  }

  &:hover {
    img {
      opacity: 0.3;
    }
    .review_contents_box {
      transition-delay: 2s;
      display: block;
    }
  }
`;
