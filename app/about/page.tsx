import React from "react";

import Image from "next/image";

import titleImg from "../../app/_assets/image/about/1.png";
import textBg1 from "../../app/_assets/image/about/2.png";
import textBg2 from "../../app/_assets/image/about/3.png";
import mainImg from "../../app/_assets/image/about/main.png";
import Link from "next/link";
import DynamicHeader from "../_components/layout/DynamicHeader";

const AboutPage = () => {
  return (
    <div className="min-w-[1920px] mx-auto relative">
      {/* <div className="flex flex-col bg-cover bg-opacity-10"> */}
      {/* <DynamicHeader /> */}
      {/* first part - title 이미지 및 문구 */}
      <div className="relative">
        {/* 이미지 */}
        <Image
          src={titleImg}
          alt="about title image"
          className="relative top-0 w-[95%] h-[1090px] object-cover mx-auto mb-[282px] rounded-b-[60px] brightness-[.4]"
        />
        {/* 문구 */}
        <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white text-[64px] font-thin">
          <p className="font-['Italiana']">Experience the earth breathing</p>
          <p className="font-['Italiana']">together in your daily life</p>
        </div>
      </div>

      {/* second part - 설명글 */}
      <div className="mx-auto w-[75%] mb-[440px]">
        <div className="text-[36px]">
          <div className="flex items-center relative">
            <Image
              src={textBg1}
              alt="text-bg-1"
              className="w-[444px] h-[60px] object-cover rounded-full"
            />
            <span className="absolute text-white left-4">
              '일상에서 쉽게 실천할 수 있는
            </span>
            <span>
              환경 캠페인'은 지구를 지키는 우리의 작은 노력으로부터 출발합니다.
            </span>
          </div>
          <div className="flex flex-wrap items-center">
            <span>당신의 일상에서 환경을 지키는 </span>
            <div className="flex items-center relative h-[60px]">
              <Image
                src={textBg2}
                alt="text-bg-1"
                className="w-[444px] h-[60px] object-cover rounded-full"
              />
              <span className="absolute text-white left-4">
                작은 습관들이 모여 큰 변화를
              </span>
            </div>
            <span className="text-wrap">
              이끌어낼 수 있습니다. 이제 우리의 캠페인에 참여하여 당신도
              환경보호의 일원이 되어보세요. 우리의 목표는 모든 사람이 쉽게
              실천할 수 있는 환경 보호 방법을 제시하고, 그것들을 실제 행동으로
              이어지게 하는 것입니다. 이제 당신의 일상을 환경 보호의 일부로
              만들어보세요. 지금 바로
            </span>
          </div>

          <div className="flex items-center relative h-[60px]">
            <Image
              src={mainImg}
              alt="text-bg-1"
              className="w-[370px] h-[60px] object-cover rounded-full"
            />
            <span className="absolute text-white left-4">
              '지구가 숨쉬다. SOOM'
            </span>
          </div>
          <span>
            에 참여하여 우리의 지구를 함께 지켜 나가는 데 기여하세요. 당신의
            작은 노력이 큰 변화를 만들어낼 수 있습니다. 함께해요!
          </span>
        </div>
      </div>
      {/* third part - 카드 4장 */}
      <div className="flex flex-col w-[80%] h-[1344px] mx-auto items-center mb-[820px]">
        <div>
          <div className="flex">
            {/* 카드 1 */}
            <div className="flex flex-col justify-between bg-white w-[450px] h-[590px] rounded-[40px] border-1.5 mb-[170px] mr-[40px] py-[53px] px-[60px]">
              <span className="font-[Italiana] text-[40px] text-[#3A3A3A]">
                (1) Join us
              </span>
              <span className="text-[#3A3A3A] text-[18px] font-[Pretendard-ExtraLight]">
                회원가입으로 포인트를 적립해보세요. <br />
                soom의 회원이 되어 green-action에
                <br /> 참여하고 인증샷을 올릴 수 있습니다.
              </span>
            </div>
            {/* 카드 2 */}
            <div className="w-[450px] h-[590px] rounded-[30px] mt-[140px] mb-[30px] relative">
              <Image
                src={textBg1}
                alt="card1"
                className="w-full h-full object-cover rounded-[40px] brightness-[.8]"
              />
              <div className="absolute flex flex-col justify-between inset-0 top-[53px] bottom-[53px] left-[60px]">
                <span className="font-[Italiana] text-[40px] text-white">
                  (2) Take
                  <br /> green-action
                </span>
                <span className="text-white text-[18px] font-[Pretendard-ExtraLight]">
                  본인이 직접 실천 캠페인을 열어보세요.
                  <br /> green-action 업로드시
                  <br /> 포인트를 적립할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            {/* 카드 3 */}
            <div className="bg-white w-[450px] h-[590px] rounded-[40px] ml-[360px] mr-[40px] relative">
              <Image
                src={textBg2}
                alt="card1"
                className="w-full h-full object-cover rounded-[40px] brightness-[.8]"
              />
              <div className="absolute flex flex-col justify-between inset-0 top-[53px] bottom-[53px] left-[60px]">
                <span className="font-[Italiana] text-[40px] text-white">
                  (3) Share your
                  <br /> experience
                </span>
                <span className="text-white text-[18px] font-[Pretendard-ExtraLight]">
                  green-action을 실천했다면, community에
                  <br /> 인증글을 업로드해보세요.
                  <br /> 인증글 혹은 댓글 업로드시 포인트를 드립니다.
                </span>
              </div>
            </div>
            {/* 카드 4 */}
            <div className="flex flex-col justify-between bg-white w-[450px] h-[590px] rounded-[40px] border-1.5  py-[53px] px-[60px]">
              <span className="font-[Italiana] text-[40px] text-[#3A3A3A]">
                (4) Choose your Goods
              </span>
              <span className="text-[#3A3A3A] text-[18px] font-[Pretendard-ExtraLight]">
                일상에서 꾸준히 실천한 당신! <br />
                획득한 포인트로 친환경 소재의 굿즈를
                <br />
                구매할 수 있습니다.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* last part - 이미지, 'explore more' 버튼  */}
      <div className="relative text-center">
        <Image
          src={mainImg}
          alt="explore more image"
          className="w-[1844px] h-[882px] mx-auto rounded-[50px] mb-[40px]"
        />
        <span className="absolute font-[Italiana] text-white text-[48px] inset-0 top-[350px]">
          Experience the earth breathing together <br /> with soom
        </span>
        <div className="absolute inset-x-0 bottom-[320px] flex items-center justify-center text-white text-[20px] font-[Inter]">
          <Link
            href="/individualAction"
            className="flex items-center justify-center rounded-full border-1 border-white w-[200px] h-[50px]"
          >
            Explore more
          </Link>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default AboutPage;
