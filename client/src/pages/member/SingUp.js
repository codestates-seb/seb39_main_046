import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/common/input/TextInput";
import { IoIosArrowForward } from "react-icons/io";

const SingUp = () => {
  const navigate = useNavigate();

  return (
    <MemberContainer>
      <TopBtnBox>
        <LoginBtn onClick={() => navigate("/login")}>로그인</LoginBtn>
        <SingUpBtn>회원가입</SingUpBtn>
      </TopBtnBox>
      <MiddleBox>
        <InputBox>
          <div>
            <p>아이디</p>
            <TextInput />
          </div>
          <div>
            <p>닉네임</p>
            <TextInput />
          </div>
          <div>
            <p>패스워드</p>
            <TextInput />
          </div>
          <div>
            <p>패스워드확인</p>
            <TextInput />
          </div>
        </InputBox>
        <LoginConfirmBtn>회원가입</LoginConfirmBtn>
      </MiddleBox>
    </MemberContainer>
  );
};

export default SingUp;
const MemberContainer = styled.section`
  margin: 0 auto;
  width: 900px;
  height: 700px;
  border-radius: 20px;
  margin-top: 160px;
  margin-bottom: 130px;
  padding: 50px;
  background-color: ${({ theme }) => theme.colors.Blue_010};
`;

const TopBtnBox = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.Gray_020};
  margin-bottom: 50px;
`;

const LoginBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.Gray_020};
`;

const SingUpBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.Blue_030};
  animation: slide2 1s;
  @keyframes slide2 {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`;

const MiddleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    margin-bottom: 35px;
    p {
      color: ${({ theme }) => theme.colors.Gray_090};
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
`;

const MemberRemember = styled.div`
  width: 320px;
  height: 25px;
  div {
    display: flex;
    justify-content: flex-end;
  }
`;
const InputBox = styled.div``;

const IdPwFind = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
  color: ${({ theme }) => theme.colors.Gray_040};
`;

const LoginConfirmBtn = styled.button`
  width: 320px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.Blue_030};
  color: #fff;
  &:hover {
    background: ${({ theme }) => theme.colors.Blue_040};
  }
  &:active {
    background: ${({ theme }) => theme.colors.Blue_050};
  }
`;
