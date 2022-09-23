import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductBox from "../../components/product/ProductBox";

const ProductRanking = () => {
  const [currentTab, setcurrentTab] = useState(0);
  const menuArr = [
    { name: "전체 편의점", content: "Tab menu ONE" },
    { name: "GS25", content: "Tab menu TWO" },
    { name: "CU", content: "Tab menu THREE" },
    { name: "7-Eleven", content: "Tab menu THREE" },
  ];
  const selectMenuHandler = (index) => {
    setcurrentTab(index);
  };
  return (
    <>
      <Rcontainer>
        <RHearderBox>
          <h2>
            <strong>P</strong>ick your <strong>B</strong>est <strong>5</strong>
          </h2>
          <TabMenu>
            {menuArr.map((el, index) => {
              return (
                <li
                  key={index}
                  className={`${index === currentTab ? " focused" : null}`}
                  onClick={() => selectMenuHandler(index)}
                >
                  {el.name}
                </li>
              );
            })}
          </TabMenu>
          <TabContent>
            <ProductBox />
            <ProductBox />
            <ProductBox />
            <ProductBox />
            <ProductBox />
          </TabContent>
        </RHearderBox>
        <RMainBox></RMainBox>
      </Rcontainer>
    </>
  );
};

export default ProductRanking;
const Rcontainer = styled.section`
  text-align: center;
`;
const RHearderBox = styled.header`
  width: 100%;
  height: 700px;
  background-color: ${({ theme }) => theme.colors.Blue_010};
  padding: 65px;

  h2 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    color: ${({ theme }) => theme.colors.Gray_030};
    margin-bottom: 30px;
    strong {
      color: ${({ theme }) => theme.colors.Blue_030};
      font-weight: bold;
    }
  }
`;

const TabMenu = styled.ul`
  width: 450px;
  margin: 0 auto;
  display: flex;
  justify-items: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.Blue_030};
  margin-bottom: 60px;

  li {
    width: auto;
    display: flex;
    justify-items: center;
    align-items: center;
    border-radius: 30px;
    margin-right: 10px;
    padding: 10px 25px;
    cursor: pointer;
  }

  .focused {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.Blue_030};
    transition: 1s;
  }
`;

const TabContent = styled.div`
  margin: 0 auto;
  width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* 본문 */
const RMainBox = styled.main`
  width: 1280px;
  min-height: 1000px;
`;
