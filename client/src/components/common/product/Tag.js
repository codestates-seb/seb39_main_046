import React from "react";
import styled, { css } from "styled-components";

const ProductCategory = styled.button`
    display: inline-flex;
    outline: none;
    border: 3px solid transparent;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    cursor: pointer;
    ${(props) => {
        const buttonColor = props.theme.colors[props.buttonColor];
        const fontColor = props.theme.colors[props.fontColor];
        const outline = props.theme.colors[props.lineColor];
        const fontSize = props.theme.fontSizes[props.fontSize];
        return css`
            background: ${buttonColor};
            color: ${fontColor};
            /* border: 1px solid ${outline}; */
            font-size: ${fontSize};
            &:hover {
                /* box-shadow: 2px 2px 2px rgba(204, 204, 204, 0.9); */
            }
        `;
    }}
    & + & {
        margin-left: 0.4rem;
    }
`;

const Tag = ({ children, ...rest }) => {
    return <ProductCategory {...rest}>{children}</ProductCategory>;
};

Tag.defaultProps = {
    buttonColor: "Gray_030",
    fontColor: "White",
    fontSize: "xxs",
};

export default Tag;
