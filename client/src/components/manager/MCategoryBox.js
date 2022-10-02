import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInastance";
import { useDeleteCategory, useUpdateCategory } from "../../lib/api/useCategory";
import { FiTrash2, FiSave } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
const MCategoryBox = ({ data }) => {
    const [editOn, seteditOn] = useState(true);
    const editClick = () => {
        seteditOn(!editOn);
    };
    const { mutate: deleteCategory } = useDeleteCategory();
    const deleteClick = (id) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            deleteCategory(id);
        }
    };

    const [editInput, setEditInput] = useState();
    const { mutate: updateCategory } = useUpdateCategory();
    const updateClick = (id) => {
        const enteredData = {
            categoryName: editInput,
        };
        updateCategory(id, enteredData);
    };
    const updateHandler = async (categoryNum) => {
        const enteredData = {
            categoryName: editInput,
        };
        try {
            await axiosInstance.patch(`/category/${categoryNum}`, enteredData);
            console.log("updated successfully!");
            window.location.reload();
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    return editOn ? (
        <Categoryli>
            {data.categoryName}
            <span>
                {editOn ? (
                    <RiEdit2Fill
                        onClick={() => editClick(data.categoryId)}
                        className="icon first_icon"
                        size={20}
                        color="rgba(174, 174, 178, 1)"
                    />
                ) : (
                    <FiSave
                        onClick={() => updateHandler(data.categoryId)}
                        className="icon first_icon"
                        size={20}
                        color="rgba(174, 174, 178, 1)"
                    />
                )}

                <FiTrash2
                    onClick={() => deleteClick(data.categoryId)}
                    className="icon"
                    size={20}
                    color="rgba(253, 169, 79, 1)"
                />
            </span>
        </Categoryli>
    ) : (
        <InputBox>
            <CategoryInput placeholder={data.categoryName} onChange={(e) => setEditInput(e.target.value)} />
            <span>
                {editOn ? (
                    <RiEdit2Fill
                        onClick={() => editClick(data.categoryId)}
                        className="icon first_icon"
                        size={20}
                        color="rgba(174, 174, 178, 1)"
                    />
                ) : (
                    <FiSave
                        onClick={() => updateHandler(data.categoryId)}
                        className="icon first_icon"
                        size={20}
                        color="rgba(174, 174, 178, 1)"
                    />
                )}

                <FiTrash2
                    onClick={() => deleteClick(data.categoryId)}
                    className="icon"
                    size={20}
                    color="rgba(253, 169, 79, 1)"
                />
            </span>
        </InputBox>
    );
};

export default MCategoryBox;
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
    font-weight: 600;
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
const InputBox = styled.div`
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;

    span {
        position: absolute;
        top: 10px;
        right: 20px;
        .icon {
            cursor: pointer;
        }
        .first_icon {
            margin-right: 10px;
        }
        z-index: 10;
    }
`;
const CategoryInput = styled.input`
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 30px;
    padding: 0 20px;
    border: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.Gray_050};
`;
