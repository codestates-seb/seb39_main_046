import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabRound from "../../common/tab/TabRound";
import MBestProduct from "./MBestProduct";
import { useTop5Products } from "../../../lib/api/useGetMainProducts";

const BestProdct = () => {
    const data = useTop5Products();

    return (
        <BestContainer>
            <BHeader>
                <h2>
                    <strong>P</strong>ick your <strong>B</strong>est <strong>5</strong>
                </h2>
                <TabRound />
            </BHeader>
            <ProductContainer>
                {data.data &&
                    data.data.map((el, idx) => {
                        return <MBestProduct className="item" key={idx} data={el} idx={idx}></MBestProduct>;
                    })}
            </ProductContainer>
        </BestContainer>
    );
};

export default BestProdct;

const BestContainer = styled.section`
    background-color: ${({ theme }) => theme.colors.Blue_010};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 60px 0 80px;
`;

const BHeader = styled.div`
    max-width: 1280px;
    h2 {
        text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        color: ${({ theme }) => theme.colors.Gray_030};
        height: 60px;
        margin-bottom: 30px;
        strong {
            color: ${({ theme }) => theme.colors.Blue_030};
            font-weight: bold;
        }
    }
    .header_more {
        font-size: ${({ theme }) => theme.fontSizes.small};
        font-weight: 500;
        color: ${({ theme }) => theme.colors.Orange_040};
        cursor: pointer;
        background-color: blue;
    }
`;

const ProductContainer = styled.div`
    display: flex;
    justify-content: center;
    max-width: 1280px;
    display: grid;
    align-items: stretch;
    grid-template-columns: 590px 290px 290px;
    grid-template-rows: 290px 290px;
    gap: 20px;
    .item {
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        position: relative;
        img {
            max-width: 180px;
        }
    }
    .item:nth-child(1) {
        grid-row: 1 / 3;
        img {
            min-width: 330px;
        }
    }
    .item:nth-child(4) {
        grid-column-start: 2;
        grid-column-end: 3;
    }
    @media ${({ theme }) => theme.device.laptopL} {
        grid-template-columns: 490px 240px 240px;
        grid-template-rows: 240px 240px;
        gap: 20px;
        .item {
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            position: relative;
            img {
                max-width: 120px;
            }
        }
        .item:nth-child(1) {
            grid-row: 1 / 3;
            img {
                min-width: 300px;
            }
        }
        .item:nth-child(4) {
            grid-column-start: 2;
            grid-column-end: 3;
        }
    }
    @media ${({ theme }) => theme.device.laptop} {
        max-width: 800px;
        padding: 0 10px;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-template-rows: 250px 250px;
        gap: 10px;
        .item {
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            position: relative;
            img {
                max-width: 120px;
            }
        }
        .item:nth-child(1) {
            grid-row: 1;
            img {
                min-width: 120px;
            }
        }
        .item:nth-child(4) {
            grid-column-start: 1;
            grid-column-end: 2;
        }
    }
    @media ${({ theme }) => theme.device.tablet} {
        max-width: 500px;
        padding: 0 10px;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-template-rows: 240px 240px 240px;
        gap: 10px;
        .item {
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            position: relative;
            img {
                max-width: 120px;
            }
        }
        .item:nth-child(1) {
            grid-row: 1;
            img {
                min-width: 120px;
            }
        }
        .item:nth-child(4) {
            grid-column-start: 2;
            grid-column-end: 3;
        }
    }
`;
