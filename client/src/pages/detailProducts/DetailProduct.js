import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/productDetail/ProductDetail";
import WriteComment from "../../components/productDetail/WirteComment";
import CommentList from "../../components/productDetail/CommentList";
import useStore from "../../lib/store";
import { useProduct } from "../../lib/api/useProduct";

const DetailProduct = () => {
  const { id } = useParams();
  const { product, reviews } = useProduct();
  console.log(product);
  // useStore.setState({ isDetail: id });
  // console.log(id);
  const ReturnMsg = "< 리스트 돌아가기";
  return (
    <Allcontent>
      <Returndiv>
        <Titlediv>
          <span>{ReturnMsg}</span>
        </Titlediv>
        <Middlecontent>
          <ProductDetail data={product} />
          <CommentAreat>
            <WriteComment />
            <CommentList />
          </CommentAreat>
        </Middlecontent>
      </Returndiv>
    </Allcontent>
  );
};

export default DetailProduct;

const Allcontent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;
const Middlecontent = styled.div`
  display: flex;
`;
const CommentAreat = styled.section`
  margin-left: 24px;
  border-radius: ${({ theme }) => theme.radius.base};
  background-color: ${({ theme }) => theme.colors.Blue_010};
  padding: 20px 0;
  height: 590px;
`;

const Returndiv = styled.div`
  width: 1280px;
`;

const Titlediv = styled.section`
  margin-top: 50px;
  margin-bottom: ${({ theme }) => theme.margins.base};
  span {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.Orange_040};
    cursor: pointer;
  }
`;
