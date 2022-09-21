import React, { Component } from "react";
import styled from "styled-components";
import PbtiBanner from "../common/PbtiBanner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecomendProduct = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <RecoProduct>
        <div></div>
        <RecoTtitle>리코의 추천 상품</RecoTtitle>
        <Reco></Reco>
      </RecoProduct>
      {/* 캐러셀 적용 하는 곳  */}
      <RecoProductsbar>
        <Slider {...settings}>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        <ProductSection>
          <RecoProducts />
          <ProductsEx>
            <ProductCategory>category</ProductCategory>
            <ProductName>Product name</ProductName>
            <ProductPrice>5,300원</ProductPrice>
          </ProductsEx>
        </ProductSection>
        </Slider>
      </RecoProductsbar>
      <PbtiBanner />
    </div>
  );
};

export default RecomendProduct;

const RecoProduct = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const RecoTtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
  margin-left: 70px;
`;
const Reco = styled.div`
  background: url("/Character/6.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% 80%;
  width: 119px;
  height: 144px;
`;

const RecoProductsbar = styled.section`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin-bottom: 100px;
  margin-left : 250px;
  margin-right: 250px;
`;

const ProductSection = styled.section`
  width: 240px;
  height: 354px;
  box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.3);
  border-radius: 20px;
  margin-right: 14px;
`;

const RecoProducts = styled.div`
  width: 100%;
  height: 240px;
  background: url("/character/상품준비 안됫음 .png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 60% 90%;
  border-radius: 20px 20px 0 0;
`;

const ProductsEx = styled.div`
  padding: 10px 15px;

  border-radius: 0 0 20px 20px;
  div {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.Gray_020};
    margin: 5px 0;
  }
`;
const ProductCategory = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  text-align:center;
  color: ${({ theme }) => theme.colors.Orange_040};
`;
const ProductName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  text-align:center;
  color: ${({ theme }) => theme.colors.Gray_090};
`;
const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  text-align:center;
  color: ${({ theme }) => theme.colors.Gray_030};
`;
