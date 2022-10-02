import React, { useState } from "react";
import styled from "styled-components";
import { useSignup } from "../../lib/api/useSignup";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'

// import TextInput from "../../components/common/input/TextInput";
// import { useState } from "react";

// async function PostSign(){
//   const response = await fetch(
//     '/member/signup',{method:"POST", data: {nickName: "lastcarol", password:"qwe123123123", username:"lastcarol@gmail.com"}}
//   );
//   return response.json();
// }

// const addSingUp = (nickName, password, userNmae) => {
//   return axios.post('/member/signup', {
//     nickNmae: nickName,
//     password: password,
//     userNmae: userNmae
//   })
// }

// const PostSign = async user => {
//   const response = await axios.post('/member/signup',{
//     headers:{
//       "Content-Type" : "application/json",
//     },
//     data: {
//       nickName: user.Nick_Name,
//       password: "user.passWord",
//       username: user.userName,
//     }
//   })
//   return response.json()
// }

const SingUp = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [confirm, setConfrim] = useState("");
    const {register, handleSubmit,getValues, formState: {errors}}  = useForm();
    console.log(errors);

    // const {mutate, isLoading} = useMutation(addPerson,{
    //   onSuccess: () => {
    //     alert("회원가입 성공");
    //   }
    // })

    // if(isLoading) {
    //   return <p>로딩중..</p>
    // }

    const onSuccess = (data) => {
        alert("회원가입 성공");
        navigate("/login");
    };

    const onError = (error) => {
        alert("회원가입 실패");
    };

    const { mutate: addPerson, isError } = useSignup(onSuccess, onError);

    if (isError) {
        <p>("뭔가 잘못됨..")</p>;
    }

    // const onsubmit = () => {
    //     if (password === confirm) {
    //         console.log({ nickName, password, username });
    //         const person = { nickName, password, username };
    //         addPerson(person);
    //     } else {
    //         alert("비밀번호가 맞지 않아요");
    //     }
    // };

    // const PostMutation = useMutation(() => PostSign())


    return (
        <MemberContainer>
            <TopBtnBox>
                <LoginBtn onClick={() => navigate("/login")}>로그인</LoginBtn>
                <SingUpBtn>회원가입</SingUpBtn>
            </TopBtnBox>
            <MiddleBox>
                <InputBox onSubmit = {handleSubmit((data) => {
                    const person = {"nickName": data.nickName, "password": data.password, "username": data.username};
                    addPerson(person);
                })}>
                    <div className="InputData">
                        <label>아이디</label>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="text"
                            {...register("username",{required: "필수입력 사항입니다.",
                            minLength:{
                                value: 10,
                                message: '이메일 형식에 맞게 입력해주세요.'
                            },
                            pattern:{
                                value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                                message: '이메일 형식에 맞게 입력해주세요'
                            }
                        })}
                            // onChange={(e) => {
                            //     setUserName(e.target.value);
                            // }}
                        ></Thisinpu>
                        {errors.username &&<p>{errors.username.message}</p>}
                    </div>
                    <div className="InputData">
                        <label>닉네임</label>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="text"
                            {...register("nickName",{required: '필수입력 사항입니다.', minLength: {
                                value: 2,
                                message: "2자 이상이어야합니다."
                            },
                            maxLength: {
                                value: 10,
                                message: "10자 이하이어야합니다."
                            }
                        })}
                            // onChange={(e) => {
                            //     setNickName(e.target.value);
                            // }}
                        ></Thisinpu>
                        {errors.nickName && <p>{errors.nickName.message}</p>}
                    </div>
                    <div className="InputData">
                        <label>패스워드</label>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="password"
                            {...register("password", {required: "비밀번호를 입력해주세요",minLength:{
                                vlaue: 8,
                                message: "최소 8자 이상의 비밀번호를 입력해주세요",
                            },
                            maxLength: {
                                value: 16,
                                message: "16자 이하의 비밀번호만 사용가능합니다.",
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                                message: "특수문자, 영문, 숫자를 혼용해서 입력해주세요",
                            }
                        })}
                            // onChange={(e) => {
                            //     setPassword(e.target.value);
                            // }}
                            
                        ></Thisinpu>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="InputData">
                        <label>패스워드확인</label>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="password"
                            {...register("passwordCheck",{
                                required:{
                                    value: true,
                                    message: "비밀번호를 확인 해주세요.",
                                },
                                validate:{
                                    matchesPreviousPassword: (value) =>{
                                        const{password} = getValues();
                                        return password === value || "비밀번호가 일치하지 않습니다.";
                                    },
                                },
                            })}
                        ></Thisinpu>
                        {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
                    </div>
                <LoginConfirmBtn onClick={onsubmit}>회원가입</LoginConfirmBtn>
                </InputBox>
            </MiddleBox>
        </MemberContainer>
    );
};

export default SingUp;

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
        label {
            color: ${({ theme }) => theme.colors.Gray_090};
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
`;

const InputBox = styled.form`
    .InputData{
        display: flex;
        flex-direction:column;
    }
    p{
        color:red;
        font-size:12px;
    }
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
