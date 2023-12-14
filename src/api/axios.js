import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.themoviedb.org/3",
  params: {
    api_key: "afbd197cf520601aadb1490158d72dac",
    language: "ko-KR",
  },
});

export default instance;
