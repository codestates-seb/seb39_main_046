import React from "react";
import styled from "styled-components";
import { TiArrowUnsorted } from "react-icons/ti";
const scrollToTopBtn = ({ handleClick }) => {
    return (
        <>
            <ScrollContainer>
                <TiArrowUnsorted size="38" color="#2C2C2E" onClick={handleClick} />
            </ScrollContainer>
        </>
    );
};

export default scrollToTopBtn;
const ScrollContainer = styled.div`
    position: fixed;
    bottom: 30px;
    right: 15px;
    width: 38px;
    height: 38px;
    border-radius: 38px;
    z-index: 1000;
    cursor: pointer;
`;
