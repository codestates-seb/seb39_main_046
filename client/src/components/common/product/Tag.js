import React from "react";
import styled, { css } from "styled-components";

const ProductCategory = styled.button`
  display: inline-flex;
  outline: none;
  border: 3px solid transparent;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  cursor: pointer;
  ${(props) => {
    const buttonColor = props.theme.colors[props.buttonColor];
    const fontColor = props.theme.colors[props.fontColor];
    const outline = props.theme.colors[props.lineColor];
    return css`
      background: ${buttonColor};
      color: ${fontColor};
      /* border: 1px solid ${outline}; */
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
};

export default Tag;
