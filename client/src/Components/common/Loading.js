import React from "react";
import styled from "styled-components";
import Spinner from "../../Assets/images/LoadingBall.gif";
import Spinner2 from "../../Assets/images/LoadingCharater.gif";

const Loading = () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner2} alt="로딩중" />
    </Background>
  );
};

export default Loading;
export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  /*   background: #ffffffb7; */
  background: #fff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;
