import { useEffect } from "react";
import { useResponsiveStore } from "@/app/_store/responsiveStore";

export const useResponsive = () => {
  const setWindowSize = useResponsiveStore((state) => state.setWindowSize);

  useEffect(() => {
    // (화살표함수는 this 바인딩을 생략하기 때문에 function기본형 함수 써야함)
    function handleResize() {
      console.log("리사이즈가 동작하고 있습니다.");

      // 여기에 set~~ 코드 삽입
      setWindowSize(window.innerWidth);
    }

    // window에 이벤트 등록 (browser가 기본적으로 갖고있는 이벤트 중 하나 "resize")
    // resize가 일어날때 handleResize 함수가 동작함
    // (리액트에서 윈도우 사이즈 실시간으로 재는 기능 제공하는지 몰라 js문법 사용)
    window.addEventListener("resize", handleResize);

    handleResize();

    // cleanup 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowSize]);

  // (기존에 zustand에서 가져오는 방식 예시)
  //   const isDesktop = useResponsiveStore((state)=>state.isDesktop);

  const resultObj = useResponsiveStore((state) => {
    return {
      isDesktop: state.isDesktop,
      isLaptop: state.isLaptop,
      isMobile: state.isMobile,
    };
  });

  return resultObj;
};
