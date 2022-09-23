import React from "react";
import styled from "styled-components";
import HeartButton from "../common/button/HeartButton";
import Tag from "./Tag";
const ProductBox = () => {
  return (
    <ProductSection>
      <span className="heart-box">
        <HeartButton />
      </span>
      <PImage>
        <img
          src="https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg"
          alt="상품"
        />
      </PImage>
      <ProductsEx>
        <div className="tag-box">
          <Tag color="Eleven">7-Eleven</Tag>
          <Tag>안주</Tag>
        </div>
        <ProductName>고창복분자 너비아니 샌드위치</ProductName>
        <div className="line"></div>
        <ProductPrice>5,300원</ProductPrice>
      </ProductsEx>
    </ProductSection>
  );
};

export default ProductBox;
const ProductSection = styled.section`
  width: 240px;
  height: 355px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.5);

  position: relative;
  .heart-box {
    position: absolute;
    right: 10px;
    top: 7px;
    z-index: 10;
  }
`;

const PImage = styled.div`
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 20px;
    max-width: 190px;
    min-width: 130px;
  }
`;

const ProductsEx = styled.div`
  padding: 10px 15px;
  border-radius: 0 0 20px 20px;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.base};
  .line {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.Gray_010};
    margin: 5px 0;
  }
  .tag-box {
  }
`;

const ProductName = styled.p`
  margin-top: 10px;
  font-weight: 700;
  width: 100%;
  height: 30px;
  color: ${({ theme }) => theme.colors.Gray_090};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ProductPrice = styled.p`
  color: ${({ theme }) => theme.colors.Gray_030};
`;
