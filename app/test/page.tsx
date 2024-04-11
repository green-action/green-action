import React from "react";

import Image from "next/image";

import titleImg from "../../app/_assets/image/about/1.png";
import textBg1 from "../../app/_assets/image/about/2.png";
import textBg2 from "../../app/_assets/image/about/3.png";
import mainImg from "../../app/_assets/image/about/main.png";
import Link from "next/link";
import DynamicHeader from "../_components/layout/DynamicHeader";

const AboutTest = () => {
  return (
    <>
      {/* first part - title 이미지 및 문구 */}
      <div className="min-w-[1920px] mx-auto">
        <div className="flex flex-col items-center">
          <div className="fixed z-10 mx-auto">
            {/* 헤더 */}
            <DynamicHeader />
          </div>

          <Image
            src={titleImg}
            alt="about title image"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[1090px] object-cover mx-auto mb-[282px] rounded-b-[60px] brightness-[.4]"
          />
          {/* <div className="absolute z-0 bottom-[60px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white text-[64px] font-thin"> */}
          <div className=" z-0 mt-[500px] flex flex-col items-center text-white text-[64px] font-thin">
            <p className="font-['Italiana']">Experience the earth breathing</p>
            <p className="font-['Italiana']">together in your daily life</p>
          </div>
        </div>
        <div className="mt-[500px] flex flex-col items-center">
          <div className="text-[50px] z-0">test</div>
          <div className="text-[50px] z-0">test</div>
          <div className="text-[50px] z-0">test</div>
          <div className="text-[50px] z-0">test</div>
        </div>

        {/* 이미지 */}
        {/* <Image
          src={titleImg}
          alt="about title image"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[1090px] object-cover mx-auto mb-[282px] rounded-b-[60px] brightness-[.4]"
        /> */}

        {/* 문구 */}
        {/* <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white text-[64px] font-thin">
          <p className="font-['Italiana']">Experience the earth breathing</p>
          <p className="font-['Italiana']">together in your daily life</p>
        </div> */}
      </div>

      {/* second part - 설명글 */}

      {/* third part - 카드 4장 */}

      {/* last part - 이미지, 'explore more' 버튼  */}
    </>
  );
};

export default AboutTest;
