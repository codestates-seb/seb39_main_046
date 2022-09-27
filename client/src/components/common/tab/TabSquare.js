import React from "react";
import styled from "styled-components";
import useStore from "../../../lib/store";

const TabSquare = () => {
  const { productsTab, setProductsTab } = useStore();
  const menuArr = ["전체 편의점", "GS25", "CU", "7-Eleven"];
  const selectMenuHandler = (index) => {
    setProductsTab(index);
  };
  return (
    <TabMenu>
      {menuArr.map((el, index) => {
        return (
          <li
            key={index}
            className={`${index === productsTab ? " focused" : null}`}
            onClick={() => selectMenuHandler(index)}
          >
            {el}
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
