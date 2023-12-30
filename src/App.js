import { Outlet, Route, Router, Routes } from "react-router-dom";
// SPA(싱글 페이지 어플리케이션)
import "./App.css";
import requests from "./api/request";
import Nav from "./components/Nav";
import styled from "styled-components";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Row from "./components/Row";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import SearchPage from "./pages/search";
import DetailPage from "./pages/detail";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="main" element={<MainPage />}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="searchMV" element={<SearchPage />}></Route>
        </Route>
      </Routes>
      {/* <Nav />
      <Banner />
      <Category />
      <Row title="Top" id="TR" fetchUrl={requests.topRated} />
      <Row title="Action" id="AM" fetchUrl={requests.actionMovies} />
      <Row title="Comedy" id="CM" fetchUrl={requests.comedyMovies} />
      <Row title="Horror" id="HM" fetchUrl={requests.horrorMovies} />
      <Row title="Romance" id="RM" fetchUrl={requests.romanceMovies} /> */}
    </Container>
  );
}

export default App;

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

// 2023.12.21
// params 이용해서 만들 예정.
// movie id 받은 걸 가지고 해당 영화 데이터 받고 -> 이미지를 보여주게 하겠음.
// UseLocation()
// localhost:3000/search?q=Papago => ?q=Papago

// SearchParams()
// ?q=Papago => Papago

// 디테일 페이지 => http://localhost:3000/1726 => 1726 (useParams)
// => 영화 데이터 받고 이미지를 받아 보여줌.
