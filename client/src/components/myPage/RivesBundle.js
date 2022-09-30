import React,{useState} from "react";
import styled from "styled-components";
import HeartButton from "../common/button/HeartButton";
import Reivew1 from "../../assets/images/main/Review-1.png";
import Pencil from "../../assets/images/controlimag/Pencil.png";
import TrashBox from "../../assets/images/controlimag/trashbox.png";
import Edit from "../../assets/images/controlimag/edit.png";

import { useNavigate } from "react-router-dom";

const RivesBundle = ({ data }) => {
    console.log(data.content);
    const navigate = useNavigate();
    const [editOn, seteditOn] = useState(false);
    const goDetail = () => {
        navigate(`/product/${data}`);
    };

    const editClick =  () => {
        seteditOn(!editOn)
    }

    const deleteClick = () => {        
    }

    return (
        <ProductsRivewdiv>
            <span>
                <HeartButton />
            </span>
            {editOn ? ("") : (<img src={Reivew1} alt="리뷰 1"></img>)}        
            <div className="Productex">
                <h4>{data.product.productName}</h4>
                <p>{data.content}</p>
            </div>
            <Productex2>
                {editOn ? (<img onClick={editClick} src={Edit} alt="수정버튼"></img>):(<img onClick={() => seteditOn(!editOn)} src={Pencil}  alt="수정버튼"></img>)}
                {/* <img onClick={() => seteditOn(!editOn)} src={Pencil}  alt="수정버튼"></img> */}
                <img src={TrashBox} alt="삭제버튼"></img>
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
        width:17px;
        height:17px;
        margin-top: ${({ theme }) => theme.margins.base};
        margin-right: ${({ theme }) => theme.margins.base};
    }
`;
