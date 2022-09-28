import React from "react";
import styled from "styled-components";
import RivesBundle from "./RivesBundle";
import Paging from "../common/pagination/Paging";
// import { useMypage } from "../../lib/api/useMypage";

const PersonalRivew = (Infodata, InfoRives) => {
    // const {myReviews} = useMypage();
    const userName = Infodata.nickName;
    console.log(InfoRives);
    return (
        <Maindive>
            <TitleDiv>
                <UserName>
                    {userName}
                    <Welcome>님이 남긴 리뷰</Welcome>
                </UserName>
            </TitleDiv>
            <Productbox>
                {InfoRives.data &&
                    InfoRives.data.map((data, idx) => {
                        return <RivesBundle key={idx} data={data} />;
                    })}
            </Productbox>
            <Pagibox>
                <Paging />
            </Pagibox>
        </Maindive>
    );
};

export default PersonalRivew;

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

const Pagibox = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
`;
