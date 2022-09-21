import React from 'react';
import styled from 'styled-components';

const BestReview = () => {
    return (
        <div>
            <BestRiveTitle>
                <ReivewWrite>베스트 리뷰</ReivewWrite>
            </BestRiveTitle>
            <ReiveewDiv>
                <ReviewImg/>
                <ReviewImg/>
                <ReviewImg/>
                <ReviewImg/>
                <ReviewImg/>
            </ReiveewDiv>            
        </div>
    );
};

export default BestReview;

const BestRiveTitle = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom: ${({theme}) => theme.interval.base};
`
const ReivewWrite = styled.p`
    font-size: ${({theme}) => theme.fontSizes.titleSize};
    font-weight:700;
`
const ReiveewDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    margin-bottom:${({theme}) => theme.interval.xl};
`
const ReviewImg = styled.div`
    width:220px;
    height: 220px;
    margin-right: ${({theme}) => theme.margins.xxxl};
    background: url("/Character/상품준비 안됫음.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80% 80%;
    border-radius: 20px;

`