import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input.attrs({
  placeholder: "입력해주세요.",
})`
  width: 320px;
  height: 40px;
  border: 0px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 20px;
  padding-left: 15px;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.Blue_040};
  }
`;

function TextInput() {
  return <StyledInput></StyledInput>;
}
export default TextInput;
