import React, { useState } from "react";
import styled from "styled-components";

const TabRound = () => {
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

export default TabRound;

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
