import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ResultData } from "../../../Assets/FoodData/resultdata";
import HChracter from "../../../Assets/images/FootTestHome.png";
import Button from "../../../Components/Common/Button";
import styled from "styled-components";

const FoodTestResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  const [resultData, setResultData] = useState({});
  useEffect(() => {
    const result = ResultData.find((s) => s.best === mbti);
    setResultData(result);
  }, [mbti]);
  return (
    <FContens>
      <h3>
        당신과 찰떡궁합인 음식은 <strong>{resultData.name}</strong>입니다
      </h3>
      <img src={resultData.image} alt={resultData.name} />
      <FBtn>
        <Button onClick={() => navigate("/foodtest")}>테스트 다시하기</Button>
        <Button>결과 공유하기</Button>
      </FBtn>
    </FContens>
  );
};

export default FoodTestResult;

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
    margin: 30px 0;
    width: 500px;
    border-radius: 30px;
  }
`;
const FBtn = styled.div`
  Button {
    margin-right: 30px;
  }
`;
