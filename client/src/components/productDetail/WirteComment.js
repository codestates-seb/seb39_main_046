import React, { useState } from 'react';
import styled from 'styled-components';
import Noimg from '../../assets/images/userinfo/Noimg.png';
import Button from '../../components/common/button/Button';



const WirteComment = () => {

  const [regiImg, setregiImg] = useState(Noimg);
  
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise ((resolve) => {
      reader.onload = () => {
        setregiImg(reader.result);
        resolve();
      }
    })
  }


  return (
    <Maindiv>
      <label className='input-file-button' for="input-file">
        <img src={regiImg} alt="이미지 등록" width="150px" height="150px" onChange={(e) => {encodeFileToBase64(e.target.files[0])}}/>
      </label>
      <input type="file" accept='image/*' id="input-file"/>
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
  #input-file{
    display:none;
  }
  .input-file-button{
    border-radius:4px;
    cursor:pointer;
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
