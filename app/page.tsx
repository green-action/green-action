"use client";

import { Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import DynamicHeader from "./_components/layout/DynamicHeader";
import MainSlider from "./_components/main/MainSlider";
import LaptopMainSlidder from "./_components/main/LaptopMainSlidder";
import { useResponsive } from "./_hooks/responsive";

import mainImg from "/app/_assets/image/mainpage/main.png";
import downArrow from "/app/_assets/image/logo_icon/icon/mainpage/Group_124.png";
import rightArrow from "/app/_assets/image/mainpage/Group 172.png";

const MainPage = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <div className="laptop:min-w-[1020px]">
      <div className="flex flex-col">
        {/* <DynamicHeader /> */}
        <Image
          src={mainImg}
          alt="main-image"
          className="absolute top-0 min-w-[1020px] desktop:h-[2700px] laptop:h-[2100px] brightness-[90%]"
        />
        <section className="z-0 flex flex-col w-full desktop:h-[500px] laptop:h-[400px] justify-center items-center desktop:mt-[200px] text-white">
          <p className="text-center desktop:text-[80pt] laptop:text-[50pt] w-full font-['Italiana']">
            {/* l 폰트크기자체수정 */}
            EXPERIENCE A NEW WAY OF
            <span className="desktop:mt-[-40px] block">GREEN LIFE</span>
          </p>
          <p className="text-center desktop:text-[15pt] laptop:text-[11pt] font-['Pretendard-ExtraLight'] desktop:mt-[20px]">
            지구와 함께 숨쉬다
            <br />
            SOOM과 함께 일상의 그린 라이프를 경험하세요
          </p>
        </section>
        <section className="z-0 flex flex-col items-center justify-center desktop:mt-[480px] laptop:mt-[450px] desktop:pb-[210px] laptop:pb-[190px]">
          <Image
            src={downArrow}
            alt="down-arrow"
            className="desktop:w-[135px] laptop:w-[87px] desktop:ml-[1400px] laptop:ml-[800px] desktop:mb-[145px] laptop:mb-[200px]"
          />
          <Chip
            classNames={{
              base: "desktop:h-[50px] laptop:h-[47px] desktop:px-5 laptop:px-3 desktop:py-8 bg-transparent border-small border-white",
              content:
                "desktop:w-[209px] desktop:text-[14pt] laptop:text-[13pt] text-white text-center font-['Inter'] drop-shadow ",
            }}
          >
            Community Hot Posts
          </Chip>
          <div className="desktop:mx-[76px] desktop:mt-[140px] laptop:mt-[130px]">
            {isLaptop && <LaptopMainSlidder mode="community" />}
            {isDesktop && <MainSlider mode="community" />}
          </div>
          <Chip
            classNames={{
              // 전체보기 칩 세로길이, 폰트크기 자체 수정
              base: "desktop:h-[50px] laptop:h-[41px] bg-[#F7F7F7]/60 border-small border-[#A8A8A8] desktop:mt-[97px] laptop:mt-[90px]",
              content:
                "desktop:w-[110px] laptop:w-[95px] desktop:text-[13pt] laptop:text-[11pt] text-center text-[#646464] font-semibold drop-shadow",
            }}
          >
            <Link href={`/community`}>전체 보기</Link>
          </Chip>
        </section>
        {/* 배경 이미지 div 끝 */}
        <section className="z-0 flex flex-col items-center justify-center desktop:pt-[200px] laptop:pt-[0px] desktop:h-[1438px] laptop:h-[1338px] desktop:pb-[200px] laptop:pb-[0px] bg-white brightness-90">
          <Chip
            classNames={{
              base: "desktop:h-[50px] laptop:h-[47px] desktop:px-5 laptop:px-3 desktop:py-8 bg-transparent border-small border-[#ADADAD]",
              content:
                "desktop:w-[209px] desktop:text-[14pt] laptop:text-[13pt] text-center text-[#5A5A5A] font-['Inter'] drop-shadow flex justify-center",
            }}
          >
            Green-Action Hot Posts
          </Chip>
          <div className="desktop:mx-[205px] desktop:mt-[115px] laptop:mt-[115px]">
            {isLaptop && <LaptopMainSlidder mode="action" />}
            {isDesktop && <MainSlider mode="action" />}
          </div>
          <Chip
            classNames={{
              base: "desktop:h-[50px] laptop:h-[41px] bg-[#F7F7F7]/60 border-small border-[#A8A8A8] desktop:mt-[97px] laptop:mt-[90px]",
              content:
                "desktop:w-[110px] laptop:w-[95px] desktop:text-[13pt] laptop:text-[11pt] text-center text-[#646464] font-semibold drop-shadow",
            }}
          >
            <Link href={`/individualAction`}>전체 보기</Link>
          </Chip>
        </section>
        <section className="desktop:h-[760px]  laptop:h-[600px] desktop:pt-[250px] laptop:pt-[210px] bg-blend-darken bg-black bg-opacity-50">
          {/*  pt-[311px] 인데 자체수정 */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center font-['Italiana'] desktop:text-[48pt] laptop:text-[35pt] text-white">
              <p>Experience the earth breathing together </p>
              <p> in your daily life</p>
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
                className="flex gap-4 items-center text-white font-['Inter'] font-light desktop:text-[16pt] laptop:text-[12pt]"
              >
                <p>VIEW MORE</p>
                <Image
                  src={rightArrow}
                  alt="right-arrow"
                  className="w-[20px] h-[16px] "
                />
              </Link>
            </Chip>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
