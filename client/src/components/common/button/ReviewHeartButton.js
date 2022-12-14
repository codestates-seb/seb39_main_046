import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiHeartAddLine, RiHeartAddFill } from "react-icons/ri";
import { useReviewHeart } from "../../../lib/api/useHeartMutation";
import useStore from "../../../lib/store";

const ReviewHeartButton = ({ heartFlag, id }) => {
    const navigate = useNavigate();
    const { logInfo } = useStore();
    const { mutate: changeHeart, isError } = useReviewHeart();
    if (isError) {
        <p>("하트가 안 눌리는 중..")</p>;
    }
    const onsubmit = () => {
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
                    <RiHeartAddFill className="heart2" onClick={onsubmit} />
                ) : (
                    <RiHeartAddLine className="heart" onClick={onsubmit} />
                )}
            </HeartBox>
        </>
    );
};

export default ReviewHeartButton;

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
