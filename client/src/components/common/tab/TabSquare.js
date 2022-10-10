import React from "react";
import styled from "styled-components";
import useStore from "../../../lib/store";

const TabSquare = () => {
    const { isStoreTab, setStoreTab } = useStore();
    const menuArr = ["전체 편의점", "GS25", "CU", "7-ELEVEN"];
    const selectMenuHandler = (el) => {
        setStoreTab(el);
        useStore.setState({ isCurrentPage: 1 });
        useStore.setState({ isProductDetail: 1 });
    };
    return (
        <TabMenu>
            {menuArr.map((el, index) => {
                return (
                    <li
                        key={index}
                        className={`${el === isStoreTab ? " focused" : null}`}
                        onClick={() => selectMenuHandler(el)}
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
    li:last-child {
        margin-right: 0px;
    }

    .focused {
        color: #fff;
        background-color: ${({ theme }) => theme.colors.Blue_030};
        transition: 1s;
    }
    @media ${({ theme }) => theme.device.tablet} {
        li {
            width: 120px;
            font-size: ${({ theme }) => theme.fontSizes.xs};
        }
        li:last-child {
            margin-right: 0px;
        }
    }
    @media ${({ theme }) => theme.device.mobile} {
        li {
            width: 100px;
            font-size: ${({ theme }) => theme.fontSizes.xs};
        }
        li:last-child {
            margin-right: 0px;
        }
    }
`;
