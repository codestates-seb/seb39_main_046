import React from 'react';
import styled from 'styled-components';
import PersonalInfo from '../../components/myPage/PersonalInfo';
import ProductBasket from '../../components/myPage/ProductBasket';
import PbtiBanner from '../../components/myPage/PbtiBanner';
import PersonalRivew from '../../components/myPage/PersonalRivew';

const Mypage = () => {
    return (
        <div>
            {/* <Exper> */}
            <PersonalInfo/>
            <ProductBasket/>
            <PbtiBanner/>
            <PersonalRivew/>
            {/* </Exper> */}
        </div>
    );
};

// const Exper = styled.div`
//     margin-left: 311px;
//     margin-right:311px;
// `

export default Mypage;