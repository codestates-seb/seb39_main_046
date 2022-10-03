import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../common/button/HeartButton";
import Reivew1 from "../../assets/images/main/Review-1.png";
import Pencil from "../../assets/images/controlimag/Pencil.png";
import TrashBox from "../../assets/images/controlimag/trashbox.png";
import Edit from "../../assets/images/controlimag/edit.png";
import Back from "../../assets/images/controlimag/back.png";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import { useRivesDelete } from "../../lib/api/useRivesMutation";
import { usePatchRevies } from "../../lib/api/useRivesMutation";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const RivesBundle = ({ data }) => {
    const { mutate: ReviewDelete } = useRivesDelete();
    const { mutate: ReviewPatch } = usePatchRevies();

    const [baseImg, setBaseImg] = useState(data.imageURL);
    const navigate = useNavigate();
    const [editOn, seteditOn] = useState(false);
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(null);
    const [imgBase641, setImgBase641] = useState([]);
    const [comment, setComment] = useState("아 제발 좀되라");
    // console.log(content);
    // const goDetail = () => {
    //     navigate(`/product/${data}`);
    // };

    const editClick = async () => {
        console.log("이거맞지?");
        const fd1 = new FormData();
        const key = data.reviewId;
        const json = JSON.stringify(content);
        // const blob = new Blob([json], {type:"application/json"});
        // console.log(key);
        Object.values(uploading).forEach((file) => fd1.append("file", file));
        // fd1.append("content", new Blob([JSON.stringify(comment)],{
        //     type:"application/json"
        // }));
        fd1.append("content", content);
        await axios
            .post(`/review/5`, fd1, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                    "Content-Type": `multipart/form-data`,
                },
            })
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // ReviewPatch(key, fd1, content)
        // seteditOn(!editOn);
    };

    const deleteClick = () => {
        const id = data.reviewId;
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            ReviewDelete(id);
        }
    };

    const saveImg = (event) => {
        setBaseImg(URL.createObjectURL(event.target.files[0]));
        setUploading(event.target.files);
        setImgBase641([]);
        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base641 = reader.result;
                    if (base641) {
                        var base641Sub = base641.toString();
                        setImgBase641((imgBase641) => [...imgBase641, base641Sub]);
                    }
                };
            }
        }
    };

    const Backhandle = (e) => {
        seteditOn(false);
        setBaseImg(Noimg);
    };
    const editContent = (e) => {
        setContent(e.target.value);
        console.log(content);
    };

    const editSubmit = () => {
        seteditOn(!editOn);
    };

    return (
        <ProductsRivewdiv>
            <span>
                <HeartButton />
            </span>
            {editOn ? (
                <label className="Edit-button" for="Edit-file">
                    <img src={baseImg} alt="업로드용 이미지" />
                </label>
            ) : (
                <img src={data.imageURL} alt="리뷰 1"></img>
            )}
            <input type="file" accept="image/*" id="Edit-file" onChange={saveImg} />
            <div className="Productex">
                <h4>{data.product.productName}</h4>
                {editOn ? (
                    <input onChange={editContent} type="text" className="contetntSection" />
                ) : (
                    <p>{data.content}</p>
                )}
            </div>
            <Productex2>
                {editOn ? (
                    <img onClick={editClick} src={Edit} alt="수정버튼"></img>
                ) : (
                    <img onClick={editSubmit} src={Pencil} alt="수정버튼"></img>
                )}
                {/* <img onClick={() => seteditOn(!editOn)} src={Pencil}  alt="수정버튼"></img> */}
                <img onClick={deleteClick} src={TrashBox} alt="삭제버튼"></img>
                {editOn ? <img onClick={Backhandle} src={Back} alt="뒤로버튼" /> : ""}
                <div className="creatt_at">{data.createdAt}</div>
            </Productex2>
        </ProductsRivewdiv>
    );
};

export default RivesBundle;

const ProductsRivewdiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    margin-right: 25px;
    cursor: pointer;
    img {
        border-radius: 20px;
        width: 235px;
        height: 235px;
    }
    span {
        position: absolute;
        right: 2px;
        top: 5px;
        z-index: 2;
    }
    h4 {
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: ${({ theme }) => theme.fontSizes.base};
        color: ${({ theme }) => theme.colors.Gray_090};
        font-weight: 700;
    }
    p {
        padding-bottom: ${({ theme }) => theme.paddings.base};
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Gray_060};
        height: 80px;
        font-weight: 400;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .contetntSection {
        padding-bottom: ${({ theme }) => theme.paddings.base};
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Gray_060};
        height: 80px;
        font-weight: 400;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        border: none;
    }
    #Edit-file {
        display: none;
    }
    .Productex {
        width: 100%;
        text-align: left;
    }
    /* .controlbox{
        width:100%;
        img{            
            width:15px;
            height:15px;
            margin-top:${({ theme }) => theme.margins.base};
            margin-right:${({ theme }) => theme.margins.base};
        }
        .creatt_at{
            text-align:left;
        }
    } */
`;

const Productex2 = styled.div`
    width: 100%;
    display: flex;
    img {
        width: 17px;
        height: 17px;
        margin-top: ${({ theme }) => theme.margins.base};
        margin-right: ${({ theme }) => theme.margins.base};

        cursor: pointer;
    }
    .creatt_at {
        padding-top: 9px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.Gray_030};
        float: left;
        text-align: right;
    }
    button {
        width: 17px;
        height: 17px;
        margin-top: ${({ theme }) => theme.margins.base};
        margin-right: ${({ theme }) => theme.margins.base};
    }
`;
