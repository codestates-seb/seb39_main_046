import React from "react";
import styled, { css } from "styled-components";

const ProductCategory = styled.button`
  display: inline-flex;
  outline: none;
  border: 3px solid transparent;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: white;
  cursor: pointer;
  ${(props) => {
    const selected = props.theme.colors[props.color];
    return css`
      background: ${selected};
      &:hover {
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
  color: "Gray_030",
};

export default Tag;
