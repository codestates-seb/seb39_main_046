import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const BestProdct = () => {
  let more = "더보기 >";

  return (
    <>
      <Firstcontent>
        <Updiv>
          <div></div>
          <PickyPicky>Pick your Best 5</PickyPicky>
          <More>{more}</More>
        </Updiv>
        <Middlediv>
          <Button>전체 편의점</Button>
          <Button>GS25</Button>
          <Button>CU</Button>
          <Button>7-Eleven</Button>
        </Middlediv>
        <Bottomdiv>
          <First>
            <ProductImg>
              <Numbering>1</Numbering>
            </ProductImg>
            <ProductExp>
              <ProductNaming>product name</ProductNaming>
              <ProductPrice>5,300원</ProductPrice>
            </ProductExp>
          </First>
          <Another>
            <Second>
              <SecondImg>
                <Numbering>2</Numbering>
              </SecondImg>
              <SecondExp>
                <ProductNaming>product name</ProductNaming>
                <ProductPrice>5,300원</ProductPrice>
              </SecondExp>
            </Second>
            <Second>
              <SecondImg>
                <Numbering>3</Numbering>
              </SecondImg>
              <SecondExp>
                <ProductNaming>product name</ProductNaming>
                <ProductPrice>5,300원</ProductPrice>
              </SecondExp>
            </Second>
            <Second>
              <SecondImg>
                <Numbering>4</Numbering>
              </SecondImg>
              <SecondExp>
                <ProductNaming>product name</ProductNaming>
                <ProductPrice>5,300원</ProductPrice>
              </SecondExp>
            </Second>
            <Second>
              <SecondImg>
                <Numbering>5</Numbering>
              </SecondImg>
              <SecondExp>
                <ProductNaming>product name</ProductNaming>
                <ProductPrice>5,300원</ProductPrice>
              </SecondExp>
            </Second>
          </Another>
        </Bottomdiv>
      </Firstcontent>
    </>
  );
};

export default BestProdct;

const Firstcontent = styled.div`
  margin-bottom: 100px;
`;

const Updiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 78px;
`;

const Middlediv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme }) => theme.paddings.xxxl};
`;

const Bottomdiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const PickyPicky = styled.span`
  text-align: center;
  line-height: 77px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  line-height: 160%;
  padding-left: 50px;
`;

const More = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.Orange_040};
  float: rigth;
`;

const First = styled.div`
  width: 590px;
  height: 590px;
  margin-right: ${({ theme }) => theme.margins.base};
`;
const Another = styled.div`
  width: 590px;
  height: 590px;
  display: flex;
  flex-wrap: wrap;
`;

const ProductImg = styled.section`
  width: 590px;
  height: 472px;
  display: flex;
  background: url('/Character/상품준비 안됫음 .png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% 80%;
`;
const ProductExp = styled.section`
  width: 590px;
  height: 118px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductNaming = styled.p`
  padding-left: 40px;
  color: ${({ theme }) => theme.colors.Gray_090};
  font-weight: 700;
`;
const ProductPrice = styled.p`
  padding-right: 40px;
  color: ${({ theme }) => theme.colors.Gray_030};
  font-weight: 700;
`;

const Second = styled.section`
  /* margin-right: ${({ theme }) => theme.margins.base};
    margin-bottom: ${({ theme }) => theme.margins.base}; */
`;
const SecondImg = styled.section`
  width: 290px;
  height: 232px;
  display: flex;
  background: url('/Character/상품준비 안됫음 .png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70% 70%;
`;
const SecondExp = styled.section`
  width: 290px;
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Numbering = styled.p`
  color: ${({ theme }) => theme.colors.Blue_050};
  width: 21px;
  height: 36px;
  font-size: 30px;
  font-weight: 500;
  padding-top: 30px;
  padding-left: 30px;
`;
