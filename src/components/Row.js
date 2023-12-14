import axios from "../api/axios";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import "./row.css";
import Modal from "./Modal";

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
    console.log(response);
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
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>

        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie.title}
              onClick={() => {
                click(movie);
              }}
            />
          ))}
        </div>

        <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>

      {openModal && <Modal {...select} openModal={setOpenModal} />}
    </>
  );
}

export default Row;

// const Container = styled.div``;

// const Wrap = styled.div`
//   display: flex;
//   position: relative;
//   margin: 15px;
//   overflow: auto;
// `;

// const Title = styled.div`
//   font-weight: bolder;
//   font-size: 20px;
// `;

// const Poster = styled.div`
//   display: flex;

//   width: 300px;
//   height: 150px;

//   img {
//     width: 100%;
//     object-fit: cover;
//     margin-right: 15px;
//     border-radius: 10px;
//   }
// `;

// const ArrowLeft = styled.div`
//   position: fixed;
//   font-size: 30px;
//   font-weight: bolder;
//   top: 50%;
//   left: 30px;
//   transform: translate(-50%, -50%);
//   z-index: 3;
// `;

// const ArrowRight = styled.div`
//   position: fixed;
//   font-size: 30px;
//   font-weight: bolder;
//   top: 50%;
//   right: 30px;
//   transform: translate(-50%, -50%);
//   z-index: 3;
// `;
