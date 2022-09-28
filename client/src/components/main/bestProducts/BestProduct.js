import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeartButton from "../../common/button/HeartButton";

const BestProduct = ({ idx, data }) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/product/${data.productId}`);
    };
    return (
        <ProductBox className="item">
            <span className="rank_number">{idx + 1}</span>
            <span className="heart_btn">
                <HeartButton />
            </span>
            <div className="product_img" onClick={goDetail}>
                <img src={data.imageURL} alt={data.productName} />
            </div>
            <div className="product_contents" onClick={goDetail}>
                <p className="product_title">{data.productName}</p>
                <p className="product_price">{data.price}원</p>
            </div>
        </ProductBox>
    );
};

export default BestProduct;
const ProductBox = styled.div`
    span {
        position: absolute;
        top: 13px;
    }
    .rank_number {
        left: 25px;
        color: ${({ theme }) => theme.colors.Blue_050};
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        font-weight: 500;
    }
    .heart_btn {
        top: 7px;
        right: 45px;
        z-index: 3;
    }
    .product_img {
        width: 100%;
        height: 100%;
        border-radius: 20px 20px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .product_contents {
        width: 100%;
        height: 60px;
        border-radius: 0 0 20px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        cursor: pointer;
        .product_title {
            font-weight: bold;
        }
        .product_price {
            color: ${({ theme }) => theme.colors.Gray_030};
        }
    }
`;
