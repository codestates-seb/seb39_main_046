import React from "react";
import styled from "styled-components";
import Userimg from "../../assets/images/userinfo/Userimg.jpg";
import Button from "../common/button/Button";
import TextInput from "../common/input/TextInput";

const PersonalInfo = () => {
    const userName = "리코";
    const welcommsg = " 님, 안녕하세요 :)";
    const email = "reco@recostore.com";
    const userImg = Userimg;

    return ( <
        TopDiv >
        <
        UserInfo >
        <
        Titlediv >
        <
        UserName > { userName } < /UserName> <
        Welcome > { welcommsg } < /Welcome> <
        /Titlediv> <
        UserPassing >
        <
        UserExer >
        <
        img src = { userImg }
        alt = "프로필 사진" / >
        <
        Button > 수정 < /Button> <
        span > ID: { email } < /span> <
        /UserExer> <
        UserForm >
        <
        p > 닉네임 < /p> <
        TextInput / >
        <
        Button > 완료 < /Button> <
        p > 패스워드 < /p> <
        TextInput / >
        <
        Button > 수정 < /Button> <
        p > 패스워드 확인 < /p> <
        TextInput / >
        <
        /UserForm> <
        /UserPassing> <
        /UserInfo> <
        /TopDiv>
    );
};

export default PersonalInfo;

const TopDiv = styled.div `
  background-color: ${({ theme }) => theme.colors.Blue_010};
  padding: 30px 0;
  margin-bottom: 50px;
`;
const UserInfo = styled.div `
  text-align: center;
  width: 100%;
`;
const Titlediv = styled.div `
  text-align: center;
`;
const UserName = styled.span `
  color: ${({ theme }) => theme.colors.Blue_040};
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
`;

const UserPassing = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserExer = styled.div `
  width: 193px;
  height: 193px;
  img {
    width: 150px;
    height: 150px;
  }
  Button {
    margin-top: -10px;
  }
  span {
    padding-top: ${({ theme }) => theme.paddings.base};
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.Blue_040};
    font-weight: 700;
  }
`;

const Welcome = styled.span `
  color: ${({ theme }) => theme.colors.Gray_050};
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
  line-height: 160%;
`;

const UserForm = styled.form `
  text-align: left;
  height: 264px;
  margin-top: ${({ theme }) => theme.paddings.xxxl};
  p {
    padding-left: ${({ theme }) => theme.paddings.xl};
    position: relative;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
  }
  input {
    margin-bottom: ${({ theme }) => theme.paddings.xxxl};
    margin-right: 15px;
  }
`;