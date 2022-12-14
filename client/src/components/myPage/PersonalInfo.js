import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../common/button/Button";
import useStore from "../../lib/store";
import { useChange } from "../../lib/api/useChange";
import { useAddProfile, useDelteProfile } from "../../lib/api/useMyprofileMutate";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

const PersonalInfo = ({ Persondata }) => {
    const navigate = useNavigate();

    const { logInfo } = useStore();
    const MyImg = Persondata.member.profile;
    const userName = Persondata.member.nickName;
    const welcommsg = " 님, 안녕하세요 :)";
    const email = Persondata.member.username;
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const [changeName, setchangeName] = useState("");
    const [changePw, setChangePw] = useState("");
    const [confrim, setconfrim] = useState("");
    const [imgFile, setImgFile] = useState(MyImg);
    const [Prw, setPrw] = useState(Persondata.member.profile);
    const [PrwOn, setPrwOn] = useState(false);
    const [isEditOpen, setIseEditOpen] = useState(true);

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
        alert("10글자 이하로 작성해주세요");
    };

    const { mutate: changeInfo } = useChange(onSuccess, onError);

    const pwSubmit = () => {
        if (changePw === confrim) {
            const token = logInfo;
            const log = { password: changePw };
            const id = "password";
            const EditData = { id, token, log };
            changeInfo(EditData);
        } else {
            alert("비밀번호 확인해주세요~");
        }
    };

    const nickSumbit = () => {
        const token = logInfo;
        const log = { nickName: changeName };
        const id = "nickname";
        const EditData = { id, token, log };
        changeInfo(EditData);
    };

    // 회원처리 알고리즘

    const { mutate: ProfileAdd } = useAddProfile();
    const { mutate: ProfileDelete } = useDelteProfile();

    const handleChangeFile = (event) => {
        setPrw(URL.createObjectURL(event.target.files[0]));
        setImgFile(event.target.files);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    };

    const WriteBoard = async () => {
        setIseEditOpen(!isEditOpen);
        const fd = new FormData();
        Object.values(imgFile).forEach((file) => fd.append("file", file));
        ProfileAdd(fd);
    };

    //이미지 전처리 알고리즘

    const DeleteProfile = () => {
        ProfileDelete();
    };

    // 이미지 삭제 알고리즘

    // 관리자 확인 후 관리자 페이지 이동
    const [isAdmin, setIsAdmin] = useState(Persondata.member.roles);

    const goManagerPage = () => {
        navigate(`/admin`);
    };
    return (
        <TopDiv>
            <UserInfo>
                {isAdmin === "ROLE_ADMIN" ? (
                    <p className="manager_btn" onClick={goManagerPage}>
                        <strong>관리자 페이지</strong>로 이동하기 ›
                    </p>
                ) : (
                    ""
                )}
                <Titlediv>
                    <UserName>{userName}</UserName>
                    <Welcome>{welcommsg}</Welcome>
                </Titlediv>
                <UserPassing>
                    <UserExer>
                        {MyImg && <img src={Prw} className="user_profile" alt={userName} />}
                        {isEditOpen ? (
                            ""
                        ) : (
                            <div className="filebox">
                                <label for="input-file">
                                    <FiUpload size={20} />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="input-file"
                                    onChange={handleChangeFile}
                                    multiple="multiple"
                                />
                            </div>
                        )}
                        <div className="bottom_btn">
                            <div className="user_btn">
                                <Button onClick={WriteBoard}>수정</Button>
                                <Button onClick={DeleteProfile} color="Gray_040">
                                    삭제
                                </Button>
                            </div>
                        </div>
                        <p className="user_id">ID:{email}</p>
                    </UserExer>
                    <div className="InfoPerson">
                        <UserForm onSumbit={handleSubmit((data) => {})}>
                            <p>닉네임</p>
                            <Thisinpu
                                type="text"
                                placeholder={Persondata.member.nickName}
                                onChange={InputNickName}
                                defaultValue={Persondata.member.nickName}
                            ></Thisinpu>
                            {errors.nickName && <p className="errorCode">{errors.nickName.message}</p>}
                            <SubmitButton onClick={nickSumbit}>수정</SubmitButton>
                        </UserForm>
                        <UserForm1>
                            <p>패스워드</p>
                            <Thisinpu
                                type="password"
                                placeholder="입력해주세요."
                                onChange={InputPw}
                                defaultValue=""
                            ></Thisinpu>
                            <Button onClick={pwSubmit}>수정</Button>
                            <p>패스워드 확인</p>
                            <Thisinpu type="password" placeholder="입력해주세요." onChange={InputConfrim}></Thisinpu>
                        </UserForm1>
                    </div>
                </UserPassing>
            </UserInfo>
        </TopDiv>
    );
};

export default PersonalInfo;

const UserForm1 = styled.div`
    text-align: left;
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
    .Input_data {
        display: flex;
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
    &:focus {
        outline: 1px solid ${({ theme }) => theme.colors.Blue_040};
    }
`;

const TopDiv = styled.div`
    background-color: ${({ theme }) => theme.colors.Blue_010};
    padding: 60px 0;
    margin-bottom: 50px;
`;
const UserInfo = styled.div`
    text-align: center;
    width: 100%;
    .manager_btn {
        color: ${({ theme }) => theme.colors.Orange_030};
        font-size: ${({ theme }) => theme.fontSizes.lg};
        margin-bottom: 10px;
        cursor: pointer;
        strong {
            font-weight: 700;
        }
    }
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
    .InfoPerson {
        margin-top: 30px;
    }
`;

const UserExer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .user_profile {
        background-color: #fff;
        width: 200px;
        height: 200px;
        border-radius: 200px;
    }
    .filebox {
        display: flex;
        text-align: center;
        margin-top: -25px;
        label {
            display: inline-block;
            padding: 10px 28px;
            color: #fff;
            vertical-align: middle;
            background-color: ${({ theme }) => theme.colors.Blue_030};
            border-radius: 20px;
            cursor: pointer;
            height: 40px;
        }
        input[type="file"] {
            position: absolute;
            width: 0;
            height: 0;
            padding: 0;
            overflow: hidden;
            border: 0;
        }
    }

    .bottom_btn {
        display: flex;
        margin-top: 15px;
        .user_btn {
            Button {
                margin-right: 5px;
            }
        }
    }
    .user_id {
        padding-top: ${({ theme }) => theme.paddings.base};
        font-size: ${({ theme }) => theme.fontSizes.base};
        color: ${({ theme }) => theme.colors.Blue_040};
        font-weight: 700;
    }
    /* .input-file-button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    } */
`;

const Welcome = styled.span`
    color: ${({ theme }) => theme.colors.Gray_050};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    line-height: 160%;
`;

const UserForm = styled.div`
    text-align: left;
    /* height: 264px; */
    /* margin-top: ${({ theme }) => theme.paddings.xxxl}; */
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
    .Input_data {
        display: flex;
    }
    .errorCode {
        color: red;
        font-size: 12px;
    }
`;

const SubmitButton = styled.button`
    display: inline-flex;
    outline: none;
    padding: 7px 1rem;
    border: 3px solid transparent;
    border-radius: 50px;
    color: white;
    background-color: ${({ theme }) => theme.colors.Blue_030};
    cursor: pointer;
    /* 크기 */
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1rem;
    &:hover {
        background: ${({ theme }) => theme.colors.Blue_040};
    }
    &:active {
        background: ${({ theme }) => theme.colors.Blue_050};
    }
`;
