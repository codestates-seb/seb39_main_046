import React from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";

const Sort = () => {
  return (
    <SelectContainer>
      <button type="button" class="toggle-btn">
        좋아요
      </button>
      <SortSelect>
        <li>좋아요</li>
        <li>조회수</li>
        <li>최신순</li>
      </SortSelect>
      <span>
        <AiFillCaretDown color="rgba(248, 132, 8, 1)" size={20} />
      </span>
    </SelectContainer>
  );
};

export default Sort;
const SelectContainer = styled.div`
  position: relative;
  span {
    position: absolute;
    right: -2px;
    z-index: 1;
  }
`;
const SortSelect = styled.ul`
  width: 70px;
  background-color: transparent;
  border: none;
  z-index: 3;
  color: ${({ theme }) => theme.colors.Orange_040};
  option {
    background: lightcoral;
    color: #fff;
    padding: 3px 0;
    font-size: 16px;
  }
  &:focus + span {
    transform: rotate(180deg);
  }
`;
