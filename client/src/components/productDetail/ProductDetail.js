import React from 'react';
import styled from 'styled-components';
import HeartButton from '../common/button/HeartButton';
import Button from '../common/button/Button';

import Noimg from '../../assets/images/userinfo/Noimg.png';
import link from '../../assets/images/common/link.png';


const ProductDetail = () => {

  const ProductName = "상품명";
  const ProductPrice = "5300원";

  return (
    <MainContent>
      <ProductImage>
        <div className='hearttitle'>
          <span><HeartButton/></span>
        </div>
        <div className='sharetitle'>
          <span><img src={link}  width="30px" height="30px" alt="링크이미지"/></span>
        </div>              
        <img src={Noimg} alt="이미지 없어요"/>
      </ProductImage>
      <ProductEx>
        <Badge>
          <Button color="Orange_030">CU</Button>
          <Button color="Purple">샌드위치</Button>
        </Badge>
        <div className="productinfo">
          <span>{ProductName}</span>
          <span>{ProductPrice}</span>
        </div>
      </ProductEx>      
    </MainContent>
  );
};

export default ProductDetail;

const MainContent = styled.div`
  width: 590px;
  height: 590px;
`
const ProductImage = styled.section`
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  .hearttitle{
    width:100%;
    text-align:right;
  }
  .sharetitle{
    width:100%;
    text-align:right;
  }
`
const ProductEx = styled.section`
  width:100%;
  .productinfo{
    span:first-child{
      margin-left:30px;
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight:700;
      float:left;
    }
    span:last-child{
      margin-right:18px;
      font-size: ${({ theme }) => theme.fontSizes.base};
      color: ${({ theme }) => theme.colors.Gray_030};
      float:right;
    }

  }
`
const Badge = styled.div`
  margin-left:28px;
  margin-top: 40px;
  margin-bottom: 20px;
  Button{
    margin-right:10px;
  }
`