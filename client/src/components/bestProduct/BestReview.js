import React from "react";
import styled from "styled-components";

const BestReview = () => {
  return (
    <div>
      <BestRiveTitle>
        <ReivewWrite>베스트 리뷰</ReivewWrite>
      </BestRiveTitle>
      <ReivewContainer>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
        <ReviewBox></ReviewBox>
      </ReivewContainer>
    </div>
  );
};

export default BestReview;

const BestRiveTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.interval.base};
`;
const ReivewWrite = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
`;
const ReivewContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.interval.xl};
`;
const ReviewBox = styled.div`
  width: 220px;
  height: 220px;
  border: 2px solid rgba(204, 204, 204, 0.3);
  box-shadow: 0px 2px 20px rgba(204, 204, 204, 0.3);
  margin-right: ${({ theme }) => theme.margins.xxxl};
  background: url("/Character/상품준비 안됫음 .png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% 80%;
  border-radius: 20px;
`;
