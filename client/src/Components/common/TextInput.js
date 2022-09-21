import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input.attrs({
    placeholder:"입력해주세요."
})`
    width:288px;
    height:30px;
    border: 0px;
    font-size: ${({theme}) => theme.fontSizes.small};
    line-height:1rem;
    border:none;
    &:focus{
        outline: 1px solid ${({theme}) => theme.colors.Blue_040};
    }    
`

function TextInput() {
    return <StyledInput></StyledInput>
}
export default TextInput;