import React from "react";
import styled from "styled-components";

const Banner = (props) => {
    return <BContainer>{props.children}</BContainer>;
};

export default Banner;

const BContainer = styled.section`
    max-width: 1280px;
    height: 260px;
    padding: 80px;
    margin: 0 auto;
`;
