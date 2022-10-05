import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch, FiArrowUpLeft, FiXCircle } from "react-icons/fi";
import useStore from "../../../lib/store";
import { useAllProducts } from "../../../lib/api/useGetProducts";

const LineInput = () => {
    const { isKeyword, setKeyword } = useStore();
    const [keyItems, setKeyItems] = useState({});

    const onChangeData = (e) => {
        setKeyword(e.target.value);
    };
    const { data } = useAllProducts();

    const updateData = async () => {
        let serchResult = data && data.filter((data) => data.productName.includes(isKeyword) === true).slice(0, 10);
        setKeyItems(serchResult);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (isKeyword) updateData();
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [isKeyword]);

    return (
        <LineInputBox>
            <input placeholder="상품명을 검색하세요." value={isKeyword} onChange={onChangeData} />
            {isKeyword && isKeyword.length > 0 ? (
                <button>
                    <FiXCircle size={25} onClick={() => setKeyword("")} />
                </button>
            ) : (
                <button>
                    <FiSearch size={25} />
                </button>
            )}
            {keyItems.length > 0 && isKeyword && (
                <AutoSearchContainer>
                    <AutoSearchWrap>
                        {keyItems.map((search, idx) => (
                            <AutoSearchData
                                key={search.productName}
                                onClick={() => {
                                    setKeyword(search.productName);
                                }}
                            >
                                {search.productName}
                                <span>
                                    <FiArrowUpLeft size={25} />
                                </span>
                            </AutoSearchData>
                        ))}
                    </AutoSearchWrap>
                </AutoSearchContainer>
            )}
        </LineInputBox>
    );
};

export default LineInput;

const LineInputBox = styled.div`
    width: 570px;
    position: relative;
    margin: 40px 0;
    input {
        width: 570px;
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
const AutoSearchContainer = styled.div`
    z-index: 20;
    width: 570px;
    background-color: #fff;
    position: absolute;
    top: 45px;
    padding: 15px;
    margin-top: 12px;
    background-color: ${({ theme }) => theme.colors.Gray_010};
    border-radius: 0 0 15px 15px;
    box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.2);
`;

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
    padding: 10px 8px;
    width: 100%;
    font-weight: bold;
    z-index: 4;
    letter-spacing: 2px;
    &:hover {
        background-color: ${({ theme }) => theme.colors.Gray_020};
        border-radius: 10px;
        cursor: pointer;
    }
    position: relative;
    span {
        position: absolute;
        right: 5px;
        width: 18px;
        top: 55%;
        transform: translateY(-50%);
    }
`;
