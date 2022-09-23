import React, { Component } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "./slick-theme.css";
import "./slick.css";
import RecommendReco from "../../assets/images/main/RecommendCharcter.png";
import RecommendImg1 from "../../assets/images/main/Recommend-1.png";
import RecommendImg2 from "../../assets/images/main/Recommend-2.png";
import RecommendImg3 from "../../assets/images/main/Recommend-3.png";
import RecommendImg4 from "../../assets/images/main/Recommend-4.png";

const RecomendProduct = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <RContainer>
      <RTitleContainer>
        <RTitle>
          <h2>리코의 추천 상품</h2>
        </RTitle>
        <img src={RecommendReco} alt="추천 캐릭터" />
      </RTitleContainer>
      {/* 캐러셀 적용 하는 곳  */}
      <RProductCarosel>
        <Slider {...settings}>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
          <ProductSection>
            <RecoProducts />
            <ProductsEx>
              <ProductCategory>category</ProductCategory>
              <ProductName>Product name</ProductName>
              <div></div>
              <ProductPrice>5,300원</ProductPrice>
            </ProductsEx>
          </ProductSection>
        </Slider>
      </RProductCarosel>
    </RContainer>
  );
};

export default RecomendProduct;
const RContainer = styled.section`
  width: 1280px;
  margin: 0 auto;
`;

const RTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: relative;
    top: 0;
    left: -0px;
  }
`;

const RTitle = styled.div`
  text-align: center;
  height: 100px;
  width: 100%;
  margin-left: 120px;
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
  }
`;

const RProductCarosel = styled.section`
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
