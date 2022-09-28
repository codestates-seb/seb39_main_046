import React from "react";
import styled from "styled-components";

import MyLikeReviewContain from "./MyLikeReviewContain";
import Paging from "../common/pagination/Paging";

const MyLikeReview = ({Infodata, InfolikeRives}) => {
  const userName = Infodata.nickName;
  console.log(InfolikeRives.data);

  return (
    <Maindiv>
      <PageSection>
        <PageTtitle>
          <span>{userName}</span>
          <span>님이 찜꽁한 리뷰</span>
        </PageTtitle>
        <RivewSection>
          {InfolikeRives.data && InfolikeRives.data.map((data, idx) =>{
            return(
              <MyLikeReviewContain key={idx} data={data}/>
            )
          })}          
        </RivewSection>
        <Pagibox>
          <Paging/>
        </Pagibox>
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
  }
`;

const Pagibox = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
`
