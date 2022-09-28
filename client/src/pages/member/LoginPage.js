import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../lib/api/useLogin";
import TextInput from "../../components/common/input/TextInput";

const Login = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setpassword] = useState("");

    const inputChange = (e) => {
        const length = e.target.value.length;
        if (length >= 4) {
            setDisabled(false);
        } else if (!disabled) {
            setDisabled(true);
        }
        setUserName(e.target.value);
    };

    const inputpwChange = (e) => {
        setpassword(e.target.value);
    };

    const label = disabled ? "로그인" : "로그인";

    const onSuccess = (res) => {
        alert(`${userName}님 환영합니다.`);
        sessionStorage.setItem("token", res.data);
        navigate("/");
        window.location.reload();
    };

    const onError = (error) => {
        alert("아이디 비밀번호를 다시한번 확인하세요");
    };

    const { mutate: loginperson, isError } = useLogin(onSuccess, onError);

    const onsubmit = () => {
        const log = { userName, password };
        const key = "login";
        loginperson(log, key);
    };

    return (
        <>
            <MemberContainer>
                <TopBtnBox>
                    <LoginBtn>로그인</LoginBtn>
                    <SingUpBtn onClick={() => navigate("/singup")}>회원가입</SingUpBtn>
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
                            {/* <TextInput /> */}
                            <Thisinpu placeholder="아이디" onChange={inputChange} />
                        </div>
                        <div>
                            <p>비밀번호</p>
                            {/* <input onChange={inputChange} /> */}
                            <Thisinpu placeholder="비밀번호" onChange={inputpwChange} />
                        </div>
                    </InputBox>
                    <IdPwFind>
                        <span>아이디찾기</span>
                        <span>|</span>
                        <span>패스워드찾기</span>
                    </IdPwFind>
                    <LoginConfirmBtn onClick={onsubmit}>{label}</LoginConfirmBtn>
                </MiddleBox>
            </MemberContainer>
        </>
    );
};

export default Login;

const Thisinpu = styled.input`
    width: 320px;
    height: 40px;
    border: 0px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.White};
    border-radius: 20px;
    padding-left: 15px;
    &:focus {
        outline: 1px solid ${({ theme }) => theme.colors.Blue_040};
    }
`;

const MemberContainer = styled.section`
    margin: 0 auto;
    width: 900px;
    height: 600px;
    border-radius: 20px;
    margin-top: 160px;
    margin-bottom: 120px;
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
    background-color: ${({ theme }) => theme.colors.Blue_030};
    color: #fff;
    animation: slide 1s;
    @keyframes slide {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0%);
        }
    }
`;

const SingUpBtn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.Gray_020};
    color: #fff;
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
