import { useCallback, useEffect } from "react";
import { useResponsive } from "@/app/_hooks/responsive";
import _ from "lodash";

import type { MainTextProps } from "@/app/_types/main/mainpage";

const MainTextSection: React.FC<MainTextProps> = ({
  position,
  setPosition,
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // parallax scroll
  const onScroll = useCallback(
    _.throttle(() => {
      setPosition(window.scrollY);
    }, 100),
    [_],
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      style={{ transform: `translateY(-${position / 30}vh` }}
      className="z-0 flex flex-col w-full desktop:h-[500px] laptop:h-[100px] phone:h-[400px] justify-center items-center desktop:mt-[200px] laptop:mt-[250px] phone:mt-[40px] text-white"
    >
      {(isDesktop || isLaptop) && (
        <>
          <p className="text-center h-[390px] desktop:text-[80pt] laptop:text-[50pt] w-full  font-['Italiana'] ">
            First step for green life,
            <span className="desktop:mt-[-30px] laptop:mt-[-20px] block">
              soom
            </span>
          </p>
          <p className="text-center font-extralight desktop:text-[20px] laptop:text-[14.6px] font-['Pretendard'] desktop:mt-[0px] laptop:mt-[60px]">
            지구와 함께 숨쉬다
            <br />
            SOOM과 함께 일상의 그린 라이프를 경험하세요
          </p>
        </>
      )}
      {isMobile && (
        <>
          <p className="text-center vh-auto text-[34px] w-full font-['Italiana'] mb-[10px]">
            Fist step for green life,
            <span className="block">soom</span>
          </p>
          <p className="text-center font-extralight text-[9pt] font-['Pretendard'] mt-[40px]">
            지구와 함께 숨쉬다
            <br />
            SOOM과 함께 일상의 그린 라이프를 경험하세요
          </p>
        </>
      )}
    </section>
  );
};

export default MainTextSection;
