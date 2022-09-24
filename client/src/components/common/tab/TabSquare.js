import React, { useState } from "react";
import styled from "styled-components";

const TabSquare = () => {
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

export default TabSquare;

const TabMenu = styled.ul`
  width: auto;
  display: flex;
  justify-items: center;
  align-items: center;
  margin-bottom: 20px;
  li {
    width: 160px;
    height: 46px;
    line-height: 46px;
    border-radius: 10px 10px 0px 0px;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.colors.Blue_010};
    cursor: pointer;
  }

  .focused {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.Blue_030};
    transition: 1s;
  }
`;
