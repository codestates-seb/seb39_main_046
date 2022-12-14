import React, { useState } from "react";
import styled from "styled-components";
import { FiTrash2, FiSave } from "react-icons/fi";
import { RiEdit2Fill, RiArrowGoBackLine } from "react-icons/ri";
import { useRivesDelete } from "../../lib/api/useRivesMutation";
import { usePatchRevies } from "../../lib/api/useRivesMutation";

const RivesBundle = ({ data, index }) => {
    const image = data.imageURL;
    const { mutate: ReviewDelete } = useRivesDelete();
    const { mutate: ReviewPatch } = usePatchRevies();
    const [baseImg, setBaseImg] = useState(image);
    const [editOn, seteditOn] = useState(false);
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(image);

    const editClick = () => {
        const fd4 = new FormData();
        const key = data.reviewId;
        const EditData = { fd4, key };
        if (typeof uploading === "object") {
            Object.values(uploading).forEach((file) => fd4.append("file", file));
        }
        fd4.append("content", content);
        ReviewPatch(EditData);
        seteditOn(false);
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
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    };

    const Backhandle = (e) => {
        setUploading(image);
        setBaseImg(image);
        seteditOn(false);
    };

    const editContent = (e) => {
        setContent(e.target.value);
    };

    const editSubmit = () => {
        seteditOn(!editOn);
    };

    return (
        <ProductsRivewdiv>
            {editOn ? (
                <label className="Edit-button" for={`Edit-file${index}`}>
                    <img src={baseImg} alt="업로드용 이미지" className="review_img" />
                    <input
                        type="file"
                        accept="image/*"
                        id={`Edit-file${index}`}
                        onChange={saveImg}
                        className="typeFile2"
                    />
                </label>
            ) : (
                <img src={data.imageURL} alt="리뷰 1" className="review_img"></img>
            )}
            <div className="Productex">
                <h4>{data.product.productName}</h4>
                {editOn ? (
                    <input
                        onChange={editContent}
                        defaultValue={data.content}
                        type="text"
                        className="contetntSection"
                        rows={5}
                    />
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
        padding: 10px;
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
    .typeFile2 {
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
