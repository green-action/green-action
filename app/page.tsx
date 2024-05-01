"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useResponsive } from "./_hooks/responsive";
import TopButton from "./_components/TopButton";
import LaptopMainSlidder from "./_components/main/LaptopMainSlidder";
import MainSlider from "./_components/main/MainSlider";
import MobileSlider from "./_components/main/MobileSlider";
import MainTextSection from "./_components/main/MainTextSection";
import MainSecondTextSection from "./_components/main/MainSecondTextSection";
import { MODE_ACTION, MODE_COMMUNITY } from "./_api/constant";
import { Chip } from "@nextui-org/react";
import arrowImg from "../app/_assets/image/individualAction/Group143.svg";
import downArrow from "/app/_assets/image/logo_icon/icon/mainpage/Group_124.png";
import mainImg from "/app/_assets/image/mainpage/main.png";

const MainPage = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [position, setPosition] = useState(0);

  return (
    <div className="laptop:min-w-[1020px]">
      <TopButton />
      <div className="flex flex-col desktop:items-center laptop:items-center">
        <Image
          src={mainImg}
          alt="메인사진"
          className="absolute top-0 min-w-[1020px] desktop:h-[2780px] laptop:h-[2150px] phone:h-[1000px] phone:min-w-[360px] brightness-[70%]"
        />
        <MainTextSection position={position} setPosition={setPosition} />

        {(isDesktop || isLaptop) && (
          <section className="z-0 flex flex-col items-center justify-center desktop:mt-[530px] laptop:mt-[520px] desktop:pb-[210px] laptop:pb-[190px]">
            <Image
              src={downArrow}
              alt="down-arrow"
              className="desktop:w-[135px] laptop:w-[87px] desktop:ml-[1400px] laptop:ml-[800px] desktop:mb-[90px] laptop:mb-[130px]"
            />
            <Chip
              classNames={{
                base: "desktop:h-[50px] laptop:h-[47px] desktop:px-5 laptop:px-3 desktop:py-8 bg-transparent border-small border-white",
                content:
                  "desktop:w-[209px] desktop:text-[18.5px] laptop:text-[15px] text-white text-center font-['Inter'] drop-shadow",
              }}
            >
              Community Hot Posts
            </Chip>
            <div className="desktop:mx-[76px] desktop:mt-[140px] laptop:mt-[130px]">
              {isLaptop && <LaptopMainSlidder mode={MODE_COMMUNITY} />}
              {isDesktop && <MainSlider mode={MODE_COMMUNITY} />}
            </div>
            <Chip
              classNames={{
                base: "desktop:h-[50px] laptop:h-[41px] bg-[#F7F7F7]/60 border-small border-[#A8A8A8] desktop:mt-[97px] laptop:mt-[90px]",
                content:
                  "desktop:w-[110px] laptop:w-[95px] desktop:text-[17.3px] laptop:text-[14.6px] text-center text-[#646464] font-semibold drop-shadow",
              }}
            >
              <Link href={`/community`}>전체 보기</Link>
            </Chip>
          </section>
        )}
        <section className="z-0 flex flex-col items-center justify-center desktop:pt-[200px] laptop:pt-[0px] desktop:h-[1438px]  laptop:w-full laptop:h-[1338px] phone:h-[800px] desktop:pb-[200px] laptop:pb-[0px] phone:pb-[80px] phone:pt-[0px] bg-[#F3F3F3] brightness-10 ">
          {isMobile && (
            <section className="flex flex-col items-center justify-center">
              <div className="mr-auto">
                <p className="text-[15px] font-bold text-center font-['Inter'] mr-auto">
                  실시간 인기글
                </p>
                <p className=" font-bold text-[15px] text-[#686868] mt-2">
                  Community
                </p>
              </div>
              <Link
                href={`/community`}
                className="flex ml-auto text-[#979797] text-[11px] gap-1"
              >
                전체 보기
                <Image src={arrowImg} alt="화살표" />
              </Link>
              {isMobile && <MobileSlider mode={MODE_COMMUNITY} />}
            </section>
          )}

          {(isDesktop || isLaptop) && (
            <>
              <Chip
                classNames={{
                  base: "desktop:h-[50px] laptop:h-[47px] desktop:px-5 laptop:px-3 desktop:py-8 bg-transparent border-small border-[#ADADAD]",
                  content:
                    "desktop:w-[209px] desktop:text-[18.5px] laptop:text-[15px] text-center text-[#5A5A5A] font-['Inter'] drop-shadow flex justify-center",
                }}
              >
                Green Action Hot Posts
              </Chip>
              <div className="desktop:mx-[205px] desktop:mt-[115px] laptop:mt-[115px]">
                {isLaptop && <LaptopMainSlidder mode={MODE_ACTION} />}
                {isDesktop && <MainSlider mode={MODE_ACTION} />}
              </div>
              <Chip
                classNames={{
                  base: "desktop:h-[50px] laptop:h-[41px] bg-[#F7F7F7]/60 border-small border-[#A8A8A8] desktop:mt-[97px] laptop:mt-[90px]",
                  content:
                    "desktop:w-[110px] laptop:w-[95px] desktop:text-[17.3px] laptop:text-[14.6px] text-center text-[#646464] font-semibold drop-shadow",
                }}
              >
                <Link href={`/individualAction`}>전체 보기</Link>
              </Chip>
            </>
          )}
          {isMobile && (
            <section className="flex flex-col items-center justify-center">
              <div className="mr-auto mt-20">
                <p className=" font-bold text-[15px] text-[#686868]">
                  Greenaction
                </p>
              </div>
              <Link
                href={`/individualAction`}
                className="flex ml-auto text-[#979797] text-[11px] gap-1"
              >
                전체 보기
                <Image src={arrowImg} alt="화살표" />
              </Link>

              <div className="h-[200px]">
                {isMobile && <MobileSlider mode={MODE_ACTION} />}
              </div>
            </section>
          )}
        </section>
      </div>
      <MainSecondTextSection position={position} setPosition={setPosition} />
    </div>
  );
};
export default MainPage;
