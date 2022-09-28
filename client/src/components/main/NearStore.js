import React from "react";
import styled from "styled-components";

const NearStore = () => {
    return (
        <div>
            <NearTitle>
                <NearWrite>주변 편의점 찾기</NearWrite>
            </NearTitle>
        </div>
    );
};

export default NearStore;

const NearTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 129px;
`;
const NearWrite = styled.p`
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    color: ${({ theme }) => theme.colors.Gray_090};
`;
