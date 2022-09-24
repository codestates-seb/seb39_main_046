import React from 'react';
import styled from 'styled-components';
import Noimg from '../../assets/images/userinfo/Noimg.png';
import Button from '../../components/common/button/Button';
import HeartButton from '../common/button/HeartButton';



const WirteComment = () => {
  return (
    <Maindiv>
      <img src={Noimg} alt="이미지 등록" width="150px" height="150px"/>
      <WriteArea>
        <input className='textA' type="text" placeholder="최대 50자 입력가능"></input>
        <Button>후기작성</Button>
      </WriteArea>
    </Maindiv>
  );
};

export default WirteComment;

const Maindiv = styled.div`
  display:flex;
  width: 575px;
  margin-left:20px;
  margin-right: 26px;
  margin-bottom:50px;
  img{
    border-radius: 10px;
  }
`
const WriteArea = styled.section`
  margin-left:20px;
  .textA{
    width:400px;
    height:54px;
    margin: 13px 12px 13px 12px;
  }
  Button{
    float:right;
  }
`
