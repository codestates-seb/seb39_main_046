import React from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";

const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: 3px solid transparent;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    padding: 7px 1rem;
    /* 크기 */
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1rem;
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
        `;
    }}
`;

function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
}
Button.defaultProps = {
    color: "Blue_030",
};
export default Button;
