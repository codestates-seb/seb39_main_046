import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import ReviewHeartButton from "../common/button/HeartButton";

const MyLikeReviewContain = ({ data }) => {
    const image = data.review.imageURL;

    console.log(data.review.reviewId);

    return (
        <Productinformation>
            <img src={image === null ? Noimg : image} alt="이미지 없음" />
            <section className="contents-box">
                <div className="title">
                    <div className="productName">{data.review.product.productName} </div>
                    <span>
                        <ReviewHeartButton
                            id={data.review.reviewId && data.review.reviewId}
                            heartFlag={data.review.reviewHeartFlag && data.review.reviewHeartFlag}
                        />
                    </span>
                </div>
                <Productsulmung>
                    <p>{data.review.content}</p>
                </Productsulmung>
                <CreateAt>{data.review.createdAt.substr(0, 10)}</CreateAt>
            </section>
        </Productinformation>
    );
};

export default MyLikeReviewContain;

const Productinformation = styled.section`
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-right: ${({ theme }) => theme.margins.base};
    box-shadow: 0px 2px 16px rgba(204, 204, 204, 0.6);
    border-radius: 20px;
    padding: 14px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.colors.Blue_010};
    }
    .title {
        display: flex;
        margin-bottom: ${({ theme }) => theme.margins.xl};
        .productName {
            margin-top: 20px;
            width: 350px;
            height: 16px;
            font-size: ${({ theme }) => theme.fontSizes.base};
            color: ${({ theme }) => theme.colors.Gray_090};
            font-weight: 700;
            text-align: left;
        }
    }
`;

const Productsulmung = styled.div`
    width: 355px;
    height: 90px;

    p {
        text-align: left;
        font-size: ${({ theme }) => theme.fontSizes.base};
        font-weight: 400;
        color: ${({ theme }) => theme.colors.Gray_050};
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
const CreateAt = styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.Gray_030};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-align: right;
`;
