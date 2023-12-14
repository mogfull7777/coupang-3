import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  // useLocation() : 현재 사용하는 URL 정보를 가져오는 기능.
  console.log("pathname", pathname);
  // const [search, setSearch] = useState(""); ==>
  const [inputValue, setInputValue] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log("e.target.value");

    navi(`/searchMV?q=${e.target.value}`);
  };

  // console.log("useLocation", useLocation().search);

  // q input 입력했던 값을 전달받게된다.

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Coupang Play Logo"
          src="/images/cplogowhite.svg"
          onClick={() => (window.location.href = "/")}
        ></img>
      </Logo>

      {pathname === "/" ? (
        <Login>Login</Login> // 맞으면 로그인창.
      ) : (
        <Input
          value={inputValue}
          onChange={handleChange}
          className="nav_input"
          type="text"
          placeholder="Search"
        />
      )}
    </NavWrapper>
  );
};

export default Nav;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  transition: all 0, 2s ease 0;

  &:hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin=top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

// useLocation
// useNavigate 페이지 경로를 넣어서 해당 경로로 이동 하는 걸 도와줌, 특정 이벤트 실행 -> 동작
// useNavigate import -> 변수에 반환해서 넣기 -> 해당 주소값 URL과 연결
