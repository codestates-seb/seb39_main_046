import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInastance";
import { useCategory, useCategoryMutation } from "../../lib/api/useCategory";
import { useProducts, useSerchProduct } from "../../lib/api/useGetProducts";
import LineInput from "../../components/common/input/LineInput";
import Banner from "../../components/common/banner/Banner";
import Button from "../../components/common/button/Button";
import Paging from "../../components/common/pagination/Paging";
import MProductBox from "../../components/manager/MProductBox";
import MProductModal from "../../components/manager/MProductModal";
import MCategoryBox from "../../components/manager/MCategoryBox";

const ManagerPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, pageInfo } = useProducts(); //상품 데이터 get
    const serchData = useSerchProduct(); //검색 데이터 get
    const Cdata = useCategory(); //카테고리 get
    const categories = Cdata["등록된 전체 카테고리"];

    const [newCategory, setNewCategory] = useState();
    const inputChangeHandler = (e) => {
        setNewCategory(e.target.value);
    };
    // const postRegister = useCategoryMutation({
    //     categoryName: newCategory,
    // });

    // const postRegisterHandler = (e) => {
    //     e.preventDefault();
    //     postRegister.mutate();
    // };
    const postHandler = async () => {
        const enteredData = {
            categoryName: newCategory,
        };
        try {
            await axiosInstance.post(`/category`, enteredData);
            console.log("updated successfully!");
            window.location.reload();
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    return (
        <>
            <Banner>
                <BHeader>
                    카테고리와 상품을 관리해보세요
                    <br />
                    <span>관리자 전용 공간</span>
                </BHeader>
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
                                <input
                                    placeholder="추가할 카테고리를 입력해주세요"
                                    changeHandler={inputChangeHandler}
                                />
                                <Button onClick={postHandler}>추가</Button>
                            </div>
                        </div>
                        <div className="contents">
                            <ul>
                                {categories &&
                                    categories.data.map((el) => {
                                        return <MCategoryBox data={el} key={el.categoryId} />;
                                    })}
                            </ul>
                            <Paging pageInfo={categories && categories.pageInfo} />
                        </div>
                    </CategoryBox>
                </TopContainer>
                {isOpen && <MProductModal setIsOpen={setIsOpen} />}
                <BottomContainer>
                    <div className="header">
                        <h2>상품 관리</h2>
                        <LineInput />
                    </div>

                    <section className="productContainer">
                        {serchData.data ? (
                            <MProductBox className="itemgrid" data={serchData.data} setIsOpen={setIsOpen} />
                        ) : (
                            data &&
                            data.map((data) => {
                                return (
                                    <MProductBox
                                        className="itemgrid"
                                        key={data.productId}
                                        data={data}
                                        setIsOpen={setIsOpen}
                                    />
                                );
                            })
                        )}
                    </section>
                    <PaginationBox>{serchData.data ? null : <Paging pageInfo={pageInfo} />}</PaginationBox>
                </BottomContainer>
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
    width: 39%;
    padding: 20px;
    .contents {
        height: 365px;
        padding: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
    }
`;

const CategoryBox = styled.div`
    width: 58%;
    padding: 20px;
    .header_right {
        input {
            height: 40px;
            width: 300px;
            padding-left: 20px;
            margin-right: 10px;
            border-radius: 30px;
            background-color: ${({ theme }) => theme.colors.Gray_010};
            border: none;
        }
    }
    .contents {
        height: 361px;
        padding: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
    }
`;

const Categoryli = styled.li`
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 30px;
    margin-bottom: 10px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        padding-top: 7px;
        .icon {
            cursor: pointer;
        }
        .first_icon {
            margin-right: 10px;
        }
    }
`;

const BottomContainer = styled.div`
    width: 100%;
    padding: 22px;
    margin-top: 20px;
    .header {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }
    .productContainer {
        max-width: 1060px;
        width: 100%;
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;

        .itemgrid {
            box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.5);
            background-color: blue;
        }
    }
    .likebtn {
        width: 1000px;
        text-align: right;
    }
`;
const PaginationBox = styled.div`
    text-align: center;
`;
