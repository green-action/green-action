"use client";

import Image from "next/image";
import Link from "next/link";

import titleImg from "../../app/_assets/image/about/1.png";
import cardBg1 from "../../app/_assets/image/about/2.png";
import cardBg2 from "../../app/_assets/image/about/3.png";
import mainImg from "../../app/_assets/image/about/main.png";

import DynamicHeader from "../_components/layout/DynamicHeader";
import { useResponsive } from "../_hooks/responsive";
import TopButton from "../_components/TopButton";

const AboutPage = () => {
  // custom hook - 현재 브라우저 화면의 사이즈 상태 가져오기
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <>
      <div className="desktop:min-w-[1920px] laptop:min-w-[1020px] mx-auto">
        <TopButton />
        <div className="flex flex-col items-center">
          {/* 헤더 */}
          {/* <div className="fixed z-20 mx-auto">
            <DynamicHeader />
          </div> */}
          {/* first part - title 이미지 및 문구 */}
          <Image
            src={titleImg}
            alt="about title image"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] desktop:h-[1090px] laptop:h-[1000px] object-cover mx-auto mb-[282px] rounded-b-[60px] brightness-[.4]"
          />
          {isDesktop && (
            <>
              <div className="z-0 desktop:mt-[300px] laptop:mt-[450px] flex flex-col laptop:w-[100%] items-center text-white text-[64px] font-thin">
                <p className="font-['Italiana']">
                  Experience the earth breathing
                </p>
                <p className="font-['Italiana']">together in your daily life</p>
              </div>
            </>
          )}
          {isLaptop && (
            <div className="z-0 desktop:mt-[500px] laptop:mt-[450px] flex flex-col laptop:w-[100%] items-center text-white text-[64px] font-thin">
              <p className="font-['Italiana']">Experience the earth</p>
              <p className="font-['Italiana']">breathing together in your</p>
              <p className="font-['Italiana']"> daily life</p>
            </div>
          )}
        </div>
        <div className="desktop:mt-[700px] laptop:mt-[550px] flex flex-col items-center">
          {/* second part - 설명글 */}
          <div className="w-[75%] flex flex-col justify-center text-center desktop:text-[36px] laptop:text-[30px] desktop:mb-[420px] laptop:mb-[330px] font-bold">
            {isDesktop && (
              <>
                {/* 첫 줄 */}
                <div>
                  <p className="inline-block text-with-background bg-text-bg-1 bg-cover bg-center rounded-full text-white desktop:pt-1 mr-2 desktop:w-[444px] laptop:w-[400px] desktop:h-[60px] laptop:h-[47px]">
                    '일상에서 쉽게 실천할 수 있는
                  </p>
                  <p className="inline-block">
                    환경 캠페인'은 지구를 지키는 우리의 작은 노력으로부터
                    출발합니다.
                  </p>
                </div>
                {/* 두번째 줄 */}
                <div>
                  <p className="inline-block">당신의 일상에서 환경을 지키는</p>
                  <p className="inline-block text-with-background bg-text-bg-2 bg-cover bg-center rounded-full text-white desktop:pt-1 mr-2 desktop:w-[444px] laptop:w-[400px] desktop:h-[60px] laptop:h-[47px]">
                    작은 습관들이 모여 큰 변화를
                  </p>
                  <p className="inline-block">이끌어낼 수 있습니다.</p>
                  {/* 3~4번째 줄 */}
                  <p className="inline-block">
                    우리의 목표는 모든 사람이 쉽게 실천할 수 있는 환경 보호
                    방법을 제시하고, 그것들을 실제 행동으로
                    <br /> 이어지게 하는 것입니다. 이제 당신의 일상을 환경
                    보호의 일부로 만들어보세요.
                  </p>
                </div>
                {/* 마지막 2문장 */}
                <div>
                  <p className="inline-block">지금 바로</p>
                  <p className="inline-block text-with-background bg-text-bg-3 bg-cover bg-center rounded-full text-white desktop:pt-1 mx-2 desktop:w-[370px] laptop:w-[330px] desktop:h-[60px] laptop:h-[47px]">
                    '지구가 숨쉬다. SOOM'
                  </p>
                  <p className="inline-block">
                    에 참여하여 우리의 지구를 함께 지켜 나가는 데 기여하세요.
                  </p>
                  <p className="inline-block">
                    당신의 작은 노력이 큰 변화를 만들어낼 수 있습니다. 함께해요!
                  </p>
                </div>
              </>
            )}
            {isLaptop && (
              <>
                {/* 첫 줄 */}
                <div>
                  <p className="inline-block text-with-background bg-text-bg-1 bg-cover bg-center rounded-full text-white desktop:pt-1 mr-2 desktop:w-[444px] laptop:w-[380px] desktop:h-[60px] laptop:h-[47px]">
                    '일상에서 쉽게 실천할 수 있는
                  </p>
                  <p className="inline-block">환경 캠페인'은</p>
                  <p>지구를 지키는 우리의 작은 노력으로부터 출발합니다.</p>
                </div>
                {/* 두번째 줄 */}
                <div>
                  <p className="inline-block">당신의 일상에서 환경을 지키는</p>
                  <p className="inline-block text-with-background bg-text-bg-2 bg-cover bg-center rounded-full text-white desktop:pt-1 mx-2 desktop:w-[444px] laptop:w-[380px] desktop:h-[60px] laptop:h-[47px]">
                    작은 습관들이 모여 큰 변화를
                  </p>
                  <p className="inline-block">이끌어낼 수 있습니다.</p>
                  {/* 3~4번째 줄 */}
                  <p className="inline-block"></p>
                </div>
                {/* 마지막 2문장 */}
                <div>
                  <p>이제 당신의 일상을 환경 보호의 일부로 만들어보세요.</p>
                  <p className="inline-block">지금 바로</p>
                  <p className="inline-block text-with-background bg-text-bg-3 bg-cover bg-center rounded-full text-white desktop:pt-1 mx-2 desktop:w-[370px] laptop:w-[330px] desktop:h-[60px] laptop:h-[47px]">
                    '지구가 숨쉬다. SOOM'
                  </p>
                  <p className="inline-block mr-2">에</p>
                  <p className="inline-block">참여하여 우리의 지구를 함께</p>
                  <p className="inline-block">지켜 나가는 데 기여하세요.</p>
                  <p className="inline-block">
                    당신의 작은 노력이 큰 변화를 만들어낼 수 있습니다. 함께해요!
                  </p>
                </div>
              </>
            )}
          </div>
          {/* third part - 카드 4장 */}
          <div className="flex flex-col w-[80%] h-[1344px] mx-auto items-center desktop:mb-[730px] laptop:mb-[500px]">
            <div>
              <div className={`flex ${isLaptop && "justify-end"}`}>
                {/* 카드 1 */}
                <div className="flex flex-col justify-between bg-white w-[450px] h-[590px] rounded-[40px] border-1.5 mb-[170px] desktop:mr-[40px] laptop:mr-[20px] py-[53px] px-[60px]">
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
                    src={cardBg1}
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
                <div className="bg-white w-[450px] h-[590px] rounded-[40px] desktop:ml-[360px] laptop:ml-[20px] desktop:mr-[40px] laptop:mr-[20px] relative">
                  <Image
                    src={cardBg2}
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

          {/* last part - 하단 이미지, 'explore more' 버튼  */}
          <div className="relative text-center">
            <Image
              src={mainImg}
              alt="explore more image"
              className="desktop:w-[1844px] laptop:w-[955px] desktop:h-[882px] laptop:h-[879px] mx-auto rounded-[50px] mb-[40px] object-cover"
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
        </div>
      </div>
    </>
  );
};

export default AboutPage;
