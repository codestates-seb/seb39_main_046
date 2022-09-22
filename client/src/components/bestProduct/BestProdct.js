import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/button/Button";

const BestProdct = () => {
  let more = "더보기 >";
  const completionWord = "Pick your Best 5";
  const [Title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTitle((prevTitleValue) => {
        let result = prevTitleValue
          ? prevTitleValue + completionWord[count]
          : completionWord[0];
        setCount(count + 1);
        if (count >= completionWord.length) {
          setCount(0);
          setTitle("");
        }
        return result;
      });
    }, 300);

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <BestProdctContainer>
      <Firstcontent>
        <Updiv>
          <div></div>
          <PickyPicky>{Title}</PickyPicky>
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
    </BestProdctContainer>
  );
};

export default BestProdct;

const BestProdctContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.Blue_010};
  margin-bottom: 50px;
  height: 1100px;
`;
const Firstcontent = styled.div`
  padding-top: ${({ theme }) => theme.paddings.xxxl};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Updiv = styled.div`
  width: 1180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;
`;
const PickyPicky = styled.p`
  text-align: center;
  line-height: 77px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  color: ${({ theme }) => theme.colors.Gray_030};
  line-height: 160%;
  padding-left: 50px;
`;

const More = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.Orange_040};
  cursor: pointer;
`;
const Middlediv = styled.div`
  margin-top: 30px;
  margin-bottom: 80px;
  Button {
    margin-right: 20px;
  }
  Button:last-child {
    margin-right: 0px;
  }
`;

const Bottomdiv = styled.div`
  display: flex;
  justify-content: center;
`;

const First = styled.div`
  width: 590px;
  height: 590px;
  margin-right: ${({ theme }) => theme.margins.base};
  border-radius: ${({ theme }) => theme.radius.base};
  box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
  background-color: #fff;
`;
const Another = styled.div`
  width: 605px;
  display: flex;
  flex-wrap: wrap;
`;

const ProductImg = styled.section`
  width: 590px;
  height: 472px;
  display: flex;
  background: url("/character/상품준비 안됫음 .png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
`;
const ProductExp = styled.section`
  width: 590px;
  height: 118px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
  border-radius: 0 0 20px 20px;
  background-color: #fff;
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
  margin-right: ${({ theme }) => theme.margins.base};
  margin-bottom: ${({ theme }) => theme.margins.base};
`;
const SecondImg = styled.section`
  width: 290px;
  height: 232px;
  display: flex;
  background: url("/character/상품준비 안됫음 .png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`;
const SecondExp = styled.section`
  width: 290px;
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 30px rgba(204, 204, 204, 0.5);
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
