import React, { useState } from "react";
import styled from "styled-components";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import Button from "../common/button/Button";
import { useReviewAdd } from "../../lib/api/useRivesMutation";
import useStore from "../../lib/store";
import { useNavigate } from "react-router-dom";
import UploadImg from "../../assets/images/userinfo/uploadIcon.svg";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery } from "react-query";
import Loading from "../common/loading/Loading";


const WirteComment = ({ Semidata }) => {
    const navigate = useNavigate();
    const { logInfo } = useStore();

    const image = Semidata.imageURL;
    const [regiImg, setregiImg] = useState(UploadImg);
    const [content, setContent] = useState("");
    const [uploading2, setUploading2] = useState(UploadImg);
    const { mutate: ReviewAdd } = useReviewAdd();

    // const [mutate: ReviewAdd] = useReviewAdd();


    const saveFileImage = (e) => {
        setregiImg(URL.createObjectURL(e.target.files[0]));
        setUploading2(e.target.files);
    };

    const sendImageToServer = async () => {
        if (logInfo) {
            const fd2 = new FormData();
            const key = Semidata.productId;
            const setData = { fd2, key };
            Object.values(uploading2).forEach((file) => fd2.append("file", file));
            fd2.append("content", content);
            ReviewAdd(setData);
            setregiImg(UploadImg);
            setUploading2(UploadImg);
        } else {
            alert("로그인후에 리뷰작성이 가능합니다!!!");
            navigate(`/login`);
        }
    };

    return (
        <Maindiv>
            <label className="input-file-button" for="input-file">
                {regiImg && (
                    <div className="image_box">
                        <img src={regiImg} className="image_box" />
                    </div>
                )}
            </label>
            <input type="file" accept="image/*" id="input-file" onChange={saveFileImage} />
            <WriteArea>
                <input
                    type="text"
                    placeholder="최대 50자 입력가능"
                    onChange={(e) => setContent(e.target.value)}
                ></input>
                <Button onClick={sendImageToServer}>후기작성</Button>
            </WriteArea>
        </Maindiv>
    );
};

export default WirteComment;

const Maindiv = styled.div`
    display: flex;
    #input-file {
        display: none;
    }
    .input-file-button {
        border-radius: 4px;
        cursor: pointer;
    }
    img {
        background-color: ${({ theme }) => theme.colors.Gray_020};
        border-radius: ${({ theme }) => theme.radius.small};
    }
    .image_box {
        width: 130px;
        height: 130px;
        background-color: ${({ theme }) => theme.colors.Gray_020};
        border-radius: ${({ theme }) => theme.radius.small};
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
const WriteArea = styled.section`
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
    box-sizing: border-box;
    input {
        width: 500px;
        min-height: 80px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        border: none;
        border-radius: 10px;
        padding: 10px;
    }
`;
