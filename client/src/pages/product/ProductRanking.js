import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "../../components/common/dropDown/DropDown";
import Sort from "../../components/common/dropDown/Sort";
import LineInput from "../../components/common/input/LineInput";
import TabRound from "../../components/common/tab/TabRound";
import TabSquare from "../../components/common/tab/TabSquare";
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
        <RMainBox>
          <TabSquare />
          <LineInput />
          <TabRound />
          <div className="likebtn">
            <DropDown />
          </div>
          <section className="productContainer">
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
          </section>
        </RMainBox>
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
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 90px;

  .productContainer {
    max-width: 1060px;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  .likebtn {
    width: 1000px;
    text-align: right;
  }
`;
