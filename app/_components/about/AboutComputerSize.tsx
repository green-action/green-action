import { useResponsive } from "@/app/_hooks/responsive";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardBg1 from "../../_assets//image/about/2.png";
import cardBg2 from "../../_assets//image/about/3.png";
import mainImg from "../../_assets//image/about/main.png";
import titleImg from "../../_assets/image/about/1.png";
import TopButton from "../TopButton";

const AboutComputerSize = ({ position }: { position: number }) => {
  const { isDesktop, isLaptop } = useResponsive();
  return (
    <>
      <div className="desktop:min-w-[1920px] laptop:min-w-[1020px] mx-auto">
        <TopButton />
        <div className="flex flex-col items-center">
          <Image
            src={titleImg}
            alt="about title image"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] object-cover mx-auto rounded-b-[60px] brightness-[.4] desktop:h-[1090px] desktop:mb-[282px] laptop:h-[1000px] laptop:mb-[282px]"
          />
          <div
            style={{ transform: `translateY(-${position / 30}vh` }}
            className="z-0 flex flex-col items-center text-white text-[64px] font-thin desktop:mt-[300px] laptop:w-[100%] laptop:mt-[335px]"
          >
            <p className="font-['Italiana']">
              {isDesktop
                ? "Experience the earth breathing"
                : "Experience the earth"}
            </p>
            <p className="font-['Italiana']">
              {isDesktop
                ? "together in your daily life"
                : "breathing together in your"}
            </p>
            {isLaptop && <p className="font-['Italiana']"> daily life</p>}
          </div>
        </div>
        <div className="flex flex-col items-center desktop:mt-[700px] laptop:mt-[505px]">
          {/* second part - 설명글 */}
          <div className="flex flex-col justify-center text-center  mx-auto font-bold desktop:text-[36px] desktop:mb-[420px] desktop:w-[1426px] laptop:text-[30px] laptop:mb-[330px] w-[852px]">
            {/* 첫 줄 */}
            <div>
              <p className="inline-block text-with-background bg-text-bg-1 bg-cover bg-center rounded-full text-white mr-2 desktop:pt-1 desktop:w-[444px] desktop:h-[60px] laptop:w-[380px] laptop:h-[47px]">
                '일상에서 쉽게 실천할 수 있는
              </p>
              <p className="inline-block">
                {isDesktop
                  ? `환경 캠페인'은 지구를 지키는 우리의 작은 노력으로부터
            출발합니다.`
                  : `환경 캠페인'은`}
              </p>
              {isLaptop && <p className="inline-block">지구를 지키는</p>}
            </div>
            {/* 두번째 줄 */}
            <div>
              <p className="inline-block">
                {isDesktop
                  ? "당신의 일상에서 환경을 지키는"
                  : "우리의 작은 노력으로부터 출발합니다. 당신의 일상에서 환경을"}
              </p>
              {isLaptop && <p className="inline-block mr-2">지키는 작은 </p>}
              <p className="inline-block text-with-background bg-text-bg-2 bg-cover bg-center rounded-full text-white desktop:pt-1 mr-2 desktop:w-[444px] desktop:h-[60px]">
                {isDesktop
                  ? "작은 습관들이 모여 큰 변화를"
                  : "습관들이 모여 큰 변화를"}
              </p>
              <p className="inline-block">이끌어낼 수 있습니다.</p>
              {/* 3~4번째 줄 */}
              <p className="inline-block">
                {isDesktop
                  ? `우리의 목표는 모든 사람이 쉽게 실천할 수 있는 환경 보호 방법을
            제시하고, 그것들을 실제 행동으로
            ${(<br />)} 이어지게 하는 것입니다. 이제 당신의 일상을 환경 보호의
            일부로 만들어보세요.`
                  : `이제 우리의 캠페인에 참여하여 당신도 환경 보호의 일원이
            되어보세요.`}
              </p>
              {isLaptop && (
                <>
                  <p className="inline-block">
                    우리의 목표는 모든 사람이 쉽게 실천할 수 있는
                  </p>
                  <p className="inline-block">
                    환경 보호 방법을 제시하고, 그것들을 실제 행동으로 이어지게
                  </p>
                  <p className="inline-block">
                    하는 것입니다. 이제 당신의 일상을 환경 보호의 일부로
                    만들어보세요.
                  </p>
                </>
              )}
            </div>
            {/* 마지막 2문장 */}
            <div>
              <p className="inline-block">지금 바로</p>
              <p className="inline-block text-with-background bg-text-bg-3 bg-cover bg-center rounded-full text-white desktop:pt-1 mx-2 desktop:w-[370px] desktop:h-[60px]">
                '지구가 숨쉬다. SOOM'
              </p>
              <p className="inline-block">
                {isDesktop
                  ? " 에 참여하여 우리의 지구를 함께 지켜 나가는 데 기여하세요."
                  : "에 참여하여"}
              </p>
              <p className="inline-block">
                {isDesktop
                  ? "당신의 작은 노력이 큰 변화를 만들어낼 수 있습니다. 함께해요!"
                  : "우리의 지구를 함께 지켜나가는 데 기여하세요."}
              </p>
              {isLaptop && (
                <p className="inline-block">
                  당신의 작은 노력이 큰 변화를 만들어낼 수 있습니다. 함께해요!
                </p>
              )}
            </div>
          </div>
        </div>
        {/* third part - 카드 4장 */}
        <div className="flex flex-col  mx-auto items-center desktop:w-[80%] desktop:h-[1344px] desktop:mb-[730px] laptop:w-[885px] laptop:h-[1317px] laptop:mb-[500px]">
          <div>
            <div className={`flex ${isLaptop && "justify-end"}`}>
              {/* 카드 1 */}
              <div className="flex flex-col justify-between bg-white rounded-[40px] border-1.5 desktop:w-[450px] desktop:h-[590px] desktop:mb-[170px] desktop:mr-[40px] desktop:py-[45px] desktop:px-[60px] laptop:w-[434px] laptop:h-[572px] laptop:mb-[173px] laptop:mr-[18px] laptop:py-[45px] laptop:px-[60px]">
                <span className="font-[Italiana] text-[40px] text-[#3A3A3A] ">
                  (1) Join us
                </span>
                <span className="text-[#3A3A3A] text-[16px] font-[Pretendard-ExtraLight]">
                  첫 방문이라면, 회원가입하기. 하루 1번 로그인을
                  <br />
                  하면 포인트를 적립할 수 있습니다.
                </span>
              </div>
              {/* 카드 2 */}
              <div className="relative desktop:w-[450px] desktop:h-[590px] desktop:rounded-[30px] desktop:mt-[140px] desktop:mb-[30px] laptop:w-[434px] laptop:h-[572px] laptop:rounded-[40px] laptop:mt-[135px] laptop:mb-[38px]">
                <Image
                  src={cardBg1}
                  alt="card1"
                  className="w-full h-full object-cover rounded-[40px] brightness-[.8]"
                />
                <div className="absolute flex flex-col justify-between inset-0 desktop:top-[53px] desktop:bottom-[53px] desktop:left-[60px] laptop:top-[45px] laptop:bottom-[45px] laptop:left-[50px]">
                  <span className="font-[Italiana] text-[40px] text-white">
                    (2) Take
                    <br /> green-action
                  </span>
                  <span className="text-white text-[16px] font-[Pretendard-ExtraLight]">
                    본인이 직접 실천 캠페인을 열어 함께 행동해보세요.
                    <br /> 글 업로드시 포인트를 적립할 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              {/* 카드 3 */}
              <div className="relative rounded-[40px] desktop:bg-white desktop:w-[450px] desktop:h-[590px]  desktop:ml-[360px] desktop:mr-[40px] laptop:w-[434px] laptop:h-[572px] laptop:mr-[18px]">
                <Image
                  src={cardBg2}
                  alt="card1"
                  className="w-full h-full object-cover rounded-[40px] brightness-[.8]"
                />
                <div className="absolute flex flex-col justify-between inset-0 desktop:top-[53px] desktop:bottom-[53px] desktop:left-[60px] laptop:top-[45px] laptop:bottom-[45px] laptop:left-[54px]">
                  <span className="font-[Italiana] text-[40px] text-white">
                    {isDesktop ? (
                      <>
                        (3) Share your
                        <br />
                        experience
                      </>
                    ) : (
                      <>
                        (3) Share
                        <br />
                        your
                        <br />
                        experience
                      </>
                    )}
                  </span>
                  <span className="text-white text-[16px] font-[Pretendard-ExtraLight]">
                    green-action을 실천했다면, community에 글을
                    <br /> 업로드해보세요. 또한, 다른 greener의 게시글에
                    <br /> 댓글을 달면 포인트를 포인트를 드립니다.
                  </span>
                </div>
              </div>
              {/* 카드 4 */}
              <div className="flex flex-col justify-between bg-white border-1.5 rounded-[40px] desktop:w-[450px] desktop:h-[590px]  desktop:py-[53px] desktop:px-[60px] laptop:w-[434px] laptop:h-[572px] laptop:py-[45px] laptop:px-[54px]">
                <span className="font-[Italiana] text-[40px] text-[#3A3A3A]">
                  (4) Practice in <br />
                  daily life
                </span>
                <span className="text-[#3A3A3A] text-[16px] font-[Pretendard-ExtraLight]">
                  일상에서 꾸준히 실천한 당신! 자동으로 쌓인
                  <br />
                  포인트로 친환경 소재의 굿즈를 구매할 수 있습니다.
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
            className="mx-auto rounded-[50px] mb-[40px] object-cover desktop:w-[1844px] desktop:h-[882px] laptop:w-[955px] laptop:h-[879px]"
          />
          <span
            style={{ transform: `translateY(-${position / 100}vh` }}
            className="absolute font-[Italiana] text-white text-[48px] inset-0 desktop:top-[800px] laptop:top-[650px]"
          >
            Experience the earth breathing together <br />
            in your daily life
          </span>
          <div
            style={{ transform: `translateY(-${position / 100}vh` }}
            className="absolute inset-x-0 desktop:bottom-[-120px] laptop:bottom-[-10px] flex items-center justify-center text-white text-[20px] font-[Inter]"
          >
            <Link
              href="/individualAction"
              className="flex items-center justify-center rounded-full border-1 border-white w-[200px] h-[50px]"
            >
              Explore more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AboutComputerSize);
