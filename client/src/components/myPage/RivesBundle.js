import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../common/button/HeartButton";
import Reivew1 from "../../assets/images/main/Review-1.png";
import { FiTrash2, FiSave } from "react-icons/fi";
import { RiEdit2Fill, RiArrowGoBackLine } from "react-icons/ri";
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
        console.log(key);
        Object.values(uploading).forEach((file) => fd1.append("file", file));
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
            {editOn ? (
                <label className="Edit-button" for="Edit-file">
                    <img src={baseImg} alt="업로드용 이미지" className="review_img" />
                </label>
            ) : (
                <img src={data.imageURL} alt="리뷰 1" className="review_img"></img>
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
                <div className="icon_box">
                    {editOn ? (
                        <FiSave
                            onClick={editClick}
                            className="icon first_icon"
                            size={20}
                            color="rgba(174, 174, 178, 1)"
                        />
                    ) : (
                        <RiEdit2Fill
                            onClick={editSubmit}
                            className="icon first_icon"
                            size={20}
                            color="rgba(174, 174, 178, 1)"
                        />
                    )}
                    {/* <img onClick={() => seteditOn(!editOn)} src={Pencil}  alt="수정버튼"></img> */}
                    <FiTrash2 onClick={deleteClick} className="icon" size={20} color="rgba(253, 169, 79, 1)" />
                    {editOn ? <RiArrowGoBackLine onClick={Backhandle} size={20} color="rgba(174, 174, 178, 1)" /> : ""}
                </div>

                <div className="creatt_at">{data.createdAt.substr(0, 10)}</div>
            </Productex2>
        </ProductsRivewdiv>
    );
};

export default RivesBundle;

const ProductsRivewdiv = styled.div`
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.5);
    .review_img {
        border-radius: 20px;
        max-width: 240px;
        min-height: 240px;
        border: 1px solid rgba(204, 204, 204, 0.2);
        /* box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.2); */
    }
    h4 {
        margin: 10px 0;

        font-size: ${({ theme }) => theme.fontSizes.base};
        color: ${({ theme }) => theme.colors.Gray_090};
        font-weight: 700;
    }
    p {
        height: 60px;
        padding-bottom: ${({ theme }) => theme.paddings.base};
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Gray_060};
        background-color: ${({ theme }) => theme.colors.Gray_010};
        border-radius: 15px;
        font-weight: 400;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .contetntSection {
        width: 100%;
        height: 60px;
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Gray_060};
        background-color: ${({ theme }) => theme.colors.Gray_010};
        border: none;
        border-radius: 15px;
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
    justify-content: space-between;
    margin-top: 10px;
    .creatt_at {
        font-weight: 400;
        color: ${({ theme }) => theme.colors.Gray_030};
    }
    button {
        width: 17px;
        height: 17px;
        margin-top: ${({ theme }) => theme.margins.base};
        margin-right: ${({ theme }) => theme.margins.base};
    }
    .icon {
        margin-right: 5px;
    }
`;
