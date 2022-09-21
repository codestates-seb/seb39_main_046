import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HChracter from "../../Assets/images/FoodTest/FootTestHome.png";
import Button from "../common/Button";

const FoodTestHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <FContents>
        <h3>
          리코 질문에 대답하다보면,<strong> 취향조사 완료!</strong>
        </h3>
        <img src={HChracter} alt="캐릭터" />
        <Button onClick={() => navigate("question")}>START!</Button>
      </FContents>
    </>
  );
};

export default FoodTestHome;
const FContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
