import React from 'react';
import styled from 'styled-components';
import HeartButton from '../common/button/HeartButton';

import Noimg from '../../assets/images/userinfo/Noimg.png';
import link from '../../assets/images/common/link.png';


const ProductDetail = () => {
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
