import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/BannerCharater.png";
import BestProdcts from "../../components/main/bestProducts/BestProdcts";
import BestReview from "../../components/main/bestReviews/BestReview";
import PbtiBanner from "../../components/common/banner/PbtiBanner";
import Recommend from "../../components/main/recommendProducts/Recommend";
import { FiSearch } from "react-icons/fi";
import FindStoreBanner from "../../assets/images/banner/FindStoreBanner.png";

const Main = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Banner>
                <BHeader>
                    흩어져있는 편의점 PB상품
                    <br />
                    <span>다들 헤쳐 모여!</span>
                </BHeader>
                <BImg>
                    <img src={BChracter} alt="배너 캐릭터" />
                </BImg>
            </Banner>
            <BestProdcts />
            <Recommend />
            <PbtiBanner />
            <BestReview />
            <FindStoreContainer>
                <h2>주변 편의점 찾기</h2>
                <LineInputBox>
                    <input placeholder="제품명을 검색하세요." />
                    <button onClick={() => navigate(`/findstore`)}>
                        <FiSearch size={25} />
                    </button>
                </LineInputBox>
                <img src={FindStoreBanner} alt="주변 편의점 찾으러가기" />
            </FindStoreContainer>
        </div>
    );
};

export default Main;
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

const FindStoreContainer = styled.section`
    max-width: 1280px;
    margin: 0 auto;
    padding-bottom: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    h2 {
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        font-weight: 700;
    }
    img {
        width: 150px;
        position: absolute;
        bottom: -8px;
        right: 130px;
    }
`;
const LineInputBox = styled.div`
    width: 600px;
    position: relative;
    margin: 40px 0;
    input {
        width: 600px;
        height: 56px;
        padding-left: 10px;
        background-color: transparent;
        border: none;
        border-bottom: 3px solid ${({ theme }) => theme.colors.Gray_090};
    }
    input::placeholder {
        color: ${({ theme }) => theme.colors.Gray_040};
    }
    button {
        position: absolute;
        right: 10px;
        top: 12px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`;
