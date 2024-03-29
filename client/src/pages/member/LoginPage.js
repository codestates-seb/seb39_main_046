import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../lib/api/useLogin";
import { useForm } from "react-hook-form";
import useStore from "../../lib/store";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const [disabled, setDisabled] = useState(true);
    const [userName, setUserName] = useState("");
    const { memberId } = useStore();

    const label = disabled ? "로그인" : "로그인";

    const onSuccess = (res) => {
        alert(`환영합니다`);
        sessionStorage.setItem("token", res.data.Authorization);
        let oqmgp = res.data.memberId * 8248788124639977;
        sessionStorage.setItem("oqmgp", oqmgp.toString(16));
        navigate("/");
        window.location.reload();
    };

    const onError = (error) => {
        alert("아이디 비밀번호를 다시한번 확인하세요.");
    };

    const { mutate: loginperson, isError } = useLogin(onSuccess, onError);

    return (
        <>
            <MemberContainer>
                <ContentsBox>
                    <TopBtnBox>
                        <LoginBtn>로그인</LoginBtn>
                        <SingUpBtn onClick={() => navigate("/signup")}>회원가입</SingUpBtn>
                        <AdminBtn onClick={() => navigate("/signup/admin")}>관리자가입</AdminBtn>
                    </TopBtnBox>
                    <MiddleBox
                        onSubmit={handleSubmit((data) => {
                            setUserName(data.userName);
                            loginperson(data);
                        })}
                    >
                        <MemberRemember>
                            <div>
                                <input type="checkbox" />
                                <span>로그인 정보 기억</span>
                            </div>
                        </MemberRemember>
                        <InputBox>
                            <div className="InputPersondata">
                                <label>아이디</label>
                                {/* <TextInput /> */}
                                <Thisinpu
                                    type="text"
                                    placeholder="아이디"
                                    {...register("username", {
                                        required: "필수 입력 사항입니다",
                                        minLength: {
                                            value: 10,
                                            message: "이메일 형식의 맞게 입력해주세요",
                                        },
                                        pattern: {
                                            value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                                            message: "이메일 형식에 맞게 입력해주세요",
                                        },
                                    })}
                                ></Thisinpu>
                                {errors.username && <p>{errors.username.message}</p>}
                            </div>
                            <div>
                                <label className="InputPersondata">비밀번호</label>
                                {/* <input onChange={inputChange} /> */}
                                <Thisinpu
                                    type="password"
                                    placeholder="비밀번호"
                                    {...register("password", {
                                        required: "비밀번호를 입력해주세요",
                                        minLength: {
                                            value: 8,
                                            message: "최소 8자 이상의 비밀번호를 입력해주세요",
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: "16자 이하의 비밀번호만 사용가능합니다",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=])[a-zA-Z0-9!@#$%^&*+=]{8,16}$/,
                                            message: "특수문자, 영문, 숫자를 혼용해서 입력해주세요",
                                        },
                                    })}
                                ></Thisinpu>
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                        </InputBox>
                        <IdPwFind>
                            <span>아이디찾기</span>
                            <span>|</span>
                            <span>패스워드찾기</span>
                        </IdPwFind>
                        <LoginConfirmBtn>{label}</LoginConfirmBtn>
                    </MiddleBox>
                </ContentsBox>
            </MemberContainer>
        </>
    );
};

export default Login;

const MemberContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContentsBox = styled.div`
    width: 900px;
    border-radius: 20px;
    margin-top: 130px;
    margin-bottom: 130px;
    padding: 50px;
    background-color: ${({ theme }) => theme.colors.Blue_010};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media ${({ theme }) => theme.device.laptop} {
        margin-top: -5px;
        margin-bottom: 0px;
        width: 100%;
        border-radius: 0;
        padding: 70px 0 90px;
    }
`;
const TopBtnBox = styled.div`
    margin: 0 auto;
    width: 310px;
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
    transition: 3s ease-in 2.5s;
    /* animation: slide 1s;
    @keyframes slide {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0%);
        }
    } */
`;

const SingUpBtn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.Gray_020};
    color: #fff;
    transition: 3s ease-in 2.5s;
`;

const AdminBtn = styled.button`
    width: 110px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.Gray_020};
    color: #fff;
    transition: 3s ease-in 2.5s;
`;

const MiddleBox = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
        margin-bottom: 35px;
        label {
            color: ${({ theme }) => theme.colors.Gray_090};
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
    .InputPersondata {
        display: flex;
        flex-direction: column;
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
const InputBox = styled.div`
    p {
        color: red;
        font-size: 12px;
    }
`;

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
    margin-bottom: 5px;
    &:focus {
        outline: 1px solid ${({ theme }) => theme.colors.Blue_040};
    }
`;

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
