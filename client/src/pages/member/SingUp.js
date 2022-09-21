import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/common/TextInput";

const SingUp = () => {
  const navigate = useNavigate();

  return (
    <MemberContainer>
      <TopBtnBox>
        <LoginBtn onClick={() => navigate("/login")}>로그인</LoginBtn>
        <SingUpBtn>회원가입</SingUpBtn>
      </TopBtnBox>
      <MiddleBox>
        <MemberRemember>
          <div>
            <input type="checkbox" />
            <span>로그인 정보 기억</span>
          </div>
        </MemberRemember>
        <InputBox>
          <div>
            <p>아이디</p>
            <TextInput />
          </div>
          <div>
            <p>비밀번호</p>
            <TextInput />
          </div>
        </InputBox>
        <IdPwFind>
          <span>아이디찾기</span>
          <span>|</span>
          <span>패스워드찾기</span>
        </IdPwFind>
        <LoginConfirmBtn>로그인</LoginConfirmBtn>
      </MiddleBox>
    </MemberContainer>
  );
};

export default SingUp;
const MemberContainer = styled.section`
  margin: 0 auto;
  width: 900px;
  height: 600px;
  border-radius: 20px;
  margin-top: 160px;
  padding: 50px;
  background-color: ${({ theme }) => theme.colors.Blue_010};
`;

const TopBtnBox = styled.div`
  margin: 0 auto;
  width: 320px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.Gray_020};
  margin-bottom: 50px;
`;

const LoginBtn = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.Gray_020};
`;

const SingUpBtn = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.Orange_030};
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
    margin-bottom: 15px;
    p {
      color: ${({ theme }) => theme.colors.Gray_090};
      font-weight: bold;
      margin-bottom: 15px;
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
