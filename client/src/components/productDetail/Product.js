import React from "react";
import styled from "styled-components";
import HeartButton from "../common/button/HeartButton";
import Tag from "../common/product/Tag";
import link from "../../assets/icons/SharelinkBtn.png";

const ProductDetail = (data) => {
    const detialData = data.data;

    return (
        <MainContent>
            <span className="heartbtn">
                <HeartButton />
            </span>
            <span className="sharebtn">
                <img src={link} width="30px" height="30px" alt="링크이미지" />
            </span>
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
    }
    .sharebtn {
        position: absolute;
        right: 20px;
        top: 60px;
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
            background-color: red;
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
