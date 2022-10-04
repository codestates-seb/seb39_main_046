import React from "react";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Recommend.css";
import MProductBox from "./MProductBox";
import RecommendCharcter from "../../../assets/images/main/RecommendCharcter.png";
import { useMainProducts } from "../../../lib/api/useGetMainProducts";

const Recommend = () => {
    const { recommendProducts } = useMainProducts();
    return (
        <ReivewContainer>
            <RTitleContainer>
                <RTitle>
                    <h2>리코의 추천 상품</h2>
                </RTitle>
                <img src={RecommendCharcter} alt="추천 캐릭터" />
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
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 17,
                    },
                    1080: {
                        slidesPerView: 4,
                        spaceBetween: 17,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 17,
                    },
                }}
            >
                {recommendProducts &&
                    recommendProducts.map((data, idx) => {
                        return (
                            <StyleSwipper>
                                <MProductBox className="item" key={idx} data={data}></MProductBox>
                            </StyleSwipper>
                        );
                    })}
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
    padding: 0 12px 0 8px;
    @media ${({ theme }) => theme.device.laptopL} {
        padding: 0 22px 0 20px;
    }
    @media ${({ theme }) => theme.device.laptop} {
        padding: 0 22px 0 20px;
    }
    @media ${({ theme }) => theme.device.tablet} {
        padding: 0 18px 0 14px;
    }
`;
const StyleSwipper = styled(SwiperSlide)`
    cursor: pointer;
    height: 355px;
    border-radius: 20px;
`;
