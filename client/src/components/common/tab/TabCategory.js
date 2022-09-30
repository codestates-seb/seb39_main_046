import React from "react";
import styled from "styled-components";
import useStore from "../../../lib/store";

const TabCategory = () => {
    const { isCategoryTab, setCategoryTab } = useStore();
    const menuArr = [
        {
            categoryId: 13,
            categoryName: "ALL",
        },
        {
            categoryId: 1,
            categoryName: "음료",
        },
        {
            categoryId: 2,
            categoryName: "커피",
        },
        {
            categoryId: 3,
            categoryName: "아이스크림",
        },
        {
            categoryId: 4,
            categoryName: "과자",
        },
        {
            categoryId: 5,
            categoryName: "도시락/컵밥",
        },
        {
            categoryId: 6,
            categoryName: "라면",
        },
        {
            categoryId: 7,
            categoryName: "김밥",
        },
        {
            categoryId: 8,
            categoryName: "샐러드",
        },
        {
            categoryId: 9,
            categoryName: "디저트류",
        },
        {
            categoryId: 10,
            categoryName: "샌드위치",
        },
        {
            categoryId: 11,
            categoryName: "버거",
        },

        {
            categoryId: 12,
            categoryName: "안주",
        },
    ];

    const selectMenuHandler = (index) => {
        setCategoryTab(index);
    };

    return (
        <TabMenu>
            {menuArr.map((el) => {
                return (
                    <li
                        key={el.categoryId}
                        className={`${el.categoryId === isCategoryTab ? " focused" : null}`}
                        onClick={() => selectMenuHandler(el.categoryId)}
                    >
                        {el.categoryName}
                    </li>
                );
            })}
        </TabMenu>
    );
};

export default TabCategory;
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
        padding: 6px 16px;
        cursor: pointer;
    }

    .focused {
        color: #fff;
        background-color: ${({ theme }) => theme.colors.Gray_040};
        transition: 1s;
    }
`;
