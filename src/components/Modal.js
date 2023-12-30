import React, { useRef } from "react";
import "./Row";
import "./modal.css";
import useOnClickOutside from "../Hooks/useOnClickOutside";

const Modal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  openModal,
}) => {
  const myref = useRef(); // 위치만 표시.
  useOnClickOutside(myref, () => openModal(false));

  // console.log("ref", ref.current); //ref 확인.

  return (
    <div className="container" role="presentation">
      <div className="wrap-modal">
        <div className="modal" ref={myref}>
          <span onClick={() => openModal(false)} className="close">
            X
          </span>
          <img
            className="modal_img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-img"
          />
          <div className="modalContent">
            <p className="modalDetail">
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modalTitle">{title ? title : name}</h2>
            <p className="modaloverview">평점 :{vote_average}</p>
            <p className="modaloverview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// 1. 클릭했을 때, 모달창 영역 안 / 밖 구분시키기.
// ---> useRef()
// = Ref의 current의 특정 DOM을 가르킨다. (콘솔로 확인 해보기.)
// = 클래스형
// export default class Hello {
// constructor (props) {
// super (props) ;
// this.helloRef = React.createRef()
// ｝
// render () {
//  return (
// <div ref={helloRef}></div>
// )
// }
// }
// = 함수형
// export default function HEllo() {
//   const helloRef = useRef (null);
//   return (
//   ‹div ref={helloRef}></div>

// 자바스크립트에선 getElementById, querySelector... 과 유사.

// 1. 클릭한 곳 어딘지 구분.
// 2. react hook에서 (구분시키는 훅) 해당 내용 작성.
// 3. 모달창을 클릭시 함수 호출하기 (callback 함수) => 이벤트 등록
// 4. Callback 함수안에 모달 닫아주기 내용 넣기.
