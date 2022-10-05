import { useState } from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import useStore from "../../../lib/store";

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [likename, setLikeName] = useState("조회수");
    const handleSortChange = (e) => {
        console.log(e.likeName);
        useStore.setState({ isSortNum: e.likeNum });
        setLikeName(e.likeName);
        setIsOpen(false);
    };
    const LikeList = [
        { likeName: "조회수", likeNum: 3 },
        { likeName: "좋아요", likeNum: 1 },
        { likeName: "리뷰수", likeNum: 2 },
    ];
    return (
        <DropDownContainer>
            <button
                onClick={(e) => {
                    setIsOpen(!isOpen);
                    console.log(isOpen);
                }}
            >
                {likename}
                <span>
                    <AiFillCaretDown color="rgba(248, 132, 8, 1)" size={20} />
                </span>
            </button>

            {isOpen ? (
                <Menu>
                    {LikeList && LikeList.map((el) => <li onClick={() => handleSortChange(el)}>{el.likeName}</li>)}
                    {/* <li onClick={() => handleSortChange(3)}>조회수</li>
                    <li onClick={() => handleSortChange(1)}>좋아요</li>
                    <li onClick={() => handleSortChange(2)}>리뷰수</li> */}
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
    width: 80px;
    text-align: left;
    z-index: 30;
    padding: 5px 7px 5px 10px;
    border-radius: 0 0 8px 8px;
    position: absolute;
    top: 30px;
    right: 0;
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.Gray_010};
    color: ${({ theme }) => theme.colors.Gray_030};
    box-shadow: 0px 5px 8px rgba(204, 204, 204, 0.2);
    li {
        cursor: pointer;
        height: 30px;
        &:hover {
            color: ${({ theme }) => theme.colors.Orange_040};
            text-decoration: underline;
        }
    }
`;
