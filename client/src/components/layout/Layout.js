import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Scroll from "../common/scroll/ScrollToTopBtn";

const Layout = () => {
    const handleScroll = (e) => {
        if (!window.scrollY) return;

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <Container>
            <Header />
            <MainSection>
                <Outlet />
                <Scroll handleClick={handleScroll} />
            </MainSection>
            <Footer />
        </Container>
    );
};

export default Layout;
const Container = styled.div`
    width: 100%;
    height: 100%;
`;
const MainSection = styled.section`
    max-width: 100%;
    min-height: 500px;
    margin-top: 75px;
`;
