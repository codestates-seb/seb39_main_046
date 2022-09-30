import React, { useState } from "react";
import styled from "styled-components";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/BannerCharater.png";
import { useCategory } from "../../lib/api/useCategory";
import LineInput from "../../components/common/input/LineInput";
import { useDeleteCategory } from "../../lib/api/useCategory";
import axiosInstance from "../../utils/axiosInastance";
import axios from "axios";

const ManagerPage = () => {
    const [updateContent, setUpdateContent] = useState({
        categoryName: "이거 수정 테스팅 중",
    });
    const data = useCategory();
    // console.log(data);
    // console.log(data && data["등록된 전체 카테고리"]);
    const categories = data["등록된 전체 카테고리"];
    // console.log(categories && categories.pageInfo);
    // console.log(categories && categories.data);
    // console.log(categories && categories.data[0]);

    const { mutate: deleteCategory, isError } = useDeleteCategory();
    if (isError) {
        <p>("삭제가 안되는 중..")</p>;
    }
    const onsubmit = () => {
        deleteCategory(42);
    };

    const deleteHandler = async (categoryNum) => {
        try {
            await axiosInstance.delete(`/category/${categoryNum}`);
            console.log("deleted successfully!");
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };
    const updateHandler = async (categoryNum) => {
        const enteredData = {
            categoryName: "ㄴㅇㄴㅁㅇㅁㅇㅁㄴ이거 수정 테스팅 중",
        };
        try {
            await axiosInstance.patch(`/category/${categoryNum}`, enteredData);
            console.log("updated successfully!");
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    return (
        <>
            <Banner>
                <BHeader>
                    관리자 전용 페이지 입니다
                    <br />
                    <span>oo 관리자</span>
                </BHeader>
                <BImg>
                    <img src={BChracter} alt="배너 캐릭터" />
                </BImg>
            </Banner>
            <MContainer>
                <ul>
                    {categories &&
                        categories.data
                            .sort((a, b) => a.categoryId - b.categoryId)
                            .map((el) => {
                                return <li key={el.categoryId}>{el.categoryName}</li>;
                            })}
                </ul>
                <LineInput />
                <button onClick={() => deleteHandler(42)}>삭제</button>
                <button onClick={onsubmit}>삭제222</button>
                <button onClick={() => updateHandler(41)}>수정</button>
            </MContainer>
        </>
    );
};

export default ManagerPage;

const BHeader = styled.header`
    margin: 0 auto;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    color: ${({ theme }) => theme.colors.Gray_090};
    span {
        font-weight: bold;
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        color: ${({ theme }) => theme.colors.Blue_030};
    }
`;

const BImg = styled.span`
    position: relative;
    top: -129px;
    left: 50px;
`;

const MContainer = styled.section`
    max-width: 1280px;
    margin: 0 auto;
`;

// export const imageRegisterFn = async (formData) => {
//     const res = axiosInstance.post("/upload", formData, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });

//     return res;
// };
