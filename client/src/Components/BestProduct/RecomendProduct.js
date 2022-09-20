import React from 'react';
import styled from 'styled-components';

const RecomendProduct = () => {

    let more = "편BTI 하러가기 >";

    return (
        <div>
            <RecoProduct>
                <div></div>
                <RecoTtitle>리코의 추천 상품</RecoTtitle>
                <Reco></Reco>
            </RecoProduct>
            <RecoProductsbar>
                <ProductSection>
                    <RecoProducts/>
                    <ProductCategory>category</ProductCategory>
                    <ProductName>Product name</ProductName>
                    <ProductPrice>5,300원</ProductPrice>
                </ProductSection>
                <ProductSection>
                    <RecoProducts/>
                    <ProductCategory>category</ProductCategory>
                    <ProductName>Product name</ProductName>
                    <ProductPrice>5,300원</ProductPrice>
                </ProductSection>
                <ProductSection>
                    <RecoProducts/>
                    <ProductCategory>category</ProductCategory>
                    <ProductName>Product name</ProductName>
                    <ProductPrice>5,300원</ProductPrice>
                </ProductSection>
                <ProductSection>
                    <RecoProducts/>
                    <ProductCategory>category</ProductCategory>
                    <ProductName>Product name</ProductName>
                    <ProductPrice>5,300원</ProductPrice>
                </ProductSection>
            </RecoProductsbar>
            <MbtiBar>
                <RecoCom></RecoCom>
                <MbtiP>내 편의점 취향이 궁금하다면?</MbtiP>
                <MbtiGo>{more}</MbtiGo>
            </MbtiBar>
        </div>
    );
};

export default RecomendProduct;

const RecoProduct  = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
`

const RecoTtitle = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight:700;
    margin-left: 70px
`
const Reco = styled.div`
    background:url('/Character/6.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80% 80%;
    width : 119px;
    height : 144px;
`

const MbtiBar = styled.div`
    width:100%;
    height: 100px;
    background-color: ${({theme}) => theme.colors.Orange_030};
    display: flex;
    justify-content: space-around;
    align-items:center;
    margin-bottom:80px;
`
const RecoCom = styled.div`
    width:154px;
    height:100px;
    background: url('/Character/9.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80% 100%;
`
const MbtiP = styled.p`
    font-size: ${({theme}) => theme.fontSizes.xxxl};
    font-weight: 500;
    text-align: center;
`
const MbtiGo = styled.p`
    font-weight:500;
    color: ${({ theme }) => theme.colors.White};
    font-size: ${({ theme }) => theme.fontSizes.small};
`

const RecoProductsbar = styled.section`
    display:flex;
    justify-content:center;
    align-items:center;
`

const ProductSection = styled.section`
    width:240px;
    height:354px;
`

const RecoProducts = styled.div`
    width:240px;
    height:240px;
    background: url("/Character/상품준비 안됫음.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80% 80%;
`

const ProductCategory = styled.p`
    font-size: ${({theme}) => theme.fontSizes.xs};
    font-weight:500;
    color: ${({ theme }) => theme.colors.Orange_040};
    margin-bottom:${({theme}) => theme.margins.base};
`
const ProductName = styled.p `
    font-size: ${({theme}) => theme.fontSizes.base};
    font-weight:700;
    color: ${({ theme }) => theme.colors.Gray_090};
    margin-bottom:${({theme}) => theme.margins.xl};
`
const ProductPrice = styled.p `
    font-size: ${({theme}) => theme.fontSizes.base};
    font-weight:700;
    color: ${({ theme }) => theme.colors.Gray_030};

`