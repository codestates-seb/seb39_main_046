import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { BsArrowUpLeft } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import useStore from "../../../lib/store";

const LineInput = () => {
    const { isKeyWord, setKeyWord } = useStore();
    const [keyItems, setKeyItems] = useState({});

    const onChangeData = (e) => {
        setKeyWord(e.target.value);
    };

    const updateData = async () => {
        const res = await fetch(`/product/all`)
            .then((res) => res.json())
            .then((data) => data.slice(0, 100));
        let b = res && res.filter((data) => data.productName.includes(isKeyWord) === true).slice(0, 10);
        setKeyItems(b);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (isKeyWord) updateData();
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [isKeyWord]);

    return (
        <LineInputBox>
            <input placeholder="제품명을 검색하세요." value={isKeyWord} onChange={onChangeData} />
            {isKeyWord.length > 0 ? (
                <button>
                    <TiDeleteOutline size={27} onClick={() => setKeyWord("")} />
                </button>
            ) : (
                <button>
                    <FiSearch size={25} />
                </button>
            )}
            {keyItems.length > 0 && isKeyWord && (
                <AutoSearchContainer>
                    <AutoSearchWrap>
                        {keyItems.map((search, idx) => (
                            <AutoSearchData
                                key={search.productName}
                                onClick={() => {
                                    setKeyWord(search.productName);
                                }}
                            >
                                {search.productName}
                                <span>
                                    <BsArrowUpLeft size={20} />
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
const AutoSearchContainer = styled.div`
    z-index: 20;
    width: 600px;
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
