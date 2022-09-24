import React from 'react';
import styled from 'styled-components';
import HeartButton from '../common/button/HeartButton';
import Noimg from '../../assets/images/userinfo/Noimg.png';
import Usering from '../../assets/images/userinfo/Userimg.jpg';

import pencil from '../../assets/images/controlimag/Pencil.png';
import TrashBox from '../../assets/images/controlimag/trashbox.png';



const Comment = () => {
  const userName = "리코";
  const createAt = "1986.06.28";
  const comment = "WeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoitWeCanDoit";
  return (
    <Maindiv>
      <img src={Noimg} alt="이미지 없다" width="150px" height="150px"/>
      <ReviewDetail>
        <div className='userInfo'>
          <img src={Usering} alt="유저 프로필" width="25px" height="25px"/>
          <span>{userName}</span>
          <span><HeartButton/></span>
        </div>
        <Commentex>
          <p>{comment}</p>
        </Commentex>
        <Controlbar>
          <img src={pencil} alt="수정버튼" />
          <img src={TrashBox} alt="삭제버튼"/>
          <span>{createAt}</span>
        </Controlbar>
      </ReviewDetail>
    </Maindiv>
  );
};

export default Comment;

const Maindiv = styled.div`
  display:flex;
  margin-left: ${({ theme }) => theme.margins.base};
  margin-right: 20px;
`
const ReviewDetail = styled.section`
  width:100%;
  .userInfo{
    margin-bottom:10px;
    width:100%;
  }
  img{
    margin-top:10px;
  }
  span{
    margin-left:${({ theme }) => theme.margins.base};
  }
  span:last-child {
    margin-top:3px;
    float:right;
  }

`
const Commentex = styled.div`
    width:420px;
    height:48px;
    p{
      word-wrap: break-word;
      white-space:normal;
      display:-webkit-box;
      -webkit-line-clamp:3;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
`

const Controlbar = styled.section`
  margin-top:20px;
  
  img{
    margin-right:10px;
  }
  span{
    line-height:2;
    color: ${({ theme }) => theme.colors.Gray_030};
  }
`