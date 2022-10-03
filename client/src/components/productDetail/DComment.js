import React from "react";
import styled from "styled-components";
import ReviewHeartButton from "../common/button/ReviewHeartButton";
import ReviewImg from "../../assets/images/products/ReviewImg.png";
import Usering from "../../assets/images/userinfo/Userimg.jpg";
import { FiTrash, FiSave } from "react-icons/fi";
import { RiEdit2Fill, RiArrowGoBackLine } from "react-icons/ri";
import { useRivesDelete,usePatchRevies } from "../../lib/api/useRivesMutation";
import { useState } from "react";
import axios from "axios";

const Comment = ({ data }) => {
    // console.log(data.content);
    // const { member } = useMypage();
    const image = data.imageURL;
    const profile = data.member.profile;
    const [editOn, setEditOn] = useState(false);
    const [content, setContent] = useState("");
    const [NomalImg, setNomalImg] = useState(image);
    const [UploadImg, setUploadImg] = useState(image);
    const [changeImg, setChangeImg] = useState(false);
    const { mutate: ReviewDelete } = useRivesDelete();
    const { mutate: ReviewPatch} = usePatchRevies();

    const deleteClick = () => {
        const ID = data.reviewId;
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            ReviewDelete(ID);
        }
    };

    const editClick = () => {
        setEditOn(true);
        console.log(content);
    }
    const SubmitHnadle = async() => {
        const fd4 = new FormData();
        const key = data.reviewId;
        // if(typeof UploadImg !== "string"){
        //     alert("이미지 올렷어요");
        // }else{
        //     alert("이미지 안올렷어요")
        // }
        Object.values(UploadImg).forEach((file) => fd4.append("file", file));
        fd4.append("content", content);
        await axios.patch(`/review/${key}`, fd4, {
            headers: {
                Authorization: sessionStorage.getItem("token"),
                "Content-Type": `multipart/form-data`,
            },
        }).then((res) => {
            console.log(res.data);
            alert("수정완료");            
        }).catch ((error) => {
            console.log(error);
        });        
    }

    const storeImg = (event) => {
        setNomalImg(URL.createObjectURL(event.target.files[0]));
        setUploadImg(event.target.files);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

    }


    const CancelHandler = () => {
        setUploadImg(image);
        setNomalImg(image);
        setEditOn(false);
    }

    return (
        <Maindiv>
            <div className="img_box">
                {editOn ? (
                <label className="Edit-Area">
                    <img src={NomalImg} alt="프리뷰 이미지" className="review_img" for="Edit-Review"/>
                    <input type="file" accept="image/*" id="Edit-Review" onChange={storeImg}/>
                </label>
                ) : (
                    <img src={image === null ? Usering : image} alt="리뷰 이미지" className="review_img" />
                )}                
            </div>
            <ReviewDetail>
                <div className="userInfo">
                    <div className="uesrNick">
                        <img src={profile === null ? Usering : profile} alt="유저 프로필" width="25px" height="25px" />
                        <span>{data.member.nickName}</span>
                    </div>
                    <div className="userHeart">
                        <ReviewHeartButton
                            id={data.reviewId && data.reviewId}
                            heartFlag={data.reviewHeartFlag && data.reviewHeartFlag}
                        />
                        <p>{data.hearts}</p>
                    </div>
                </div>
                <Commentex>
                    {editOn ? (<InputText  onChange={(e) => setContent(e.target.value)} type="text"/>) : (<p>{data.content}</p>)}
                </Commentex>
                <Controlbar>
                    <span className="icon">
                        {editOn?
                        <FiSave
                            className="icon first_icon"
                            onClick={SubmitHnadle}                        
                            size={20}
                            color="rgba(174, 174, 178, 1)"
                        /> : <RiEdit2Fill  onClick={editClick} size={20} color="rgba(174, 174, 178, 1)" />}
                    </span>
                    <span className="icon">
                        <FiTrash onClick={deleteClick} size={20} color="rgba(253, 169, 79, 1)" />
                    </span>
                    {editOn? <RiArrowGoBackLine onClick={CancelHandler} size={20} color="rgba(174, 174, 178, 1)" /> : ""}
                    <span className="date">{data.createdAt.substr(0, 10)}</span>
                </Controlbar>
            </ReviewDetail>
        </Maindiv>
    );
};

export default Comment;

const InputText = styled.input`
    width: 449px;
    height: 70px;
`

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
        border-radius: ${({ theme }) => theme.radius.small};
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .review_img {
            min-width: 140px;
            max-width: 180px;
        }
    }
    #Edit-Review{
        display:none;
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
        margin-right: ${({ theme }) => theme.margins.base};
    }
    .date {
        color: ${({ theme }) => theme.colors.Gray_030};
    }
`;
