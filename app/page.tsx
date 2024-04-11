"use client";

import { Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import DynamicHeader from "./_components/layout/DynamicHeader";
import MainSlider from "./_components/main/MainSlider";

import downArrow from "/app/_assets/image/logo_icon/icon/mainpage/Group_124.png";

const MainPage = () => {
  return (
    <div className="min-w-[1920px]">
      <div className="flex flex-col">
        <DynamicHeader />
        <section className="flex flex-col w-full h-[500px] justify-center items-center mt-[200px] text-white">
          <p className="text-center text-[80pt] w-full font-['Italiana']">
            EXPERIENCE A NEW WAY OF
            {/* 간격 조정하기 */}
            <span className="mt-[-40px] block">GREEN LIFE</span>
          </p>
          <p className="text-center text-[15pt] font-['Pretendard-ExtraLight'] mt-[20px]">
            지구와 함께 숨쉬다
            <br />
            SOOM과 함께 일상의 그린 라이프를 경험하세요
          </p>
        </section>
        <section className="z-0 flex flex-col items-center justify-center mt-[480px] mb-[197px]">
          <Image
            src={downArrow}
            alt="down-arrow"
            className="w-[135px] ml-[1400px] mb-[145px]"
          />
          <Chip
            classNames={{
              base: "h-[50px] px-5 py-8 bg-transparent border-small border-white",
              content:
                "w-[209px] text-[14pt] text-white text-center font-['Inter'] drop-shadow ",
            }}
          >
            Community Hot Posts
          </Chip>
          <div className="mx-[76px] mt-[140px]">
            <MainSlider mode="community" />
          </div>
          <Chip
            classNames={{
              // 전체보기 칩 세로길이, 폰트크기 자체 수정
              base: "h-[50px] bg-[#E1E1E1]/60 border-small border-[#A8A8A8] mt-[97px]",
              content:
                "w-[110px] text-[13pt] text-center text-[#646464] font-semibold drop-shadow ",
            }}
          >
            <Link href={`/community`}>전체 보기</Link>
          </Chip>
        </section>
        {/* 배경 이미지 div 끝 */}
        <section className="z-0 flex flex-col items-center justify-center pt-[200px] pb-[385px] bg-white brightness-90">
          <Chip
            classNames={{
              base: "h-[45px] px-5 py-8 bg-transparent border-small border-[#ADADAD]",
              content:
                "w-[209px] text-[14pt] text-center text-[#5A5A5A] font-['Inter']  drop-shadow flex justify-center",
            }}
          >
            Green-Action Hot Posts
          </Chip>
          <div className="mx-[205px] mt-[115px] ">
            <MainSlider mode="action" />
          </div>
          <Chip
            classNames={{
              base: "h-[50px] bg-[#E1E1E1]/60 border-small border-[#A8A8A8] mt-[97px]",
              content:
                "w-[110px] text-[13pt] text-center text-[#646464] font-semibold  drop-shadow",
            }}
          >
            <Link href={`/individualAction`}>전체 보기</Link>
          </Chip>
        </section>
        <section className="h-[760px] pt-[250px]  bg-blend-darken bg-black bg-opacity-50">
          {/*  pt-[311px] 인데 자체수정 */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center font-['Italiana'] text-[48pt] text-white">
              <p>Experience the earth breathing together </p>
              <p> in your daily life</p>
            </div>
            <Chip
              classNames={{
                base: "h-[58px] bg-transparent border-small border-white mt-[97px]",
                content:
                  "w-[223px] text-[14pt] text-center text-white font-semibold ",
              }}
            >
              <Link
                href={`/about`}
                className="text-white font-['Inter'] font-light text-[16pt]"
              >
                VIEW MORE
              </Link>
            </Chip>
          </div>
        </section>
      </div>
      {/* <section className="flex flex-col items-center justify-center pt-[200px] pb-[385px] bg-white brightness-90">
        <Chip
          classNames={{
            base: "h-[45px] px-5 py-8 bg-transparent border-small border-[#ADADAD]",
            content:
              "w-[209px] text-[14pt] text-center text-[#5A5A5A] font-['Inter']  drop-shadow flex justify-center",
          }}
        >
          Green-Action Hot Posts
        </Chip>
        <div className="mx-[205px] mt-[115px] ">
          <MainSlider mode="action" />
        </div>
        <Chip
          classNames={{
            base: "h-[50px] bg-[#E1E1E1]/60 border-small border-[#A8A8A8] mt-[97px]",
            content:
              "w-[110px] text-[13pt] text-center text-[#646464] font-semibold  drop-shadow",
          }}
        >
          <Link href={`/individualAction`}>전체 보기</Link>
        </Chip>
      </section> */}
      {/* <section className="h-[760px] pt-[250px]  bg-blend-darken bg-black bg-opacity-50">
        {/*  pt-[311px] 인데 자체수정 * /}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center font-['Italiana'] text-[48pt] text-white">
            <p>Experience the earth breathing together </p>
            <p> in your daily life</p>
          </div>
          <Chip
            classNames={{
              base: "h-[58px] bg-transparent border-small border-white mt-[97px]",
              content:
                "w-[223px] text-[14pt] text-center text-white font-semibold ",
            }}
          >
            <Link
              href={`/about`}
              className="text-white font-['Inter'] font-light text-[16pt]"
            >
              VIEW MORE
            </Link>
          </Chip>
        </div>
      </section> */}
    </div>
  );
};

export default MainPage;
