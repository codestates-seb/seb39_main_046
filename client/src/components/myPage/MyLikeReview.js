import React from "react";
import styled from "styled-components";

import Noimg from "../../assets/images/userinfo/Noimg.png";
import HeartButton from "../common/button/HeartButton";

const MyLikeReview = () => {
  const userName = "리코";
  const explanation =
    "할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어할수있어";
  const create_At = "1986.06.28";

  return (
    <Maindiv>
      <PageSection>
        <PageTtitle>
          <span>{userName}</span>
          <span>님이 찜꽁한 리뷰</span>
        </PageTtitle>
        <RivewSection>
          <div className="Productinformation">
            <img src={Noimg} alt="이미지 없음" />
            <section className="contents-box">
              <div className="title">
                <div className="productName">상품명</div>
                <span>
                  <HeartButton />
                </span>
              </div>
              <Productsulmung>
                <p>{explanation}</p>
              </Productsulmung>
              <CreateAt>{create_At}</CreateAt>
            </section>
          </div>
          <div className="Productinformation">
            <img src={Noimg} alt="이미지 없음" />
            <section className="contents-box">
              <div className="title">
                <div className="productName">상품명</div>
                <span>
                  <HeartButton />
                </span>
              </div>
              <Productsulmung>
                <p>{explanation}</p>
              </Productsulmung>
              <CreateAt>{create_At}</CreateAt>
            </section>
          </div>
          <div className="Productinformation">
            <img src={Noimg} alt="이미지 없음" />
            <section className="contents-box">
              <div className="title">
                <div className="productName">상품명</div>
                <span>
                  <HeartButton />
                </span>
              </div>
              <Productsulmung>
                <p>{explanation}</p>
              </Productsulmung>
              <CreateAt>{create_At}</CreateAt>
            </section>
          </div>
          <div className="Productinformation">
            <img src={Noimg} alt="이미지 없음" />
            <section className="contents-box">
              <div className="title">
                <div className="productName">상품명</div>
                <span>
                  <HeartButton />
                </span>
              </div>
              <Productsulmung>
                <p>{explanation}</p>
              </Productsulmung>
              <CreateAt>{create_At}</CreateAt>
            </section>
          </div>
        </RivewSection>
      </PageSection>
    </Maindiv>
  );
};

export default MyLikeReview;

const Maindiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
`;

const PageSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 1280px;
`;

const PageTtitle = styled.div`
  text-align: center;
  margin-bottom: 40px;
  span:first-child {
    font-size: 40px;
    color: ${({ theme }) => theme.colors.Blue_040};
    font-weight: 700;
  }
  span:last-child {
    font-size: 40px;
    color: ${({ theme }) => theme.colors.Gray_090};
    font-weight: 700;
  }
`;
const RivewSection = styled.section`
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  .Productinformation {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-right: ${({ theme }) => theme.margins.base};
    box-shadow: 0px 2px 16px rgba(204, 204, 204, 0.6);
    border-radius: 20px;
    padding: 14px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 20px;
      background-color: ${({ theme }) => theme.colors.Blue_010};
    }
    .contents-box {
    }
    .title {
      display: flex;
      margin-bottom: ${({ theme }) => theme.margins.xl};
      .productName {
        margin-top: 20px;
        width: 350px;
        height: 16px;
        font-size: ${({ theme }) => theme.fontSizes.base};
        color: ${({ theme }) => theme.colors.Gray_090};
        font-weight: 700;
        text-align: left;
      }
      span {
        margin-top: ${({ theme }) => theme.margins.xl};
      }
    }
  }
`;

const Productsulmung = styled.div`
  width: 355px;
  height: 90px;

  p {
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.Gray_050};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
const CreateAt = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.Gray_030};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: right;
`;
