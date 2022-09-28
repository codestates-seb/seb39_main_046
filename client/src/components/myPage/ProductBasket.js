import React from "react";
import styled from "styled-components";
import titleimg from "../../assets/images/userinfo/title.png";

const ProductBasket = () => {
    const userName = "리코";
    const more = "더보기 >";

    return (
        <Topdiv>
            <BasketTitle>
                <section>
                    <img src={titleimg} alt="이틀 이미지" />
                    <Username>
                        {userName}
                        <span>님의 찜꽁바구니</span>
                    </Username>
                    <p>{more}</p>
                </section>
            </BasketTitle>
            <CarashelContent></CarashelContent>
        </Topdiv>
    );
};

const Topdiv = styled.div`
    margin-left: 300px;
    margin-right: 300px;
`;
const BasketTitle = styled.section`
    width: 100%;
    section {
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
    }
    img {
        /* margin-top:${({ theme }) => theme.margins.xl}; */
        width: 119px;
        height: 140px;
    }
    p {
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Orange_040};
        padding-top: ${({ theme }) => theme.paddings.xl};
        cursor: pointer;
    }
`;
const Username = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    text-align: center;
    color: ${({ theme }) => theme.colors.Blue_040};
    margin-right: 42px;
    span {
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        font-weight: 700;
        color: ${({ theme }) => theme.colors.Gray_090};
    }
`;
const CarashelContent = styled.section`
    margin: 0 auto;
    width: 1280px;
    margin-bottom: 100px;
    margin-right: 250px;
`;

const ProductSection = styled.section`
    width: 240px;
    height: 355px;
    border-radius: 20px;
    margin-right: 14px;
`;

const ProductsEx = styled.div`
    padding: 10px 15px;
    border-radius: 0 0 20px 20px;
    div {
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        margin: 5px 0;
    }
`;

const RecoProducts = styled.div`
    width: 100%;
    height: 240px;
    background: url("/character/상품준비 안됫음 .png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 70%;
    border-radius: 20px 20px 0 0;
    background-color: #fff9f3;
`;

const ProductCategory = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.Orange_040};
`;
const ProductName = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.Gray_090};
`;
const ProductPrice = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.Gray_030};
`;

export default ProductBasket;
