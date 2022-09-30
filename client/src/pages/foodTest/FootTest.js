import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/BannerCharater.png";

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
    top: -114px;
    left: 50px;
`;

const FoodTestContainer = styled.section`
    max-width: 100%;
    min-height: 630px;
    background-color: ${({ theme }) => theme.colors.Blue_010};
    border-radius: 10px;
    margin-bottom: 260px;
`;
