import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <Container>
      <Header />
      <MainSection>
        <Outlet />
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
  margin: 0 auto;
  max-width: 1280px;
  min-height: 1000px;
  margin-top: 75px;
`;
