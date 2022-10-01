import React, { useState } from "react";
import styled from "styled-components";
import Banner from "../../components/common/banner/Banner";
import BChracter from "../../assets/images/banner/BannerCharater.png";
import { useCategory } from "../../lib/api/useCategory";
import LineInput from "../../components/common/input/LineInput";
import { useDeleteCategory } from "../../lib/api/useCategory";
import axiosInstance from "../../utils/axiosInastance";
import axios from "axios";
import { useCategoryMutation } from "../../lib/api/useCategory";
import Button from "../../components/common/button/Button";
import TextInput from "../../components/common/input/TextInput";
import Paging from "../../components/common/pagination/Paging";
import EditBtn from "../../assets/icons/Edit.png";
import TrashBtn from "../../assets/icons/trash.png";

const ManagerPage = () => {
    const [updateContent, setUpdateContent] = useState({
        categoryName: "이거 수정 테스팅 중",
    });

    const [newCategory, setNewCategory] = useState("");
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

    const postRegister = useCategoryMutation({
        ...newCategory,
    });

    const inputChangeHandler = (e) => {
        setNewCategory(e.target.value);
    };
    const postRegisterHandler = (e) => {
        e.preventDefault();
        postRegister.mutate();
    };
    console.log(newCategory);
    return (
        <>
            <Banner>
                <BHeader>
                    카테고리와 상품을 관리해보세요
                    <br />
                    <span>관리자 전용 공간</span>
                </BHeader>
                <BImg>{/* <img src={BChracter} alt="배너 캐릭터" /> */}</BImg>
            </Banner>
            <MContainer>
                <TopContainer>
                    <RegisterBox>
                        <div className="header register_title">
                            <h2>전체 상품 등록</h2>
                            <p>상품이 모아진 파일을 올려주세요</p>
                        </div>
                        <div className="contents">
                            <input type="file" />
                        </div>
                    </RegisterBox>
                    <CategoryBox>
                        <div className="header">
                            <h2>카테고리 관리</h2>
                            <div className="header_right">
                                {/* <TextInput placeholder="추가할 카테고리를 입력해주세요"></TextInput> */}
                                <input placeholder="추가할 카테고리를 입력해주세요" />
                                <Button>추가</Button>
                            </div>
                        </div>
                        <div className="contents">
                            <ul>
                                {categories &&
                                    categories.data
                                        .sort((a, b) => a.categoryId - b.categoryId)
                                        .map((el) => {
                                            return (
                                                <Categoryli key={el.categoryId}>
                                                    {el.categoryName}
                                                    <span>
                                                        <img src={EditBtn} alt="수정 버튼" className="first_icon"></img>
                                                        <img src={TrashBtn} alt="삭제 버튼"></img>
                                                    </span>
                                                </Categoryli>
                                            );
                                        })}
                            </ul>
                            <Paging />
                        </div>
                    </CategoryBox>
                </TopContainer>
                <BottomContainer>
                    <div className="header">
                        <h2>상품 관리</h2>
                        <LineInput />
                    </div>
                </BottomContainer>

                <button onClick={() => deleteHandler(42)}>삭제</button>
                <button onClick={onsubmit}>삭제222</button>
                <button onClick={() => updateHandler(41)}>수정</button>
                <input placeholder="카테고리 입력해라" changeHandler={inputChangeHandler} />
                <button onClick={postRegisterHandler}>Register</button>
            </MContainer>
        </>
    );
};

export default ManagerPage;

const BHeader = styled.header`
    margin: 0 auto;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.Gray_050};
    span {
        color: ${({ theme }) => theme.colors.Blue_030};
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        font-weight: bold;
    }
`;

const BImg = styled.span`
    position: relative;
    top: -114px;
    left: 50px;
`;

const MContainer = styled.section`
    max-width: 1060px;
    margin: 0 auto;
    h2 {
        font-weight: bold;
    }
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    .header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 15px;
    }
`;

const RegisterBox = styled.div`
    width: 38%;
    padding: 20px;
    .contents {
        height: 350px;
        padding: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
    }
`;

const CategoryBox = styled.div`
    width: 60%;
    padding: 20px;
    .header_right {
        input {
            height: 40px;
            width: 300px;
            padding-left: 20px;
            margin-right: 10px;
            border-radius: 30px;
            background-color: ${({ theme }) => theme.colors.Blue_010};
            border: none;
        }
    }
    .contents {
        height: 350px;
        padding: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
    }
`;

const Categoryli = styled.li`
    width: 100%;
    height: 30px;
    background-color: #fff;
    border-radius: 30px;
    margin-bottom: 10px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        img {
            cursor: pointer;
        }
        .first_icon {
            margin-right: 10px;
        }
    }
`;

const BottomContainer = styled.div`
    width: 100%;
    height: 700px;
    padding: 22px;
    margin-top: 20px;
    .header {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
