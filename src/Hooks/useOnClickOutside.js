import React, { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // console.log("event", event.target); // 타게팅 확인.
      if (!ref.current || ref.current.contains(event.target)) {
        // 만약 ref가 current가 아니거나 (모달창이 아니거나) ||
        // 모달창을 클릭할 때 타겟이 뜬다면(해당 이벤트가 발생하면)
        return;
      }
      handler(event);
      // 함수 작동.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// wrap-modal을 클릭시 false값 변환.
