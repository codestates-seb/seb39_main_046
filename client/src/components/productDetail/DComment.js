import React, { useState } from "react";
import styled from "styled-components";
import ReviewHeartButton from "../common/button/ReviewHeartButton";
import Usering from "../../assets/images/userinfo/Userimg.jpg";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import { FiTrash, FiSave, FiUpload } from "react-icons/fi";
import { RiEdit2Fill, RiArrowGoBackLine } from "react-icons/ri";
import { useRivesDelete, usePatchProductsReviwes } from "../../lib/api/useRivesMutation";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery } from "react-query";
import Loading from "../common/loading/Loading";
import UploadImg2 from "../../assets/images/userinfo/uploadIcon.svg";

const GeyMyInfo = () => {
    return axiosInstance.get("member/myPage");
};

const Comment = ({ Semidata }) => {
    const image = Semidata.imageURL;
    const profile = Semidata.member.profile;
    const [editOn, setEditOn] = useState(false);
    const [content, setContent] = useState("");
    const [NomalImg, setNomalImg] = useState(UploadImg2);
    const [UploadImg, setUploadImg] = useState(image);

    const { mutate: ReviewDelete } = useRivesDelete();
    const { mutate: ReviewPatch } = usePatchProductsReviwes();

    const { data, isLoading } = useQuery(["infos"], () => GeyMyInfo(), {
        keepPreviousData: true,
        staleTime: 2000,
    });

    if (isLoading) return <Loading />;

    const deleteClick = () => {
        const ID = Semidata.reviewId;
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            ReviewDelete(ID);
        }
    };

    const editClick = () => {
        if (data.data.member.memberId === Semidata.member.memberId) {
            setEditOn(true);
        } else {
            alert("자기의 댓글만 수정 가능합니다.");
        }
    };
    const SubmitHnadle = async () => {
        const fd4 = new FormData();
        const key = Semidata.reviewId;
        console.log(key);
        if (typeof UploadImg !== "string") {
            Object.values(UploadImg).forEach((file) => fd4.append("file", file));
        }

        fd4.append("content", content);
        const PatchData = { key, fd4 };
        ReviewPatch(PatchData);
        setEditOn(false);
    };

    const storeImg = (event) => {
        setNomalImg(URL.createObjectURL(event.target.files[0]));
        setUploadImg(event.target.files);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    };

    const CancelHandler = () => {
        setUploadImg(image);
        setNomalImg(image);
        setEditOn(false);
    };

    return (
        <Maindiv>
            <div className="img_box">
                {editOn ? (
                    <div className="filebox">
                        <label className="Edit-Area">
                            {/* <FiUpload size={30} /> */}
                            <img src={NomalImg} className="image_box"/>
                            <input type="file" accept="image/*" id="Edit-Review" onChange={storeImg} />
                        </label>
                    </div>
                ) : (
                    <img src={image === null ? Noimg : image} alt="리뷰 이미지" className="review_img" />
                )}
            </div>
            <ReviewDetail>
                <div className="userInfo">
                    <div className="uesrNick">
                        <img src={profile === null ? Usering : profile} alt="유저 프로필" width="25px" height="25px" />
                        <span>{Semidata.member.nickName}</span>
                    </div>
                    <div className="userHeart">
                        <ReviewHeartButton
                            id={Semidata.reviewId && Semidata.reviewId}
                            heartFlag={Semidata.reviewHeartFlag && Semidata.reviewHeartFlag}
                        />
                        <p>{Semidata.hearts}</p>
                    </div>
                </div>
                <Commentex>
                    {editOn ? (
                        <InputText
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                            defaultValue={Semidata.content}
                        />
                    ) : (
                        <p>{Semidata.content}</p>
                    )}
                </Commentex>
                <Controlbar>
                    <span className="icon">
                        {editOn ? (
                            <FiSave onClick={SubmitHnadle} size={20} color="rgba(174, 174, 178, 1)" />
                        ) : (
                            <RiEdit2Fill onClick={editClick} size={20} color="rgba(174, 174, 178, 1)" />
                        )}
                    </span>
                    <span className="icon">
                        <FiTrash onClick={deleteClick} size={20} color="rgba(253, 169, 79, 1)" />
                    </span>
                    {editOn ? (
                        <RiArrowGoBackLine onClick={CancelHandler} size={20} color="rgba(174, 174, 178, 1)" />
                    ) : null}
                    <span className="date">{Semidata.createdAt.substr(0, 10)}</span>
                </Controlbar>
            </ReviewDetail>
        </Maindiv>
    );
};

export default Comment;

const InputText = styled.input`
    width: 100%;
    height: 70px;
    border: 2px solid ${({ theme }) => theme.colors.Blue_030};
    background-color: ${({ theme }) => theme.colors.Gray_010};
    border-radius: 15px;
`;

const Maindiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.radius.small};
    background-color: #fff;
    margin: 0 15px 15px 0;
    padding: 14px 14px;
    box-sizing: border-box;
    .img_box {
        width: 135px;
        height: 135px;
        border: 1px solid #efefef;
        border-radius: ${({ theme }) => theme.radius.small};
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .review_img {
            min-width: 140px;
            max-width: 180px;
        }
        .filebox {
            display: flex;
            text-align: center;
            label {
                display: inline-block;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 135px;
                height: 135px;
                color: #fff;
                vertical-align: middle;
                background-color: ${({ theme }) => theme.colors.Gray_020};
                border-radius: ${({ theme }) => theme.radius.small};
                cursor: pointer;
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
        .image_box {
        width: 130px;
        height: 130px;
        background-color: ${({ theme }) => theme.colors.Gray_020};
        border-radius: ${({ theme }) => theme.radius.small};
        display: flex;
        justify-content: center;
        align-items: center;
    }
    }
    #Edit-Review {
        display: none;
    }
`;
const ReviewDetail = styled.section`
    width: 74%;
    .userInfo {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            border-radius: 30px;
            background-color: ${({ theme }) => theme.colors.Gray_030};
        }
        .uesrNick {
            span {
                margin-left: ${({ theme }) => theme.margins.base};
            }
        }
        .userHeart {
            display: flex;
            p {
                padding: 3px 0 0 5px;
                color: ${({ theme }) => theme.colors.Orange_040};
            }
        }
    }

    span:last-child {
        float: right;
    }
`;
const Commentex = styled.div`
    height: 70px;
    margin: 5px 0;
    p {
        word-wrap: break-word;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const Controlbar = styled.section`
    height: 18px;
    .icon {
        margin-right: 5px;
    }
    .date {
        color: ${({ theme }) => theme.colors.Gray_030};
    }
`;
