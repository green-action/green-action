import { useResponsiveStore } from "@/app/_store/responsiveStore";
import { debounce } from "@/utils/debounce/debounce";
import { useEffect } from "react";

export const useResponsive = () => {
  const setWindowSize = useResponsiveStore((state) => state.setWindowSize);
  const debounceDelay = 1000;
  useEffect(() => {
    // (화살표함수는 this 바인딩을 생략하기 때문에 function기본형 함수 써야함)
    const handleDebouncedResize = debounce(() => {
      setWindowSize(window.innerWidth);
    }, debounceDelay);

    // 디바운스된 함수를 사용하여 이벤트 리스너를 추가합니다
    window.addEventListener("resize", handleDebouncedResize);

    // 초기에 한 번 handleResize를 호출하여 초기 창 크기를 설정합니다
    handleDebouncedResize();

    // 정리 함수
    return () => {
      window.removeEventListener("resize", handleDebouncedResize);
    };
  }, [setWindowSize]);

  const resultObj = useResponsiveStore((state) => {
    return {
      isDesktop: state.isDesktop,
      isLaptop: state.isLaptop,
      isMobile: state.isMobile,
    };
  });

  return resultObj;
};
