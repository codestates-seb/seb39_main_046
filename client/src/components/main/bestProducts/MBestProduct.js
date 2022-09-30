import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeartButton from "../../common/button/HeartButton";
import Tag from "../../common/product/Tag";
const BestProduct = ({ idx, data }) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/product/${data.productId}`);
    };

    return (
        <ProductBox className="item">
            <p className="rank_number">{idx + 1}</p>
            <div className="heart_area">
                <HeartButton id={data.productId && data.productId} heartFlag={data.heartFlag && data.heartFlag} />
                <p>{data.hearts}</p>
            </div>
            <div className="product_img" onClick={goDetail}>
                <img src={data.imageURL} alt={data.productName} />
            </div>
            <div className="product_contents" onClick={goDetail}>
                <div className="content_category">
                    <Tag buttonColor={data.company} fontSize="xxs">
                        {data.company}
                    </Tag>
                    <Tag fontSize="xxs">{data.category.categoryName}</Tag>
                </div>
                <div className="content_name_price">
                    <p className="product_title">{data.productName}</p>
                    <p className="product_price">{data.price}원</p>
                </div>
            </div>
        </ProductBox>
    );
};

export default BestProduct;
const ProductBox = styled.div`
    .rank_number {
        position: absolute;
        top: 13px;
        left: 25px;
        color: ${({ theme }) => theme.colors.Blue_050};
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        font-weight: 500;
    }
    .heart_area {
        position: absolute;
        top: 13px;
        right: 15px;
        z-index: 3;
        display: flex;
        p {
            padding: 3px 0 0 3px;
            color: ${({ theme }) => theme.colors.Orange_040};
        }
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
        border-radius: 0 0 20px 20px;
        padding: 12px 20px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        cursor: pointer;
        .content_name_price {
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .product_title {
                font-weight: bold;
            }
            .product_price {
                color: ${({ theme }) => theme.colors.Gray_030};
            }
        }
    }
`;
