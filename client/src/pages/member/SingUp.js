import React, { useState } from "react";
import styled from "styled-components";
import { useSignup } from "../../lib/api/useSignup";
import { useNavigate } from "react-router-dom";

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

    const onsubmit = () => {
        if (password === confirm) {
            console.log({ nickName, password, username });
            const person = { nickName, password, username };
            addPerson(person);
        } else {
            alert("비밀번호가 맞지 않아요");
        }
    };

    // const PostMutation = useMutation(() => PostSign())

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
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="text"
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        ></Thisinpu>
                    </div>
                    <div>
                        <p>닉네임</p>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="text"
                            onChange={(e) => {
                                setNickName(e.target.value);
                            }}
                        ></Thisinpu>
                    </div>
                    <div>
                        <p>패스워드</p>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></Thisinpu>
                    </div>
                    <div>
                        <p>패스워드확인</p>
                        {/* <TextInput /> */}
                        <Thisinpu
                            type="password"
                            onChange={(e) => {
                                setConfrim(e.target.value);
                            }}
                        ></Thisinpu>
                    </div>
                </InputBox>
                <LoginConfirmBtn onClick={onsubmit}>회원가입</LoginConfirmBtn>
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
        p {
            color: ${({ theme }) => theme.colors.Gray_090};
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
`;

const InputBox = styled.div``;

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
