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
    max-width: 100%;
    min-height: 630px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const FContents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.Gray_090};

    img {
        margin: 30px 0;
    }
`;

const FText = styled.div`
    width: 570px;
    height: 400px;
    margin-right: 30px;
    h3 {
        color: ${({ theme }) => theme.colors.Gray_090};
        font-size: ${({ theme }) => theme.fontSizes.lg};
        margin-bottom: 30px;
        strong {
            font-weight: bold;
        }
    }

    Button {
        width: 570px;
        margin-bottom: 10px;
        font-size: ${({ theme }) => theme.fontSizes.base};
    }
`;
const FImg = styled.div`
    width: 280px;
    height: 400px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 280px;
        margin-top: -10px;
    }
`;

const ProgressBox = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
    background-color: #fff;
    width: 870px;
    height: 15px;
    display: flex;
    align-items: center;
    border-radius: 20px;
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
