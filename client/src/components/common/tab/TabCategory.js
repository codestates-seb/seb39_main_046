import React, { useState } from "react";
import styled from "styled-components";
import useStore from "../../../lib/store";

const TabCategory = () => {
  const { categoryTab, setCategoryTab } = useStore();
  const menuArr = [
    "ALL",
    "음료",
    "커피",
    "아이스크림",
    "과자",
    "도시락",
    "김밥",
    "샐러드",
    "샌드위치",
    "버거",
    "냉동식품",
  ];
  const selectMenuHandler = (index) => {
    setCategoryTab(index);
  };
  return (
    <TabMenu>
      {menuArr.map((el, index) => {
        return (
          <li
            key={index}
            className={`${index === categoryTab ? " focused" : null}`}
            onClick={() => selectMenuHandler(index)}
          >
            {el}
          </li>
        );
      })}
    </TabMenu>
  );
};

export default TabCategory;
const TabMenu = styled.ul`
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-flow: wrap;
  color: ${({ theme }) => theme.colors.Blue_030};
  margin-bottom: 30px;
  padding-left: 30px;
  li {
    width: auto;
    background-color: ${({ theme }) => theme.colors.Gray_010};
    color: ${({ theme }) => theme.colors.Gray_020};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    display: flex;
    justify-items: center;
    align-items: center;
    border-radius: 30px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 6px 20px;
    cursor: pointer;
  }

  .focused {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.Gray_040};
    transition: 1s;
  }
`;
