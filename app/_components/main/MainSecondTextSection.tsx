import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useResponsive } from "@/app/_hooks/responsive";
import _ from "lodash";
import setboxImg from "@/app/_assets/image/goods/setbox.png";
import { Chip } from "@nextui-org/react";
import rightArrow from "/app/_assets/image/mainpage/Group 172.png";

import type { MainTextProps } from "@/app/_types/main/mainpage";

const MainSecondTextSection: React.FC<MainTextProps> = ({
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
    <div>
      {(isDesktop || isLaptop) && (
        <section className="flex justify-between w-full h-[760px] bg-blend-darken bg-black bg-opacity-[57%]">
          <div className="bg-[#d6d6d6] w-[50%] brightness-[57.5%]" />
          <div className="bg-[#d6d6d6] w-[50%] brightness-[57.5%]" />
          <div
            style={{ transform: `translateY(-${position / 80}vh` }}
            className="absolute z-10 flex flex-col justify-center items-center w-full h-[60vh] desktop:mt-[600px] laptop:mt-[500px]"
          >
            <div className="flex flex-col items-center desktop:text-[48pt] laptop:text-[35pt] text-white">
              <p>환경을 위한 실천이 필요한 순간.</p>
              <p>숨과 함께 하세요.</p>
            </div>
            <Chip
              classNames={{
                base: "desktop:h-[58px] laptop:h-[40px] bg-transparent border-small border-white desktop:mt-[97px] laptop:mt-[60px]",
                content:
                  "flex justify-center desktop:w-[223px] laptop:w-[150px] font-semibold",
              }}
            >
              <Link
                href={`/about`}
                className="flex gap-4 items-center text-white font-['Inter'] font-light desktop:text-[26.6px] laptop:text-[16px]"
              >
                <p>VIEW MORE</p>
                <Image
                  src={rightArrow}
                  alt="right-arrow"
                  className="w-[20px] h-[16px]"
                />
              </Link>
            </Chip>
          </div>
          <Image
            src={setboxImg}
            alt="굿즈제품전체사진"
            className="w-[1325px] h-[760px] object-cover brightness-[57%]"
          />
        </section>
      )}
      {isMobile && (
        <section className="flex justify-between w-full h-[310px] bg-blend-darken bg-black bg-opacity-[57%]">
          <div
            style={{ transform: `translateY(-${position / 100}vh` }}
            className="absolute z-10 flex flex-col justify-center items-center w-full h-[310px] mt-[210px]"
          >
            <div className="flex flex-col items-center text-[24px] text-white">
              <p>환경을 위한 실천이 필요한 순간.</p>
              <p>숨과 함께 하세요.</p>
            </div>
            <Chip
              classNames={{
                base: "desktop:h-[58px] laptop:h-[40px] bg-transparent border-small border-white mt-[60px]",
                content:
                  "flex justify-center desktop:w-[223px] laptop:w-[150px] font-semibold",
              }}
            >
              <Link
                href={`/about`}
                className="flex gap-4 items-center text-white font-['Inter'] font-light desktop:text-[26.6px] laptop:text-[16px]"
              >
                <p>VIEW MORE</p>
                <Image
                  src={rightArrow}
                  alt="right-arrow"
                  className="w-[20px] h-[16px]"
                />
              </Link>
            </Chip>
          </div>
          <div className="">
            <Image
              src={setboxImg}
              alt="굿즈제품전체사진"
              className="w-[1325px] h-[510px] object-cover brightness-[57%]"
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default MainSecondTextSection;
