import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartAddFill } from "react-icons/ri";
import useReviewHeart from "../../../lib/api/useReviewHeart";
import useStore from "../../../lib/store";
import axios from "axios";
const ReviewHeartButton = ({ heartFlag, id }) => {
    const [heart, setHeart] = useState(heartFlag);
    const { logInfo } = useStore();
    const onsubmit = async () => {
        await axios
            .post(
                `/review/heart?reviewId=${id}`,
                {},
                {
                    headers: {
                        Authorization: logInfo,
                    },
                },
            )
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                }
                console.log(res);
            })
            .catch((err) => {});
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
