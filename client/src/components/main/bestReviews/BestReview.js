/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ReviewImg1 from "../../../assets/images/main/Review-1.png";
import ReviewImg2 from "../../../assets/images/main/Review-2.png";
import ReviewImg3 from "../../../assets/images/main/Review-3.png";
import ReviewImg4 from "../../../assets/images/main/Review-4.png";
import ReviewImg5 from "../../../assets/images/main/Review-5.png";
import ReviewHeartButton from "../../common/button/ReviewHeartButton";
import { useMainProducts } from "../../../lib/api/useMainProducts";

const BestReview = () => {
    const { bestReviews } = useMainProducts();
    const [swiper, setSwiper] = useState(null);
    return (
        <ReivewContainer>
            <BestRiveTitle>
                <h2>베스트 리뷰</h2>
            </BestRiveTitle>
            <SwiperBox
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
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
                        spaceBetween: 25,
                    },
                }}
                onSlideChange={(s) => {
                    setSwiper(s.realIndex);
                }}
            >
                {bestReviews &&
                    bestReviews.map((data, idx) => {
                        let num = idx;
                        if (swiper < 3) {
                            num = idx - 2;
                        } else if (swiper >= 3) {
                            num = idx + 3;
                        }
                        return (
                            <StyleSwipper key={idx} className={swiper === num ? "active" : null}>
                                <ReviewInnerBox>
                                    <span>
                                        <ReviewHeartButton id={data.reviewId && data.reviewId} />
                                    </span>
                                    <img src={ReviewImg1} alt={data.content} />
                                    <div className="review_contents_box">
                                        <h4>{data.product.productName}</h4>
                                        <p className="review_contents">{data.content}</p>
                                        <div className="member_container">
                                            <div className="member_info">
                                                <p>{data.member.nickName}</p>
                                            </div>
                                            <div className="member_date">{data.createdAt.substr(0, 10)}</div>
                                        </div>
                                    </div>
                                </ReviewInnerBox>
                            </StyleSwipper>
                        );
                    })}
            </SwiperBox>
        </ReivewContainer>
    );
};

export default BestReview;

const ReivewContainer = styled.section`
    max-width: 1280px;
    height: 450px;
    margin: 0 auto;
    margin-bottom: 70px;
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
    /* width: 100%; */
    .active {
        transform: translateY(-20px);
        transition: all 1s;
        img {
            opacity: 0.3;
        }
        .review_contents_box {
            transition-delay: 2s;
            display: block;
        }
    }
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
        transform: translateY(-20px);
        transition: all 1s;
    }
`;
const ReviewInnerBox = styled.div`
    position: relative;
    span {
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 2;
    }
    img {
        border-radius: 20px;
        width: 100%;
    }
    .review_contents_box {
        display: none;
        position: absolute;
        right: 0px;
        top: 0px;
        width: 100%;
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
