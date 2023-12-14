import React from "react";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Row from "../../components/Row";
import styled from "styled-components";
import Nav from "../../components/Nav";
import requests from "../../api/request";

const MainPage = () => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="이번 주 트렌드" id="TN" fetchUrl={requests.trending} />
      <Row title="한국 Top" id="TR" fetchUrl={requests.topRated} />
      <Row title="Comedy" id="CM" fetchUrl={requests.comedyMovies} />
      <Row title="Scifi" id="SCM" fetchUrl={requests.sciFiMovies} />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
