import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartAddFill } from "react-icons/ri";
import useReviewHeart from "../../../lib/api/useReviewHeart";
import useStore from "../../../lib/store";

const ReviewHeartButton = ({ heartFlag, id }) => {
    const navigate = useNavigate();
    const { logInfo } = useStore();

    const onSuccess = (data) => {
        alert("좋아요 성공");
    };

    const onError = (error) => {
        alert("좋아요 실패");
    };

    const { mutate: changeHeart, isError } = useReviewHeart(onSuccess, onError);

    if (isError) {
        <p>("하트가 안 눌리는 중..")</p>;
    }

    const onsubmit = () => {
        if (logInfo === null) {
            alert("로그인을 해주세요");
            navigate("/login");
        }
        changeHeart(id, logInfo);
    };
    return (
        <>
            <HeartBox>
                {heartFlag ? (
                    <RiHeartAddFill className="heart2" onClick={() => onsubmit()} />
                ) : (
                    <RiHeartAddLine className="heart" onClick={() => onsubmit()} />
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
