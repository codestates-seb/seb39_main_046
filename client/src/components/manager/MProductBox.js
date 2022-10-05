import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Tag from "../common/product/Tag";
import Button from "../common/button/Button";
import { DeleteProduct } from "../../lib/api/useProductMutate";

const MProductBox = ({ data, setIsOpen }) => {
    const navigate = useNavigate();
    const goEdit = () => {
        data && navigate(`/admin/${data.productId}`);
        setIsOpen(true);
    };

    const { mutate: ProductDelete } = DeleteProduct();
    const deleteFunc = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            ProductDelete(data.productId);
            navigate(`/admin`);
        } else {
            navigate(`/admin`);
        }
    };

    return (
        <ProductSection>
            <PImage>
                <img src={data.imageURL} alt={data.productName} />
            </PImage>
            <ProductsEx>
                <div className="tag-box">
                    <Tag buttonColor={data.company}>{data.company}</Tag>
                    <Tag>{data.category && data.category.categoryName}</Tag>
                </div>
                <ProductName>{data.productName}</ProductName>
                <div className="line"></div>
                <ProductPrice>{data.price}원</ProductPrice>
            </ProductsEx>
            <div className="hover_box">
                <span>
                    <Button onClick={goEdit} color="White" fontColor="Blue_030" lineColor="Blue_030">
                        수정
                    </Button>
                </span>
                <Button onClick={deleteFunc}>삭제</Button>
            </div>
        </ProductSection>
    );
};

export default MProductBox;
const ProductSection = styled.section`
    width: 100%;
    height: 355px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 3px 10px rgba(204, 204, 204, 0.4);
    position: relative;
    cursor: pointer;
    .heart-box {
        position: absolute;
        right: 10px;
        top: 7px;
        z-index: 10;
    }
    &:hover {
        .hover_box {
            opacity: 1;
        }
    }
    .hover_box {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
        span {
            margin-right: 8px;
        }
    }
`;

const PImage = styled.div`
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        border-radius: 20px;
        max-width: 180px;
        max-height: 150px;
    }
`;

const ProductsEx = styled.div`
    padding: 10px 15px;
    border-radius: 0 0 20px 20px;
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.base};
    .line {
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        margin: 5px 0;
    }
    .tag-box {
    }
`;

const ProductName = styled.p`
    margin-top: 10px;
    font-weight: 700;
    width: 100%;
    height: 30px;
    color: ${({ theme }) => theme.colors.Gray_090};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const ProductPrice = styled.p`
    color: ${({ theme }) => theme.colors.Gray_030};
`;
