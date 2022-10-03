import React, { useState } from "react";
import styled from "styled-components";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import Button from "../common/button/Button";
import { BiCamera } from "react-icons/bi";
import { useReviewAdd } from "../../lib/api/useRivesMutation";
import axios from "axios";

const WirteComment = ({ data }) => {
    const [regiImg, setregiImg] = useState(Noimg);
    const [content, setContent] = useState("");
    const [uploading2, setUploading2] = useState(null);
    const [ImgBase642, setImgBase642] = useState([]);
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: Noimg,
    });

    const { mutate: ReviewAdd } = useReviewAdd();
    console.log(data.productId);

    // const [mutate: ReviewAdd] = useReviewAdd();

    const saveFileImage = (e) => {
        setregiImg(URL.createObjectURL(e.target.files[0]));
        setUploading2(e.target.files);
        for (let i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i]);
                reader.onloadend = () => {
                    const base642 = reader.result;
                    if (base642) {
                        let base642Sub = base642.toString();
                        setImgBase642((imgBase642) => [...imgBase642, base642Sub]);
                    }
                };
            }
        }
    };

    const sendImageToServer = async () => {
        const fd2 = new FormData();
        const key = data.productId;
        const setData = {fd2, key}; 
        Object.values(uploading2).forEach((file) => fd2.append("file", file));
        fd2.append("content", content);
        ReviewAdd(setData);
    };

    return (
        <Maindiv>
            <label className="input-file-button" for="input-file">
                {regiImg && (
                    <div className="image_box">
                        <img src={regiImg} className="image_box" />
                        <BiCamera size={35} color="#fff" />
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
        background-color: rgba(217, 217, 217, 1);
        border-radius: 20px;
    }
    .image_box {
        width: 130px;
        height: 130px;
        background-color: rgba(217, 217, 217, 1);
        border-radius: 20px;
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
