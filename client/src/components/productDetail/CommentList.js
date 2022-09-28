import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentList = () => {
  const Commentlng = "n";
  return (
    <MainDiv>
      <TitleDiv>
        <span>{Commentlng}개의 리뷰가 있어요!</span>
      </TitleDiv>
      <CommentArea>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </CommentArea>
    </MainDiv>
  );
};

export default CommentList;

const MainDiv = styled.div``;
const TitleDiv = styled.section`
  text-align: center;
  span {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.Blue_030};
  }
`;
const CommentArea = styled.section`
  height: 320px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 150px;
  margin-top: 26px;
  overflow: auto;
`;
