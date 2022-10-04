import React, { useState } from "react";
import styled from "styled-components";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import Button from "../common/button/Button";
import { useReviewAdd } from "../../lib/api/useRivesMutation";
import useStore from "../../lib/store";
import { useNavigate } from "react-router-dom";
import { BiCamera, BiPlus } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

const WirteComment = ({ data }) => {
    const navigate = useNavigate();

    const image = data.imageURL;
    console.log(image);
    const [regiImg, setregiImg] = useState(Noimg);
    const [content, setContent] = useState("");
    const [uploading2, setUploading2] = useState(Noimg);
    const { mutate: ReviewAdd } = useReviewAdd();

    // const [mutate: ReviewAdd] = useReviewAdd();

    const saveFileImage = (e) => {
        setregiImg(URL.createObjectURL(e.target.files[0]));
        setUploading2(e.target.files);
    };

    const { logInfo } = useStore();
    const sendImageToServer = async () => {
        if (logInfo) {
            const fd2 = new FormData();
            const key = data.productId;
            const setData = { fd2, key };
            console.log(typeof uploading2 === "object");
            Object.values(uploading2).forEach((file) => fd2.append("file", file));
            fd2.append("content", content);
            ReviewAdd(setData);
            setregiImg(Noimg);
            setUploading2(Noimg);
        } else {
            alert("로그인후에 리뷰작성이 가능합니다");
            navigate(`/login`);
        }
    };

    return (
        <Maindiv>
            {regiImg && (
                <div className="image_box">
                    <BiCamera size={35} color="#fff" />
                    {/* <img src={Noimg} className="image_box" /> */}
                </div>
            )}

            <WriteArea>
                <input
                    className="comment_text"
                    type="text"
                    placeholder="최대 50자 입력가능"
                    onChange={(e) => setContent(e.target.value)}
                ></input>
                <div className="write_btn">
                    <div className="filebox">
                        <label for="input-file">
                            <FiUpload />
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="input-file"
                            onChange={saveFileImage}
                            multiple="multiple"
                        />
                    </div>
                    <Button onClick={sendImageToServer}>후기작성</Button>
                </div>
            </WriteArea>
        </Maindiv>
    );
};

export default WirteComment;

const Maindiv = styled.div`
    display: flex;
    #input-file {
        /* display: none; */
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
    .comment_text {
        width: 500px;
        min-height: 80px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        border: none;
        border-radius: 10px;
        padding: 10px;
    }
    .write_btn {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .filebox {
            display: flex;
            text-align: center;
            label {
                display: inline-block;
                padding: 7px 1rem;
                color: #fff;
                vertical-align: middle;
                background-color: ${({ theme }) => theme.colors.Gray_040};
                border-radius: 20px;
                cursor: pointer;
                font-size: ${({ theme }) => theme.fontSizes.small};
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
    }
`;
