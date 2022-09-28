import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const LineInput = () => {
    return (
        <>
            <LineInputBox>
                <input placeholder="제품명을 검색하세요." />
                <button>
                    <FiSearch size={25} />
                </button>
            </LineInputBox>
        </>
    );
};

export default LineInput;

const LineInputBox = styled.div`
    width: 600px;
    position: relative;
    margin: 40px 0;
    input {
        width: 600px;
        height: 56px;
        padding-left: 10px;
        background-color: transparent;
        border: none;
        border-bottom: 3px solid ${({ theme }) => theme.colors.Gray_090};
    }
    input::placeholder {
        color: ${({ theme }) => theme.colors.Gray_040};
    }
    button {
        position: absolute;
        right: 10px;
        top: 12px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`;
