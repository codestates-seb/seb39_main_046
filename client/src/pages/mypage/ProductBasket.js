import React from "react";
import styled from "styled-components";
import DropDown from "../../components/common/dropDown/DropDown";
import TabSquare from "../../components/common/tab/TabSquare";
import ProductBox from "../../components/common/product/ProductBox";
import BasketChracter from "../../assets/images/userinfo/BasketTitle.svg";
import Paging from "../../components/common/pagination/Paging";
const ProductBasket = () => {
  return (
    <>
      <Rcontainer>
        <RHearderBox></RHearderBox>
        <RMainBox>
          <h2>
            <strong>리코</strong>님의 찜꽁바구니
            <div className="basket-chracter">
              <img src={BasketChracter} alt="찜꽁바구니 캐릭터" />
            </div>
          </h2>
          <TabSquare />
          <div className="likebtn">
            <DropDown />
          </div>
          <section className="productContainer">
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
            <ProductBox className="itemgrid" />
          </section>
        </RMainBox>
        <PaginationBox>
          <Paging />
        </PaginationBox>
      </Rcontainer>
    </>
  );
};

export default ProductBasket;
const Rcontainer = styled.section`
  text-align: center;
`;
const RHearderBox = styled.header`
  width: 100%;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.Blue_010};
  padding: 65px;
`;

/* 본문 */
const RMainBox = styled.main`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 90px;
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
