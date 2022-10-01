import React from "react";
import styled from "styled-components";
import { useParams,useNavigate } from "react-router-dom";
import DProduct from "../../components/productDetail/DProduct";
import DWriteComment from "../../components/productDetail/DWirteComment";
import DComments from "../../components/productDetail/DComments";
import { useQuery } from "react-query";
import Loading from "../../components/common/loading/Loading";
import axiosInstance from "../../utils/axiosInastance";
import { queryKeys } from "../../lib/react-query/constant";



const getDeatilProduct = async (productNum) => {    
    const { data } = await axiosInstance.get(`/product/${productNum}`);
    return data;
};

const DetailProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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


    const ReturnMsg = "< 리스트 돌아가기";
    return (
        <Allcontent>
            <Returndiv>
                <Titlediv>
                    <span onClick={() => navigate("/products")}>{ReturnMsg}</span>
                </Titlediv>
                <Middlecontent>
                    <DProduct data={data.product} />
                    <CommentAreat>
                        <DWriteComment />
                        <DComments />
                    </CommentAreat>
                </Middlecontent>
            </Returndiv>
        </Allcontent>
    );
};

export default DetailProduct;

const Allcontent = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
`;
const Returndiv = styled.div`
    max-width: 1280px;
`;
const Middlecontent = styled.div`
    display: flex;
`;
const CommentAreat = styled.section`
    width: 700px;
    margin-left: 24px;
    border-radius: ${({ theme }) => theme.radius.base};
    background-color: ${({ theme }) => theme.colors.Blue_010};
    padding: 20px;
`;

const Titlediv = styled.section`
    margin-top: 70px;
    margin-bottom: 50px;
    span {
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.Orange_040};
        cursor: pointer;
    }
`;
