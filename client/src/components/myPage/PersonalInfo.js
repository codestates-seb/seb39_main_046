import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Userimg from "../../assets/images/userinfo/Userimg.jpg";
import Button from "../common/button/Button";
import TextInput from "../common/input/TextInput";
import axios from "axios";
import useStore from "../../lib/store";
import { useChange } from "../../lib/api/useChange";

const PersonalInfo = ({ Persondata }) => {
    const { logInfo } = useStore();
    const userName = Persondata.member.nickName;
    const welcommsg = " 님, 안녕하세요 :)";
    const email = Persondata.member.username;
    const userImg = Userimg;

    const [changeName, setchangeName] = useState("");
    const [changePw, setChangePw] = useState("");
    const [confrim, setconfrim] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgBase64, setImgBase64] = useState([]);
    const [comment, setComment] = useState();

    const InputNickName = (e) => {
        setchangeName(e.target.value);
    };
    const InputPw = (e) => {
        setChangePw(e.target.value);
    };
    const InputConfrim = (e) => {
        setconfrim(e.target.value);
    };
    const onSuccess = (res) => {
        alert("변경완료");
    };
    const onError = (error) => {
        alert("형식의 맞지 않습니다!");
        console.log(error);
    };

    const { mutate: changeInfo, isError } = useChange(onSuccess, onError);

    const onSubmit = () => {
        const id = "nickname";
        const token = logInfo;
        const log = { nickName: changeName };
        console.log(log);
        changeInfo({ id, token, log });
    };

    const pwSubmit = () => {
        if (changePw === confrim) {
            const token = logInfo;
            const log = { password: changePw };
            const id = "password";
            console.log(token);
            changeInfo(id, token, log);
        } else {
            alert("비밀번호 확인해주세요~");
        }
    };

    // 회원처리 알고리즘

    const handleChangeFile = (event) => {
        console.log(event.target.files);
        setImgFile(event.target.files);
        setImgBase64([]);
        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    console.log(base64);
                    if (base64) {
                        var base64Sub = base64.toString();
                        setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
                    }
                };
            }
        }
    };

    const WriteBoard = async () => {
        const fd = new FormData();
        Object.values(imgFile).forEach((file) => fd.append("file", file));

        fd.append("comment", comment);
        await axios
            .post(
                "/review/4",
                fd,
                {
                    headers: {
                        "Content-Type": `multipart/form-data`,
                        Authorization: logInfo,
                    },
                },
            )
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                }
            });
    };

    //이미지 전처리 알고리즘

    return (
        <TopDiv>
            <UserInfo>
                <Titlediv>
                    <UserName>{userName}</UserName>
                    <Welcome>{welcommsg}</Welcome>
                </Titlediv>
                <UserPassing>
                    <UserExer>
                        {/* <img src={userImg} alt="프로필 사진" /> */}
                        <br />
                        <label className="input-file-button" for="input-file">
                            <img src={Persondata.member.profile} alt="프로필 사진" />
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="input-file"
                            onChange={handleChangeFile}
                            multiple="multiple"
                        />
                        <Button onClick={WriteBoard}>수정</Button>
                        <br />
                        <span>ID:{email}</span>
                    </UserExer>
                    <UserForm>
                        <p>닉네임</p>
                        {/* <TextInput /> */}
                        <Thisinpu placeholder="입력해주세요." onChange={InputNickName}></Thisinpu>
                        <Button onClick={onSubmit}>완료</Button>
                        <p>패스워드</p>
                        {/* <TextInput /> */}
                        <Thisinpu placeholder="입력해주세요." onChange={InputPw}></Thisinpu>
                        <Button onClick={pwSubmit}>수정</Button>
                        <p>패스워드 확인</p>
                        <Thisinpu placeholder="입력해주세요." onChange={InputConfrim}></Thisinpu>
                    </UserForm>
                </UserPassing>
            </UserInfo>
        </TopDiv>
    );
};

export default PersonalInfo;

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

const TopDiv = styled.div`
    background-color: ${({ theme }) => theme.colors.Blue_010};
    padding: 30px 0;
    margin-bottom: 50px;
`;
const UserInfo = styled.div`
    text-align: center;
    width: 100%;
`;
const Titlediv = styled.div`
    text-align: center;
`;
const UserName = styled.span`
    color: ${({ theme }) => theme.colors.Blue_040};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
`;

const UserPassing = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserExer = styled.div`
    width: 193px;
    height: 193px;
    input {
        display: none;
    }

    /* .input-file-button{
    cursor: pointer;
    display: inline-flex;
    outline: none;
    border: 3px solid transparent;
    border-radius: 50px;
    cursor: pointer;
    padding: 7px 1rem;
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.Blue_030};
    color:white;
  } */
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

const Welcome = styled.span`
    color: ${({ theme }) => theme.colors.Gray_050};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    line-height: 160%;
`;

const UserForm = styled.div`
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
