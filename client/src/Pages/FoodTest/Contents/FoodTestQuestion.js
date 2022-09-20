import React, { useState } from "react";
import styled from "styled-components";
import { createSearchParams, useNavigate } from "react-router-dom";
import { QuestionData } from "../../../Assets/FoodData/questionData";
import Button from "../../../Components/Common/Button";
import HChracter from "../../../Assets/images/FootTestHome.png";

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
  console.log(totalScore);

  const handleClickBtn = (no, type) => {
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );
    setTotalScore(newScore);

    if (QuestionData.length !== questionNo + 1) {
      setQuestionNo(questionNo + 1);
    } else {
      //2개이상이 있으면 바로 결과값으로 들어가고
      //1개이상만 있으면 그중에서 랜덤으로 결과값 도출
      const result = totalScore.filter((data) => data.score >= 2);
      const result2 = totalScore.filter((data) => data.score >= 1);
      const result3 = result2[Math.floor(Math.random() * result2.length)];

      if (result.length === 1) {
        navigate({
          pathname: "/result",
          search: `?${createSearchParams({
            mbti: result[0].id,
          })}`,
        });
      } else {
        console.log(result3);
        navigate({
          pathname: "/result",
          search: `?${createSearchParams({
            mbti: result3.id,
          })}`,
        });
      }
    }
  };

  return (
    <div>
      <FContents>
        <FText>
          <h4>Q. {QuestionData[questionNo].QuestionTitle}</h4>
          <Button
            onClick={() =>
              handleClickBtn(1, QuestionData[questionNo].answera.type)
            }
          >
            {QuestionData[questionNo].answera.answerTitle}
          </Button>
          <Button
            onClick={() =>
              handleClickBtn(1, QuestionData[questionNo].answerb.type)
            }
          >
            {QuestionData[questionNo].answerb.answerTitle}
          </Button>
          <Button
            onClick={() =>
              handleClickBtn(1, QuestionData[questionNo].answerb.type)
            }
          >
            {QuestionData[questionNo].answerc.answerTitle}
          </Button>
          <Button
            onClick={() =>
              handleClickBtn(1, QuestionData[questionNo].answerb.type)
            }
          >
            {QuestionData[questionNo].answerd.answerTitle}
          </Button>
        </FText>
        <FImg>
          <img src={HChracter} alt="캐릭터" />
        </FImg>
      </FContents>
    </div>
  );
};

export default FoodTestQuestion;

const FContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.Gray_090};
  h3 {
    strong {
      font-weight: bold;
    }
  }
  img {
    margin: 30px 0;
  }
`;

const FText = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 30px;
  h4 {
    color: ${({ theme }) => theme.colors.Gray_090};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: 30px;
  }
  Button {
    width: 400px;
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
const FImg = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.Blue_020};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transform: scale(120%);
  }
`;
