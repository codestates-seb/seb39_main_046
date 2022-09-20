import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: 3px solid transparent;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height: 2rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 1.75rem;

  /* 색상 */
  ${(props) => {
    const selected = props.theme.colors[props.color];
    return css`
      background: ${selected};
      &:hover {
        background: ${darken(0.1, selected)};
      }
      &:active {
        background: ${darken(0.2, selected)};
      }
      &:focus {
        border: 3px solid ${({ theme }) => theme.colors.Blue_010};
        height: 2.2rem;
        line-height: 2rem;
      }
    `;
  }}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
Button.defaultProps = {
  color: "Blue_030",
};
export default Button;
