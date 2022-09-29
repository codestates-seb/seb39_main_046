import { useState } from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import useStore from "../../../lib/store";

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isSortNum } = useStore();
    const handleSortChange = (e) => {
        useStore.setState({ isSortNum: e });
        setIsOpen(false);
    };
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
                    <li onClick={() => handleSortChange(1)}>좋아요</li>
                    <li onClick={() => handleSortChange(2)}>리뷰수</li>
                    <li onClick={() => handleSortChange(3)}>조회수</li>
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
