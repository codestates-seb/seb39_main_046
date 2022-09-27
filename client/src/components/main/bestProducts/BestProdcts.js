import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabRound from "../../common/tab/TabRound";
import ProductBox from "./BestProduct";
import { useMainProducts } from "../../../lib/api/useProducts";

const BestProdct = () => {
  const { allTop5 } = useMainProducts();

  let more = "더보기 >";
  const completionWord = "Pick your Best 5";

  // const [Title, setTitle] = useState("");
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const typingInterval = setInterval(() => {
  //     setTitle((prevTitleValue) => {
  //       let result = prevTitleValue
  //         ? prevTitleValue + completionWord[count]
  //         : completionWord[0];
  //       setCount(count + 1);
  //       if (count >= completionWord.length) {
  //         setTitle("");
  //         setCount(0);
  //       }
  //       return result;
  //     });
  //   }, 150);

  //   return () => {
  //     clearInterval(typingInterval);
  //   };
  // });

  return (
    <BestContainer>
      <BHeader>
        <div></div>
        <h2>{completionWord}</h2>
        <p className="header_more">{more}</p>
      </BHeader>
      <TabRound />
      <ProductContainer>
        {allTop5 &&
          allTop5.map((data, idx) => {
            return (
              <ProductBox
                className="item"
                key={idx}
                data={data}
                idx={idx}
              ></ProductBox>
            );
          })}
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
