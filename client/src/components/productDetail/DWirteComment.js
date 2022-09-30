import React, { useState } from "react";
import styled from "styled-components";
import Noimg from "../../assets/images/userinfo/Noimg.png";
import Button from "../common/button/Button";
import { BiCamera } from "react-icons/bi";

const WirteComment = () => {
    const [regiImg, setregiImg] = useState(Noimg);

    const saveFileImage = (e) => {
        setregiImg(URL.createObjectURL(e.target.files[0]));
        console.log(regiImg);
    };

    return (
        <Maindiv>
            <label className="input-file-button" for="input-file">
                {regiImg && (
                    <div className="image_box">
                        <BiCamera size={35} color="#fff" />
                    </div>
                )}
            </label>
            <input type="file" accept="image/*" id="input-file" onChange={saveFileImage} />
            <WriteArea>
                <input type="text" placeholder="최대 50자 입력가능"></input>
                <Button>후기작성</Button>
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