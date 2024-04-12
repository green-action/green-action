"use client";

import { Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import DynamicHeader from "./_components/layout/DynamicHeader";
import MainSlider from "./_components/main/MainSlider";

import mainImg from "/app/_assets/image/mainpage/main.png";
import downArrow from "/app/_assets/image/logo_icon/icon/mainpage/Group_124.png";

const MainPage = () => {
  return (
    <div className="laptop:min-w-[1020px]">
      <div className="flex flex-col">
        <DynamicHeader />
        <Image
          src={mainImg}
          alt="main-image"
          className="absolute min-w-[1020px] desktop:h-[2600px] laptop:h-[1600px] brightness-[90%]"
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
        <section className="z-0 flex flex-col items-center justify-center desktop:mt-[480px] laptop:mt-[330px] desktop:pb-[130px] laptop:pb-[130px]">
          <Image
            src={downArrow}
            alt="down-arrow"
            className="desktop:w-[135px] laptop:w-[87px] desktop:ml-[1400px] laptop:ml-[800px] desktop:mb-[145px]"
          />
          <Chip
            classNames={{
              base: "desktop:h-[50px] desktop:px-5 desktop:py-8 bg-transparent border-small border-white",
              content:
                "desktop:w-[209px] desktop:text-[14pt] text-white text-center font-['Inter'] drop-shadow ",
            }}
          >
            Community Hot Posts
          </Chip>
          <div className="desktop:mx-[76px] desktop:mt-[140px]">
            <MainSlider mode="community" />
          </div>
          <Chip
            classNames={{
              // 전체보기 칩 세로길이, 폰트크기 자체 수정
              base: "desktop:h-[50px] bg-[#E1E1E1]/60 border-small border-[#A8A8A8] desktop:mt-[97px]",
              content:
                "desktop:w-[110px] desktop:text-[13pt] text-center text-[#646464] font-semibold drop-shadow ",
            }}
          >
            <Link href={`/community`}>전체 보기</Link>
          </Chip>
        </section>
        {/* 배경 이미지 div 끝 */}
        <section className="z-0 flex flex-col items-center justify-center desktop:pt-[200px] desktop:pb-[385px] bg-white brightness-90">
          <Chip
            classNames={{
              base: "desktop:h-[45px] desktop:px-5 desktop:py-8 bg-transparent border-small border-[#ADADAD]",
              content:
                "desktop:w-[209px] desktop:text-[14pt] text-center text-[#5A5A5A] font-['Inter'] drop-shadow flex justify-center",
            }}
          >
            Green-Action Hot Posts
          </Chip>
          <div className="desktop:mx-[205px] desktop:mt-[115px]">
            <MainSlider mode="action" />
          </div>
          <Chip
            classNames={{
              base: "desktop:h-[50px] bg-[#E1E1E1]/60 border-small border-[#A8A8A8] desktop:mt-[97px]",
              content:
                "desktop:w-[110px] desktop:text-[13pt] text-center text-[#646464] font-semibold drop-shadow",
            }}
          >
            <Link href={`/individualAction`}>전체 보기</Link>
          </Chip>
        </section>
        <section className="desktop:h-[760px] desktop:pt-[250px] bg-blend-darken bg-black bg-opacity-50">
          {/*  pt-[311px] 인데 자체수정 */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center font-['Italiana'] desktop:text-[48pt] text-white">
              <p>Experience the earth breathing together </p>
              <p> in your daily life</p>
            </div>
            <Chip
              classNames={{
                base: "desktop:h-[58px] bg-transparent border-small border-white desktop:mt-[97px]",
                content:
                  "desktop:w-[223px] desktop:text-[14pt] text-center text-white font-semibold",
              }}
            >
              <Link
                href={`/about`}
                className="text-white font-['Inter'] font-light desktop:text-[16pt]"
              >
                VIEW MORE
              </Link>
            </Chip>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
