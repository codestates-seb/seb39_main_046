import React from "react";
import styled from "styled-components";
import HeartButton from "../common/button/HeartButton";
import Tag from "../common/product/Tag";
import { IoMdEye } from "react-icons/io";

const ProductDetail = (data) => {
    const detialData = data.data;

    return (
        <MainContent>
            <p className="heartbtn">
                <HeartButton
                    id={detialData.productId && detialData.productId}
                    heartFlag={detialData.heartFlag && detialData.heartFlag}
                />
                <p>{detialData.hearts}</p>
            </p>
            <p className="viewbtn">
                <IoMdEye size={30} />
                <p>{data.data.views}</p>
            </p>
            <p className="sharebtn">{/* <img src={link} width="30px" height="30px" alt="링크이미지" /> */}</p>
            <ProductImage>
                <div className="img_box">
                    <img src={detialData.imageURL} alt={detialData.productName} />
                </div>
            </ProductImage>
            <ProductEx>
                <Badge>
                    <Tag buttonColor={detialData.company} fontSize="xs">
                        {detialData.company}
                    </Tag>
                    <Tag fontSize="xs">{detialData.category.categoryName}</Tag>
                </Badge>
                <div className="productinfo">
                    <p>{detialData.productName}</p>
                    <p>{detialData.price}원</p>
                </div>
            </ProductEx>
        </MainContent>
    );
};

export default ProductDetail;

const MainContent = styled.div`
    width: 590px;
    height: 600px;
    border-radius: ${({ theme }) => theme.radius.base};
    box-shadow: 0px 4px 20px rgba(204, 204, 204, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .heartbtn {
        position: absolute;
        right: 20px;
        top: 20px;
        display: flex;
        p {
            padding: 3px 0 0 3px;
            color: ${({ theme }) => theme.colors.Orange_040};
        }
    }
    .sharebtn {
        position: absolute;
        left: 20px;
        top: 20px;
    }
    .viewbtn {
        position: absolute;
        left: 20px;
        top: 20px;
        color: ${({ theme }) => theme.colors.Gray_030};
        display: flex;
        p {
            padding: 3px 0 0 3px;
        }
    }
`;
const ProductImage = styled.section`
    height: 490px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img_box {
        img {
            max-width: 380px;
            min-width: 280px;
            max-height: 380px;
        }
    }
`;
const ProductEx = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.Gray_010};
    padding: 20px 30px;
    border-radius: 0 0 20px 20px;
    .productinfo {
        p:first-child {
            font-size: ${({ theme }) => theme.fontSizes.lg};
            font-weight: 700;
            float: left;
        }
        p:last-child {
            font-size: ${({ theme }) => theme.fontSizes.lg};
            color: ${({ theme }) => theme.colors.Gray_030};
            float: right;
        }
    }
`;
const Badge = styled.div`
    margin-bottom: 10px;
    Button {
        margin-right: 10px;
    }
`;
