import React, { useState } from "react";
import styled from "styled-components";

const TabRound = () => {
  const [currentTab, setcurrentTab] = useState(0);
  const menuArr = [
    { name: "ALL", content: "" },
    { name: "음료", content: "" },
    { name: "커피", content: "" },
    { name: "아이스크림", content: "" },
    { name: "과자", content: "" },
    { name: "도시락", content: "" },
    { name: "김밥", content: "" },
    { name: "샐러드", content: "" },
    { name: "디저트류", content: "" },
    { name: "샌드위치", content: "" },
    { name: "버거", content: "" },
    { name: "냉동식품", content: "" },
  ];
  const selectMenuHandler = (index) => {
    setcurrentTab(index);
  };
  return (
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
  );
};

export default TabRound;
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
