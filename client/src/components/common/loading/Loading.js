import React from "react";
import styled from "styled-components";
import LoadingCharater from "../../../assets/images/loading/LoadingCharater.gif";

const Loading = () => {
    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요.</LoadingText>
            <img src={LoadingCharater} alt="로딩중" />
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
