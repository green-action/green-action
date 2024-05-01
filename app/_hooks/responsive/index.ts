import { useResponsiveStore } from "@/app/_store/responsiveStore";
import { debounce } from "@/utils/debounce/debounce";
import { useEffect } from "react";

export const useResponsive = () => {
  const setWindowSize = useResponsiveStore((state) => state.setWindowSize);
  const debounceDelay = 1000;
  useEffect(() => {
    const handleDebouncedResize = debounce(() => {
      setWindowSize(window.innerWidth);
    }, debounceDelay);

    window.addEventListener("resize", handleDebouncedResize);

    handleDebouncedResize();

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
