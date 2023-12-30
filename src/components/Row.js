import axios from "../api/axios";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import "./row.css";
import Modal from "./Modal";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Row({ title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [select, setSelect] = useState({});

  // useCallback()
  // 1. 렌더링 될때마다 컴터 성능 저하 방지
  // 2. 자식 컴포넌트 콜백함수를 부모한테 줄 때
  const fetchMoiveData = useCallback(async () => {
    // 데이터 불러오기
    const response = await axios.get(fetchUrl);
    // console.log(response);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMoiveData();
  }, [fetchMoiveData]);

  const click = (movie) => {
    setOpenModal(true);
    setSelect(movie);
  };

  // 클릭 시 이동.
  // scrollLeft +/- 픽셀 수 = 기준점 +/-
  // 픽셀만큼 이동을 하겠다.

  // innerWidth : 뷰포트의 전체 너비

  return (
    <>
      <div>{title}</div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        navigation // 에로우바 사용할건가 말건가.
        pagination={{ clickable: true }} // 밑에 작은 동그라미로 현재 위치 표시.
        breakpoints={{
          1920: {
            slidesPerView: 6,
            slidesPerGruop: 6,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGruop: 5,
          },
          860: {
            slidesPerView: 4,
            slidesPerGruop: 4,
          },
          600: {
            slidesPerView: 3,
            slidesPerGruop: 3,
          },
        }}
      >
        <Content id={id}>
          {movies.map((movie) => (
            <SwiperSlide>
              <Wrap>
                {/* 한줄에 여러개 나오게 */}
                <img
                  key={movie.id}
                  // className="row__poster"
                  src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                  alt={movie.title}
                  onClick={() => {
                    click(movie);
                  }}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>

      {openModal && <Modal {...select} openModal={setOpenModal} />}
    </>
  );
}

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div``;

const Wrap = styled.div`
  width: 95%;
  heigth: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgba(0 0 0/69%) 0px 26px 30px -10px,
    rgba(0 0 0/73%) 0px 16px 10px -10px;
  cursor: pointer;
  overlfow: hidden;
  transition: all 250ms cubic-bezier(0.25, 0.46, 045, 0.94);
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out;
    z-index: 1;
  }

  &:hover {
    box-shadow: rgba(0 0 0 /80%) 0px 40px 58px -16px,
      rgba(0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(0.95);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
