import React from 'react';
import styled from 'styled-components';
import ProductDetail from '../../components/productDetail/ProductDetail';

const DetailProduct = () => {
  const ReturnMsg = "< 리스트 돌아가기";
  return (
    <Allcontent>
      <Returndiv>
        <Titlediv>
          <span>{ReturnMsg}</span>
        </Titlediv>
        <ProductDetail/>
      </Returndiv>
    </Allcontent>
  );
};

export default DetailProduct;

const Allcontent = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
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
