import React from 'react';
import styled from 'styled-components';
import ProductDetail from '../../components/productDetail/ProductDetail';
import WriteComment from '../../components/productDetail/WirteComment';
import CommentList from '../../components/productDetail/CommentList';



const DetailProduct = () => {
  const ReturnMsg = "< 리스트 돌아가기";
  return (
    <Allcontent>
        <Returndiv>
          <Titlediv>
            <span>{ReturnMsg}</span>
          </Titlediv>
          <Middlecontent>
            <ProductDetail/>
            <CommentAreat>
              <WriteComment/>
              <CommentList/>
            </CommentAreat>
          </Middlecontent>
        </Returndiv>
    </Allcontent>
  );
};

export default DetailProduct;

const Allcontent = styled.div`
  display:flex;
  justify-content:center;
`
const Middlecontent = styled.div`
  display:flex;
`
const CommentAreat = styled.section`
  margin-left: 24px;
`


const Returndiv = styled.div`
  width:1280px;
`

const Titlediv = styled.section`
  margin-top: 50px;
  margin-bottom: ${({ theme }) => theme.margins.base};
  span{
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.Orange_040};
    cursor: pointer;
  }
`
