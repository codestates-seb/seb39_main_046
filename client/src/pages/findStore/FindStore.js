import React from "react";
import styled from "styled-components";
import FindStoreFunc from "../../components/findStore/FindStoreFunc";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/FindStoreBanner.svg";

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
                <FindStoreFunc />
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
    position: absolute;
    bottom: -30px;
    left: 50px;
    @media ${({ theme }) => theme.device.laptop} {
        left: 0px;
    }
    @media ${({ theme }) => theme.device.tablet} {
        display: none;
    }
`;

const FindStoreContiner = styled.section`
    margin: 0 auto;
    width: 1280px;
`;
