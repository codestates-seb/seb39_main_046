import React from 'react';
import styled from 'styled-components';

const PersonalInfo = () => {

    let userName = "리코";
    let welcommsg = " 님, 안녕하세요 :(";


    return (
        <TopDiv>
            <UserInfo>
                <Titlediv>
                    <UserName>{userName}</UserName>
                    <Welcome>{welcommsg}</Welcome>
                </Titlediv>

            </UserInfo>
        </TopDiv>
    );
};

export default PersonalInfo;

const TopDiv = styled.div `
    display: flex;
    justify-content:center;
    align-items:center;
`
const UserInfo = styled.div `
    margin-top: 30px;
    width:900px;
    height: 500px;
    border: 1px solid red;
`
const Titlediv = styled.div`
    margin-top:48px;
    border: 1px solid red;
    text-align:center;
`
const UserName = styled.span`
    color: ${({ theme }) => theme.colors.Blue_040};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight: 700;
    line-height:160%;
`

const Welcome = styled.span`
    color: ${({ theme }) => theme.colors.Gray_050};
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    font-weight:700;
    line-height:160%;
`




