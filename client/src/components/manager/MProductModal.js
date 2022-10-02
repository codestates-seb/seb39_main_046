import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInastance";
import { useQuery } from "react-query";
import Loading from "../common/loading/Loading";
import { queryKeys } from "../../lib/react-query/constant";
import TextInput from "../common/input/TextInput";
import { useCategory } from "../../lib/api/useCategory";
import Paging from "../common/pagination/Paging";
import { useNavigate } from "react-router-dom";

const getDeatilProduct = async (productNum) => {
    const { data } = await axiosInstance.get(`/product/${productNum}`);
    return data;
};

const MProductModal = ({ setIsOpen }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
        navigate(`/manager`);
    };
    const Cdata = useCategory();
    const categories = Cdata["등록된 전체 카테고리"];
    const [isCategory, setCategory] = useState();
    const CategoryHandler = (index) => {
        setCategory(index);
    };

    const [isStore, setStore] = useState();
    const menuArr = ["GS25", "CU", "7-ELEVEN"];
    const StoreHandler = (index) => {
        setStore(index);
    };

    const { status, data, error, isFetching } = useQuery([queryKeys.product, id], () => getDeatilProduct(id), {
        staleTime: 2000,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (e) => {
            console.log(e.message);
        },
    });

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    if (isFetching) {
        return <Loading />;
    }

    console.log(data.product.imageURL);
    return (
        data && (
            <OutContainer>
                <EditContainer>
                    <LeftBox>
                        <img src={data.product.imageURL} alt={data.product.productName} />
                    </LeftBox>
                    <RightBox>
                        <div className="inner_box">
                            <div>
                                <h3>상품명</h3>
                                <TextInput></TextInput>
                            </div>
                            <div>
                                <h3>가격</h3>
                                <TextInput></TextInput>
                            </div>
                            <div>
                                <h3>상품 카테고리</h3>
                                <CategoryTab>
                                    {categories &&
                                        categories.data.map((el) => {
                                            return (
                                                <li
                                                    key={el.categoryId}
                                                    className={`${el === isStore ? " focused" : null}`}
                                                    onClick={() => StoreHandler(el)}
                                                >
                                                    {el.categoryName}
                                                </li>
                                            );
                                        })}
                                </CategoryTab>
                                <Paging pageInfo={categories && categories.pageInfo} />
                            </div>
                            <div>
                                <h3>편의점</h3>
                                <TabMenu>
                                    {menuArr.map((el, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={`${el === isCategory ? " focused" : null}`}
                                                onClick={() => CategoryHandler(el)}
                                            >
                                                {el}
                                            </li>
                                        );
                                    })}
                                </TabMenu>
                            </div>
                            <Button2>반영하기</Button2>
                        </div>
                    </RightBox>

                    <button className="close_btn" onClick={handleClose}>
                        X
                    </button>
                </EditContainer>
            </OutContainer>
        )
    );
};

export default MProductModal;
const OutContainer = styled.section`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
`;
const EditContainer = styled.div`
    width: 1000px;
    min-height: 500px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    position: relative;
    .close_btn {
        position: absolute;
        top: 15px;
        right: 15px;
        border-radius: 40px;
        color: #fff;
        border: none;
        background-color: ${({ theme }) => theme.colors.Blue_030};
    }
`;

const LeftBox = styled.div`
    width: 43%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        max-width: 380px;
        min-width: 280px;
    }
`;

const RightBox = styled.div`
    width: 56%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 20px 20px 0;
    h3 {
        margin-bottom: 6px;
    }
    input {
        background-color: ${({ theme }) => theme.colors.Gray_010};
        margin-bottom: 20px;
    }
`;
const CategoryTab = styled.ul`
    margin: 0 auto;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-wrap: wrap;
    color: ${({ theme }) => theme.colors.Gray_030};
    width: 550px;
    li {
        border-radius: 30px;
        margin: 0 6px 6px 0;
        padding: 6px 15px;
        background-color: ${({ theme }) => theme.colors.Gray_010};
        cursor: pointer;
    }

    .focused {
        color: #fff;
        background-color: ${({ theme }) => theme.colors.Gray_030};
        transition: 0.3s;
    }
`;
const TabMenu = styled.ul`
    margin: 0 auto;
    display: flex;
    justify-items: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.Gray_030};

    li {
        border-radius: 30px;
        margin-right: 6px;
        padding: 6px 15px;
        background-color: ${({ theme }) => theme.colors.Gray_010};

        cursor: pointer;
    }

    .focused {
        color: #fff;
        background-color: ${({ theme }) => theme.colors.Gray_040};
        transition: 0.3s;
    }
`;

const Button2 = styled.button`
    width: 98%;
    height: 40px;
    border-radius: 40px;
    margin-top: 30px;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.Blue_030};
    border: none;
`;
