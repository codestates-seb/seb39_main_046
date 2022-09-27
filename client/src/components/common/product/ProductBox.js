import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../button/HeartButton";
import Tag from "./Tag";
const ProductBox = ({ data }) => {
  const [color, setColor] = useState(null);
  const ChangeColor = () => {
    if (data.company === "7-ELEVEN") return setColor("ELEVEN");
    else return setColor(data.company);
  };
  console.log(color);
  return (
    <ProductSection onChange={ChangeColor}>
      <span className="heart-box">
        <HeartButton />
      </span>
      <PImage>
        <img src={data.imageURL} alt={data.productName} />
      </PImage>
      <ProductsEx>
        <div className="tag-box">
          <Tag buttonColor={data.company}>{data.company}</Tag>
          <Tag>안주</Tag>
        </div>
        <ProductName>{data.productName}</ProductName>
        <div className="line"></div>
        <ProductPrice>{data.price}원</ProductPrice>
      </ProductsEx>
    </ProductSection>
  );
};

export default ProductBox;
const ProductSection = styled.section`
  width: 100%;
  height: 355px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(204, 204, 204, 0.4);
  position: relative;
  cursor: pointer;
  .heart-box {
    position: absolute;
    right: 10px;
    top: 7px;
    z-index: 2;
  }
  box-sizing: content-box;
  border: 3px solid transparent;
  &:hover {
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        150deg,
        rgba(248, 132, 8, 1),
        rgba(255, 255, 255, 1),
        rgba(15, 98, 254, 1)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

const PImage = styled.div`
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 20px;
    max-width: 180px;
    max-height: 150px;
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
