import React from "react";
import styled from "styled-components";

import Reivew1 from "../../assets/images/main/Review-1.png";
import Review2 from "../../assets/images/main/Review-2.png";
import Review3 from "../../assets/images/main/Review-3.png";
import Review4 from "../../assets/images/main/Review-4.png";
import Review5 from "../../assets/images/main/Review-5.png";

import HeartButton from "../../components/common/button/HeartButton";
import Pencil from "../../assets/images/controlimag/Pencil.png";
import TrashBox from "../../assets/images/controlimag/trashbox.png";

const PersonalRivew = () => {
  const userName = "리코";
  const productName = "상품명";
  const productInfo =
    "난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다난할수있다";
  const create_At = "1986.06.28";

  return (
    <Maindive>
      <TitleDiv>
        <UserName>
          {userName}
          <Welcome>님이 남긴 리뷰</Welcome>
        </UserName>
      </TitleDiv>
      <Productbox>
        <ProductsRivewdiv>
          <span>
            <HeartButton />
          </span>
          <img src={Reivew1} alt="리뷰 1"></img>
          <div className="Productex">
            <h4>{productName}</h4>
            <p>{productInfo}</p>
          </div>
          <Productex2>
            <img src={Pencil} alt="수정버튼"></img>
            <img src={TrashBox} alt="삭제버튼"></img>
            <div className="creatt_at">{create_At}</div>
          </Productex2>
        </ProductsRivewdiv>
        <ProductsRivewdiv>
          <span>
            <HeartButton />
          </span>
          <img src={Review2} alt="리뷰 1"></img>
          <div className="Productex">
            <h4>{productName}</h4>
            <p>{productInfo}</p>
          </div>
          <Productex2>
            <img src={Pencil} alt="수정버튼"></img>
            <img src={TrashBox} alt="삭제버튼"></img>
            <div className="creatt_at">{create_At}</div>
          </Productex2>
        </ProductsRivewdiv>
        <ProductsRivewdiv>
          <span>
            <HeartButton />
          </span>
          <img src={Review3} alt="리뷰 1"></img>
          <div className="Productex">
            <h4>{productName}</h4>
            <p>{productInfo}</p>
          </div>
          <Productex2>
            <img src={Pencil} alt="수정버튼"></img>
            <img src={TrashBox} alt="삭제버튼"></img>
            <div className="creatt_at">{create_At}</div>
          </Productex2>
        </ProductsRivewdiv>
        <ProductsRivewdiv>
          <span>
            <HeartButton />
          </span>
          <img src={Review4} alt="리뷰 1"></img>
          <div className="Productex">
            <h4>{productName}</h4>
            <p>{productInfo}</p>
          </div>
          <Productex2>
            <img src={Pencil} alt="수정버튼"></img>
            <img src={TrashBox} alt="삭제버튼"></img>
            <div className="creatt_at">{create_At}</div>
          </Productex2>
        </ProductsRivewdiv>
        <ProductsRivewdiv>
          <span>
            <HeartButton />
          </span>
          <img src={Review5} alt="리뷰 1"></img>
          <div className="Productex">
            <h4>{productName}</h4>
            <p>{productInfo}</p>
          </div>
          <Productex2>
            <img src={Pencil} alt="수정버튼"></img>
            <img src={TrashBox} alt="삭제버튼"></img>
            <div className="creatt_at">{create_At}</div>
          </Productex2>
        </ProductsRivewdiv>
      </Productbox>
    </Maindive>
  );
};

const Maindive = styled.div`
  padding-bottom: 100px;
`;

const TitleDiv = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;
const Productbox = styled.section`
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.Blue_040};
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
  line-height: 160%;
`;
const Welcome = styled.span`
  color: ${({ theme }) => theme.colors.Gray_090};
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: 700;
  line-height: 160%;
`;

const ProductsRivewdiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220px;
  margin-right: 25px;

  img {
    border-radius: 20px;
    width: 235px;
  }
  span {
    position: absolute;
    right: 2px;
    top: 5px;
    z-index: 2;
  }
  h4 {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.Gray_090};
    font-weight: 700;
  }
  p {
    padding-bottom: ${({ theme }) => theme.paddings.base};
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.Gray_060};
    height: 80px;
    font-weight: 400;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .Productex {
    width: 100%;
    text-align: left;
  }
  /* .controlbox{
        width:100%;
        img{            
            width:15px;
            height:15px;
            margin-top:${({ theme }) => theme.margins.base};
            margin-right:${({ theme }) => theme.margins.base};
        }
        .creatt_at{
            text-align:left;
        }
    } */
`;
const Productex2 = styled.div`
  width: 100%;
  display: flex;
  img {
    width: 17px;
    height: 17px;
    margin-top: ${({ theme }) => theme.margins.base};
    margin-right: ${({ theme }) => theme.margins.base};

    cursor: pointer;
  }
  .creatt_at {
    padding-top: 9px;
    margin-left: 80px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.Gray_030};
    float: left;
    text-align: right;
  }
`;

export default PersonalRivew;
