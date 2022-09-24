import { useState } from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownContainer>
      <button
        onClick={(e) => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
      >
        좋아요
        <span>
          <AiFillCaretDown color="rgba(248, 132, 8, 1)" size={20} />
        </span>
      </button>

      {isOpen ? (
        <Menu>
          <li>좋아요</li>
          <li>리뷰순</li>
          <li>최신순</li>
        </Menu>
      ) : null}
    </DropDownContainer>
  );
};

export default DropDown;
const DropDownContainer = styled.div`
  position: relative;
  button {
    color: ${({ theme }) => theme.colors.Orange_040};
    background-color: transparent;
    border: none;
    span {
      position: relative;
      top: 3px;
      left: 2px;
    }
  }
`;
const Menu = styled.ul`
  font-size: ${({ theme }) => theme.fontSizes.small};
  background: #ffdcb6;
  border-radius: 8px;
  width: 80px;
  color: ${({ theme }) => theme.colors.Orange_040};
  text-align: left;
  padding: 5px 7px;
  z-index: 10;
  position: absolute;
  top: 30px;
  right: 0;
  li {
    cursor: pointer;
    height: 30px;
  }
`;
