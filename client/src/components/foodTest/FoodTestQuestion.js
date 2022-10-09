import React, { useState } from "react";
import styled from "styled-components";
import { createSearchParams, useNavigate } from "react-router-dom";
import { QuestionData } from "../../assets/data/foodData/questionData";
import Button from "../common/button/Button";
import EatChracter from "../../assets/images/foodTest/FoodTestQuestion.svg";
import ProgressChracter from "../../assets/images/foodTest/ProgressBar.gif";

const FoodTestQuestion = () => {
    const navigate = useNavigate();

    const [questionNo, setQuestionNo] = useState(0);
    const [totalScore, setTotalScore] = useState([
        { id: "Drink", score: 0 },
        { id: "Coffee", score: 0 },
        { id: "Sandwich", score: 0 },
        { id: "Kimbab", score: 0 },
        { id: "LunchBox", score: 0 },
        { id: "Salad", score: 0 },
        { id: "Dessert", score: 0 },
        { id: "Snack", score: 0 },
        { id: "Icecream", score: 0 },
        { id: "Munchies", score: 0 },
        { id: "CupRamen", score: 0 },
        { id: "Hamburger", score: 0 },
    ]);

    const handleClickBtn = (no, type) => {
        const newScore = totalScore.map((s) => (s.id === type ? { id: s.id, score: s.score + no } : s));
        setTotalScore(newScore);

        if (QuestionData.length !== questionNo + 1) {
            setQuestionNo(questionNo + 1);
        } else {
            const highResult = totalScore.filter((data) => data.score >= 2);
            const upOneScore = totalScore.filter((data) => data.score >= 1);
            const randomResult = upOneScore[Math.floor(Math.random() * upOneScore.length)];

            if (highResult.length === 1) {
                navigate({
                    pathname: "/foodtest/result",
                    search: `?${createSearchParams({
                        mbti: highResult[0].id,
                    })}`,
                });
            } else {
                navigate({
                    pathname: "/foodtest/result",
                    search: `?${createSearchParams({
                        mbti: randomResult.id,
                    })}`,
                });
            }
        }
    };

    return (
        <Fcontainer>
            <ProgressBox>
                <ProgressBar width={(questionNo / QuestionData.length) * 100 + "%"}></ProgressBar>
                <Dot>
                    <img src={ProgressChracter} alt="진행바" />
                </Dot>
            </ProgressBox>
            <FContents>
                <FText>
                    <h3>
                        <strong>Q.</strong> {QuestionData[questionNo].QuestionTitle}
                    </h3>
                    <Button onClick={() => handleClickBtn(1, QuestionData[questionNo].answera.type)}>
                        {QuestionData[questionNo].answera.answerTitle}
                    </Button>
                    <Button onClick={() => handleClickBtn(1, QuestionData[questionNo].answerb.type)}>
                        {QuestionData[questionNo].answerb.answerTitle}
                    </Button>
                    <Button onClick={() => handleClickBtn(1, QuestionData[questionNo].answerb.type)}>
                        {QuestionData[questionNo].answerc.answerTitle}
                    </Button>
                    <Button onClick={() => handleClickBtn(1, QuestionData[questionNo].answerb.type)}>
                        {QuestionData[questionNo].answerd.answerTitle}
                    </Button>
                </FText>
                <FImg>
                    <img src={EatChracter} alt="캐릭터" />
                </FImg>
            </FContents>
        </Fcontainer>
    );
};

export default FoodTestQuestion;
const Fcontainer = styled.div`
    width: 100%;
    min-height: 630px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media ${({ theme }) => theme.device.laptop} {
        padding: 0 40px;
    }
`;
const FContents = styled.div`
    max-width: 900px;
    display: flex;
    justify-content: center;
    align-items: stretch;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.Gray_090};
`;

const FText = styled.div`
    width: 68%;
    h3 {
        color: ${({ theme }) => theme.colors.Gray_090};
        font-size: ${({ theme }) => theme.fontSizes.lg};
        margin-bottom: 30px;
        strong {
            font-weight: bold;
        }
    }
    Button {
        width: 100%;
        margin-bottom: 10px;
        font-size: ${({ theme }) => theme.fontSizes.base};
    }
    @media ${({ theme }) => theme.device.tablet} {
        width: 100%;
        padding: 0 20px;
    }
`;
const FImg = styled.div`
    width: 28%;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        margin-top: -30px;
    }
    @media ${({ theme }) => theme.device.tablet} {
        width: 0%;
        img {
            display: none;
        }
    }
`;

const ProgressBox = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
    background-color: #fff;
    width: 900px;
    height: 15px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    @media ${({ theme }) => theme.device.laptop} {
        width: 100%;
    }
`;
const ProgressBar = styled.div`
    width: ${(props) => props.width};
    background-color: ${({ theme }) => theme.colors.Blue_020};
    height: 100%;
    transition: width 1s;
    border-radius: 20px;
`;
const Dot = styled.div`
    width: 26px;
    height: 26px;
    box-sizing: border-box;
    border: 6px solid ${({ theme }) => theme.colors.Blue_030};
    border-radius: 35px;
    background: ${({ theme }) => theme.colors.Blue_020};
    margin-left: -10px;
    img {
        width: 80px;
        position: relative;
        top: -40px;
        left: -30px;
    }
`;
