import React from "react";
import styled from "styled-components";
import ReviewHeartButton from "../common/button/ReviewHeartButton";
import ReviewImg from "../../assets/images/products/ReviewImg.png";
import Usering from "../../assets/images/userinfo/Userimg.jpg";
import { FiTrash2, FiSave } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
const Comment = ({ data }) => {
    console.log(data);
    return (
        <Maindiv>
            <div className="img_box">
                <img src={ReviewImg} alt="리뷰 이미지" className="review_img" />
            </div>
            <ReviewDetail>
                <div className="userInfo">
                    <div className="uesrNick">
                        <img src={Usering} alt="유저 프로필" width="25px" height="25px" />
                        <span>{data.member.nickName}</span>
                    </div>
                    <div className="userHeart">
                        <ReviewHeartButton
                            id={data.reviewId && data.reviewId}
                            heartFlag={data.reviewHeartFlag && data.reviewHeartFlag}
                        />
                        <p>{data.hearts}</p>
                    </div>
                </div>
                <Commentex>
                    <p>
                        리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리리뷰리뷰리뷰리뷰리뷰리...
                    </p>
                </Commentex>
                <Controlbar>
                    <span className="icon">
                        <RiEdit2Fill size={20} color="rgba(174, 174, 178, 1)" />
                    </span>
                    <span className="icon">
                        <FiTrash2 size={20} color="rgba(253, 169, 79, 1)" />
                    </span>
                    <span className="date">{data.createdAt.substr(0, 10)}</span>
                </Controlbar>
            </ReviewDetail>
        </Maindiv>
    );
};

export default Comment;

const Maindiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.radius.small};
    background-color: #fff;
    margin: 0 15px 15px 0;
    padding: 14px 14px;
    box-sizing: border-box;
    .img_box {
        width: 135px;
        height: 135px;
        border-radius: ${({ theme }) => theme.radius.small};
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .review_img {
            min-width: 140px;
            max-width: 180px;
        }
    }
`;
const ReviewDetail = styled.section`
    max-width: 75%;
    .userInfo {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            border-radius: 30px;
            background-color: ${({ theme }) => theme.colors.Gray_030};
        }
        .uesrNick {
            span {
                margin-left: ${({ theme }) => theme.margins.base};
            }
        }
        .userHeart {
            display: flex;
            p {
                padding: 3px 0 0 5px;
                color: ${({ theme }) => theme.colors.Orange_040};
            }
        }
    }

    span:last-child {
        float: right;
    }
`;
const Commentex = styled.div`
    height: 70px;
    margin: 5px 0;
    p {
        word-wrap: break-word;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const Controlbar = styled.section`
    height: 18px;
    .icon {
        margin-right: ${({ theme }) => theme.margins.base};
    }
    .date {
        color: ${({ theme }) => theme.colors.Gray_030};
    }
`;