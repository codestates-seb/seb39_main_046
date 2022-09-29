import React from "react";
import styled from "styled-components";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/BannerCharater.png";

const ManagerPage = () => {
    return (
        <>
            <Banner>
                <BHeader>
                    관리자 전용 페이지 입니다
                    <br />
                    <span>oo 관리자</span>
                </BHeader>
                <BImg>
                    <img src={BChracter} alt="배너 캐릭터" />
                </BImg>
            </Banner>
        </>
    );
};

export default ManagerPage;

const BHeader = styled.header`
    margin: 0 auto;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    color: ${({ theme }) => theme.colors.Gray_090};
    span {
        font-weight: bold;
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        color: ${({ theme }) => theme.colors.Blue_030};
    }
`;

const BImg = styled.span`
    position: relative;
    top: -129px;
    left: 50px;
`;
