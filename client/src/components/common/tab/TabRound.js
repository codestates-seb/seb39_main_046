import React from "react";
import styled from "styled-components";
import useStore from "../../../lib/store";

const TabRound = () => {
  const { isMainTab, setMainTab } = useStore();
  const menuArr = ["전체 편의점", "GS25", "CU", "7-Eleven"];
  const selectMenuHandler = (index) => {
    setMainTab(index);
  };
  return (
    <TabMenu>
      {menuArr.map((el, index) => {
        return (
          <li
            key={index}
            className={`${el === isMainTab ? " focused" : null}`}
            onClick={() => selectMenuHandler(el)}
          >
            {el}
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
