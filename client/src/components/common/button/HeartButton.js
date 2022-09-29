import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartAddFill } from "react-icons/ri";
import useHeart from "../../../lib/api/useHeart";
import useStore from "../../../lib/store";

const HeartButton = ({ heartFlag, id }) => {
    const navigate = useNavigate();
    const { logInfo } = useStore();
    const { mutate: changeHeart, isError } = useHeart();
    if (isError) {
        <p>("하트가 안 눌리는 중..")</p>;
    }
    const onsubmit = (id) => {
        if (logInfo === null) {
            alert("로그인을 해주세요");
            navigate("/login");
        }
        changeHeart(id);
    };
    return (
        <>
            <HeartBox>
                {heartFlag ? (
                    <RiHeartAddFill className="heart2" onClick={() => onsubmit(id)} />
                ) : (
                    <RiHeartAddLine className="heart" onClick={() => onsubmit(id)} />
                )}
            </HeartBox>
        </>
    );
};

export default HeartButton;

const HeartBox = styled.span`
    width: 30px;

    .heart {
        cursor: pointer;
        font-size: 30px;
        color: ${({ theme }) => theme.colors.Orange_040};
    }
    .heart2 {
        cursor: pointer;
        font-size: 30px;
        color: ${({ theme }) => theme.colors.Orange_040};
    }
`;
