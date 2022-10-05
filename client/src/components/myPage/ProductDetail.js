import React from "react";
import styled from "styled-components";
import TabSquare from "../common/tab/TabSquare";
import DropDown from "../common/dropDown/DropDown";
import MyproductDetail from "../common/pagination/myPage/MyproductDetail";
import { useQuery, useQueryClient } from "react-query";
import useStore from "../../lib/store";
import PersonalProducts from "./PersonalProducts";
import axiosInstance from "../../utils/axiosInastance";
import { useEffect } from "react";
import Loading from "../common/loading/Loading";

const GetJJimdata = async (categoryNum, sortNum, companyName, pageNum, logInfo) => {
    const { data } = await axiosInstance.get(
        `/product/allHeartProducts/14/${sortNum}?company=${companyName}&page=${pageNum}`,
    );
    return data;
};



const ProductDetail = ({ Persondata }) => {
    const { logInfo, isStoreTab, isProductDetail, isCategoryTab, isSortNum } = useStore();
    const method = isSortNum;

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery(["DetailProducts", isCategoryTab, method, isStoreTab, isProductDetail], () =>
            GetJJimdata(isCategoryTab, method, isStoreTab, isProductDetail, logInfo),
        );
    }, [isCategoryTab, method, isStoreTab, isProductDetail, queryClient, logInfo]);

    const { data, isLoading, isFetching } = useQuery(
        ["DetailProducts", isCategoryTab, method, isStoreTab, isProductDetail],
        () => GetJJimdata(isCategoryTab, method, isStoreTab, isProductDetail, logInfo),
        {
            staleTime: 2000,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    );

    if (isLoading) return <h3> 로딩중 </h3>;
    if (isFetching) {
        return <Loading />;
    }

    return (
        <>
            <RMainBox>
                {/* <h2>
                    <strong> {Persondata.nickName} </strong>님의 찜꽁바구니
                    <div className="basket-chracter">
                        <img src={BasketChracter} alt="찜꽁바구니 캐릭터" />
                    </div>
                </h2> */}
                <TabSquare />
                <div className="likebtn">
                    <DropDown />
                </div>
                <section className="productContainer">
                    {" "}
                    {data.data &&
                        data.data.map((data, idx) => {
                            return <PersonalProducts key={idx} data={data} />;
                        })}
                </section>
            </RMainBox>
            <PaginationBox>
                <MyproductDetail pageInfo={data} />
            </PaginationBox>
        </>
    );
};

export default ProductDetail;

const RMainBox = styled.main`
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 90px;
    text-align: center;
    h2 {
        position: relative;
        text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        color: ${({ theme }) => theme.colors.Gray_090};
        margin-bottom: 30px;
        font-weight: bold;
        margin-bottom: 70px;
        strong {
            color: ${({ theme }) => theme.colors.Blue_030};
        }
    }
    .basket-chracter {
        position: absolute;
        top: 41px;
        left: -140px;
    }
    .productContainer {
        max-width: 1060px;
        width: 100%;
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
    }
    .likebtn {
        width: 1000px;
        text-align: right;
    }
`;

const PaginationBox = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
`;
