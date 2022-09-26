import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TabRound from "../common/tab/TabRound";
import HeartButton from "../common/button/HeartButton";

const BestProdct = () => {
  let more = "더보기 >";
  const completionWord = "Pick your Best 5";
  const [Title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTitle((prevTitleValue) => {
        let result = prevTitleValue
          ? prevTitleValue + completionWord[count]
          : completionWord[0];
        setCount(count + 1);
        if (count >= completionWord.length) {
          setTitle("");
          setCount(0);
        }
        return result;
      });
    }, 150);

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <BestContainer>
      <BHeader>
        <div></div>
        <h2>{Title}</h2>
        <p className="header_more">{more}</p>
      </BHeader>
      <TabRound />
      <ProductContainer>
        <ProductBox className="item">
          <span className="rank_number">1</span>
          <span className="heart_btn">
            <HeartButton />
          </span>
          <div className="product_img">
            <img
              src="https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg"
              alt="상품"
            />
          </div>
          <div className="product_contents">
            <p className="product_title">고창 복분자 너비아니 샌드</p>
            <p className="product_price">5,300원</p>
          </div>
        </ProductBox>
        <ProductBox className="item">
          <span className="rank_number">2</span>{" "}
          <span className="heart_btn">
            <HeartButton />
          </span>
          <div className="product_img">
            <img
              src="https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg"
              alt="상품"
            />
          </div>
          <div className="product_contents">
            <p className="product_title">고창 복분자 너비아니 샌드</p>
            <p className="product_price">5,300원</p>
          </div>
        </ProductBox>
        <ProductBox className="item">
          <span className="rank_number">2</span>{" "}
          <span className="heart_btn">
            <HeartButton />
          </span>
          <div className="product_img">
            <img
              src="https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg"
              alt="상품"
            />
          </div>
          <div className="product_contents">
            <p className="product_title">고창 복분자 너비아니 샌드</p>
            <p className="product_price">5,300원</p>
          </div>
        </ProductBox>
        <ProductBox className="item">
          <span className="rank_number">2</span>{" "}
          <span className="heart_btn">
            <HeartButton />
          </span>
          <div className="product_img">
            <img
              src="https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg"
              alt="상품"
            />
          </div>
          <div className="product_contents">
            <p className="product_title">고창 복분자 너비아니 샌드</p>
            <p className="product_price">5,300원</p>
          </div>
        </ProductBox>
        <ProductBox className="item">
          <span className="rank_number">2</span>{" "}
          <span className="heart_btn">
            <HeartButton />
          </span>
          <div className="product_img">
            <img
              src="https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg"
              alt="상품"
            />
          </div>
          <div className="product_contents">
            <p className="product_title">고창 복분자 너비아니 샌드</p>
            <p className="product_price">5,300원</p>
          </div>
        </ProductBox>
      </ProductContainer>
    </BestContainer>
  );
};

export default BestProdct;

const BestContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.Blue_010};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px 0 80px;
`;

const BHeader = styled.div`
  width: 1180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    text-align: center;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    color: ${({ theme }) => theme.colors.Gray_030};
    height: 60px;
    margin-bottom: 40px;
  }
  .header_more {
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.Orange_040};
    cursor: pointer;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1280px;
  display: grid;
  align-items: stretch;
  grid-template-columns: 590px 290px 290px;
  grid-template-rows: 290px 290px;
  gap: 20px;

  .item {
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    img {
      max-width: 180px;
    }
  }
  .item:nth-child(1) {
    grid-row: 1 / 3;
    img {
      min-width: 330px;
    }
  }
  .item:nth-child(4) {
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

const ProductBox = styled.div`
  span {
    position: absolute;
    top: 13px;
  }
  .rank_number {
    left: 25px;
    color: ${({ theme }) => theme.colors.Blue_050};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 500;
  }
  .heart_btn {
    right: 45px;
    z-index: 3;
  }
  .product_img {
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product_contents {
    width: 100%;
    height: 60px;
    border-radius: 0 0 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.colors.Gray_010};
    .product_title {
      font-weight: bold;
    }
    .product_price {
      color: ${({ theme }) => theme.colors.Gray_030};
    }
  }
`;
