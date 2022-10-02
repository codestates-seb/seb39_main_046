import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ResultData } from "../../assets/data/foodData/resultdata";
import Button from "../common/button/Button";
import KakaoShareButton from "../common/button/KakaoShareButton";
import useTest from "../../lib/api/useTestMutation";
import useStore from "../../lib/store";
import ProductBox from "../common/product/ProductBox";

const FoodTestResult = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mbti = searchParams.get("mbti");
    const [resultData, setResultData] = useState({});
    const [categoryNum, setCategoryNum] = useState(0);
    const { isTestNum } = useStore();

    const { mutate: changeTest } = useTest();

    useEffect(() => {
        const result = ResultData.find((data) => data.best === mbti);
        const category = ResultData.findIndex((data) => data.best === mbti);
        setResultData(result);
        setCategoryNum(category + 1);
        console.log(categoryNum);
        changeTest(categoryNum);
    }, [mbti, categoryNum, changeTest]);

    return (
        <Fcontainer>
            <FContens>
                <h3>
                    당신과 찰떡궁합인 음식은 <strong>{resultData.name}</strong>입니다
                </h3>
                <img src={resultData.image} alt={resultData.name} />
                <FBtn>
                    <Button onClick={() => navigate("/foodtest")}>테스트 다시하기</Button>
                    <KakaoShareButton data={resultData}>카카오톡 공유하기</KakaoShareButton>
                </FBtn>
            </FContens>
            <FBottomContainer>
                <FTitle>
                    <h2>
                        <strong>{resultData.name}파</strong>를 위한 리코의 추천
                    </h2>
                </FTitle>
                <FRecommend>
                    {isTestNum &&
                        isTestNum.slice(0, 4).map((data, idx) => {
                            return <ProductBox className="item" key={idx} data={data} idx={idx}></ProductBox>;
                        })}
                </FRecommend>
            </FBottomContainer>
        </Fcontainer>
    );
};

export default FoodTestResult;
const Fcontainer = styled.div`
    padding-top: 100px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const FContens = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
        strong {
            font-weight: bold;
            font-size: ${({ theme }) => theme.fontSizes.xxxl};
        }
    }
    img {
        margin: 25px 0;
        width: 500px;
        border-radius: 30px;
    }
`;
const FBtn = styled.div`
    Button {
        margin-right: 30px;
    }
`;
const FBottomContainer = styled.div`
    width: 100%;
    margin-top: 120px;
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
`;

const FRecommend = styled.div`
    max-width: 1060px;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
`;

const FTitle = styled.div`
    text-align: center;
    margin: 80px 0 20px;
    h2 {
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        font-weight: 700;
        strong {
            color: ${({ theme }) => theme.colors.Blue_030};
        }
    }
`;
