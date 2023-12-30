import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  let { movieId } = useParams(); // url의 파라미터 값 호출.
  console.log("movie Id", movieId); // ---> movie id 호출 확인.

  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/movie/${movieId}`);
      console.log("response", response); // response 확인.

      // 화면 렌더링 정보를 어디에다가 넣어줘야 할까?
      setMovie(response.data); // setMovie에 넣어줘야 한다.
      console.log("img", movie.backdrop_path);
    }
    getData();
  }, [movieId]);

  // 영화값이 없다면???
  if (!movie) {
    return null;
  }

  return (
    <section>
      <img
        className="modal_posterimg"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="image"
      />
    </section>
  );
};

export default DetailPage;
