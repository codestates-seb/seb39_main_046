import React from 'react';
import styled from 'styled-components';

const PersonalRivew = () => {

    const userName = "리코";

    return (
        <>
            <TitleDiv>
                <UserName>{userName}<Welcome>님이 찜꽁한 리뷰</Welcome></UserName>                
            </TitleDiv>
            <ProductsItemdiv>
                
            </ProductsItemdiv>
            
        </>
    );
};

const TitleDiv = styled.div`
    text-align:center;
    margin-bottom:50px;
`

const UserName = styled.span`
    color: ${({ theme }) => theme.colors.Blue_040};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    line-height:160%;
`
const Welcome = styled.span`
    color: ${({ theme }) => theme.colors.Gray_090};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight:700;
    line-height:160%;
`

const ProductsItemdiv = styled.div`
    width:1280px;
    
`


export default PersonalRivew;