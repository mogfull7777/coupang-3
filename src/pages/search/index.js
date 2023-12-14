import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../Hooks/useDebounce";

const SearchPage = () => {
  const [searchMV, setSearchMV] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  const navigate = useNavigate();
  // debounce 연결
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMV(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMV = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/searchMV/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchMV(response.data.results);
      console.log("response", response);
    } catch (err) {}
  };

  if (searchMV.length > 0) {
    return (
      <section className="search-container">
        {searchMV.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb/org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie_poster_column"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movieposter"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="noresult">
        <div className="noresultText">
          <p> 해당 되는 '{searchTerm}'은(는) 없습니다. </p>
        </div>
      </section>
    );
  }
};

export default SearchPage;

// Debounce : 사용자가 미리 결정된 시간 동안 타이핑 하는 걸 멈출 때 까지 keyup 이벤트 처리 지연.
// ex : 검색어에 'spy'를 치려 할때 s만 입력했는데 관련 정보를 다 받아오려는 것을 방지.
