import { useResponsive } from "@/app/_hooks/responsive";
import { debounce } from "@/utils/debounce/debounce";
import React, { useCallback, useEffect, useState } from "react";

const MainTextSection = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // parallax scroll
  const [position, setPosition] = useState(0);

  const onScroll = useCallback(
    debounce(() => {
      setPosition(window.scrollY);
    }, 100),
    [debounce],
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
            {/* EXPERIENCE A NEW WAY OF */}
            First step for green life,
            <span className="desktop:mt-[-30px] laptop:mt-[-20px] block">
              soom
            </span>
          </p>
          <p className="text-center desktop:text-[15pt] laptop:text-[11pt] font-['Pretendard-ExtraLight'] desktop:mt-[0px] laptop:mt-[60px]">
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
          <p className="text-center text-[9pt] font-['Pretendard-ExtraLight'] mt-[40px]">
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
