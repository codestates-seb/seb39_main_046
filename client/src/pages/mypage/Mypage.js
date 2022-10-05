import React from "react";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInastance";
import store from "../../lib/store";
import PersonalInfo from "../../components/myPage/PersonalInfo";
import ProductBasket from "../../components/myPage/ProductBasket";
import PbtiBanner from "../../components/common/banner/PbtiBanner";
import PersonalRivew from "../../components/myPage/PersonalRivew";
import MyLikeReview from "../../components/myPage/MyLikeReview";
import { useQuery } from "react-query";
import NoReviewTitle from "../../assets/images/userinfo/NoReviewTitle.svg";
import NoLikeTitle from "../../assets/images/userinfo/NoLikeTitle.svg";
import NoBasketTitle from "../../assets/images/userinfo/NoBasketTitle.svg";
import Loading from "../../components/common/loading/Loading";
import { useUserDelete } from "../../lib/api/useLogin";

const Getinfo = (logInfo) => {
    return axiosInstance.get("member/myPage");
};

//12

const Mypage = () => {
    const { logInfo } = store();
    const { mutate: DeleteUser } = useUserDelete();

    const { data, isLoading } = useQuery("infos", () => Getinfo(logInfo), {
        keepPreviousData: true,
        staleTime: 2000,
    });

    if (isLoading) return <Loading />;

    const PersonDelete = () => {
        if (window.confirm("진짜 회원을 탈퇴할거야?")) {
            DeleteUser();
        }
    };

    return (
        <>
            <PersonalInfo Persondata={data.data && data.data} />
            {data.data.jjimProducts === null ? (
                <Nodata>
                    <p>
                        <img src={NoReviewTitle} alt="찜상품이 없어요" />
                    </p>
                    찜상품이 없어요!
                </Nodata>
            ) : (
                <ProductBasket
                    Persondata={data.data && data.data}
                    PersonMyJJimProduct={data.data.jjimProducts && data.data.jjimProducts}
                />
            )}
            <PbtiBanner />
            {data.data.myReviews === null ? (
                <Nodata>
                    내 리뷰가 없어요!
                    <p>
                        <img src={NoBasketTitle} alt="찜상품이 없어요" />
                    </p>
                </Nodata>
            ) : (
                <PersonalRivew
                    Persondata={data.data && data.data}
                    PersonRivew={data.data.myReviews && data.data.myReviews}
                />
            )}
            {data.data.jjimReviews === null ? (
                <Nodata>
                    <p>
                        <img src={NoLikeTitle} alt="찜상품이 없어요" />
                    </p>
                    찜 리뷰가 없어요!
                </Nodata>
            ) : (
                <MyLikeReview
                    Persondata={data.data && data.data}
                    PersonlikeReview={data.data.jjimReviews && data.data.jjimReviews}
                />
            )}
            <MemberDelete onClick={PersonDelete}>
                해당 사이트에서 <span>탈퇴</span>하시려면 이 글을 눌러주세요.
            </MemberDelete>
        </>
    );
};

const Nodata = styled.h2`
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
    }
`;

const MemberDelete = styled.p`
    width: 100%;
    text-align: center;
    margin-top: -60px;
    margin-bottom: 100px;
    color: ${({ theme }) => theme.colors.Gray_030};
    span {
        font-weight: 600;
    }
`;

export default Mypage;
