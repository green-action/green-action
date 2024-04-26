import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardBg1 from "../../_assets//image/about/2.png";
import cardBg2 from "../../_assets//image/about/3.png";
import mainImg from "../../_assets//image/about/main.png";
import titleImg from "../../_assets/image/about/1.png";
import TopButton from "../TopButton";

const AboutMobileSize = ({ position }: { position: number }) => {
  return (
    <>
      <div className="min-w-[360px] mx-auto">
        <TopButton />
        <div className="flex flex-col items-center">
          <Image
            src={titleImg}
            alt="about title image"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[360px] h-[598px] object-cover mx-auto mb-[282px] brightness-[.4]"
          />

          <div
            style={{ transform: `translateY(-${position / 30}vh` }}
            className="z-0 mt-[240px] flex flex-col w-[280px] items-center text-white text-[32px] font-thin"
          >
            <p className="font-['Italiana']">Experience the earth</p>
            <p className="font-['Italiana']">breathing together</p>
            <p className="font-['Italiana']">in your daily life</p>
          </div>
        </div>
        <div className="mt-[240px] mb-[205px] flex flex-col items-center">
          {/* second part - 설명글 */}
          <div className="w-[300px] flex flex-col justify-center text-center text-[16px] font-semibold">
            {/* 첫 줄 */}
            <div>
              <p className="inline-block text-with-background bg-text-bg-1 bg-cover bg-center rounded-full text-white w-[195px] h-[28px] mr-1">
                '일상에서 쉽게 실천할 수 있는
              </p>
              <p className="inline-block mr-2">환경 캠페인'은</p>
            </div>
            {/* 2-3 줄 */}
            <div>
              <p className="inline-block">
                지구를 지키는 우리의 작은 노력으로부터
              </p>
              <p className="inline-block">
                출발합니다. 당신의 일상에서 환경을 지키는
              </p>

              {/* 4 줄 */}
              <p className="inline-block mr-1">작은</p>
              <p className="inline-block text-with-background bg-text-bg-2 bg-cover bg-center rounded-full text-white w-[165px] h-[28px] mr-1">
                습관들이 모여 큰 변화를
              </p>
              <p className="inline-block">이끌어낼 수</p>
            </div>
            {/* 마지막 2문장 */}
            <div>
              <p className="inline-block">
                있습니다. 이제 우리의 캠페인에 참여하여
              </p>
              <p className="inline-block">
                당신도 환경 보호의 일원이 되어보세요.
              </p>
              <p className="inline-block">
                우리의 목표는 모든 사람이 쉽게 실천할 수 있는
              </p>
              <p className="inline-block">
                환경 보호 방법을 제시하고, 그것들을 실제
              </p>
              <p className="inline-block">
                행동으로 이어지게 하는 것입니다. 이제 당신의
              </p>
              <p className="inline-block">
                일상을 환경 보호의 일부로 만들어보세요.
              </p>
              <p className="inline-block">지금 바로</p>
              <p className="inline-block text-with-background bg-text-bg-3 bg-cover bg-center rounded-full text-white mx-1 laptop:w-[330px] laptop:h-[47px]">
                '지구가 숨쉬다. SOOM'
              </p>
              <p className="inline-block mr-1">에 참여하여 </p>
              <p className="inline-block">
                우리의 지구를 함께 지켜나가는 데 기여하세요.
              </p>
              <p className="inline-block">당신의 작은 노력이 큰 변화를</p>
              <p className="inline-block">만들어낼 수 있습니다. 함께해요!</p>
            </div>
          </div>
        </div>
        {/* third part - 카드 4장 */}
        <div className="mx-auto w-[265px] h-[1445px] mb-[147px]">
          {/* 360 카드 1 */}
          <div className="border-1.5 flex flex-col h-[346px] mb-[17px] justify-between bg-white rounded-[40px] py-[28px] px-[33px]">
            <span className="font-[Italiana] text-[32px] text-[#3A3A3A]">
              (1) Join us
            </span>
            <span className="text-[#3A3A3A] text-[13px] font-[Pretendard-ExtraLight]">
              첫 방문이라면, 회원가입하기. 하루 <br />
              1번 로그인을 하면 포인트를 적립
              <br /> 할 수 있습니다.
            </span>
          </div>
          {/* 360 카드 2 */}
          <div
            className="relative h-[346px] mb-[17px]"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <Image
              src={cardBg1}
              alt="card1"
              className="w-full h-full object-cover rounded-[40px] brightness-[.8]"
            />
            <div className="absolute flex flex-col justify-between inset-0 top-[24px] bottom-[32px] left-[32px]">
              <span className="font-[Italiana] text-[32px] text-white">
                (2) Take
                <br /> green-action
              </span>
              <span className="text-white text-[13px] font-[Pretendard-ExtraLight]">
                본인이 직접 실천 캠페인을 열어 함께
                <br /> 행동해보세요. 글 업로드시 포인트를
                <br /> 적립할 수 있습니다.
              </span>
            </div>
          </div>
          {/* 360 카드 3 */}
          <div
            className="relative h-[346px] mb-[17px]"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <Image
              src={cardBg2}
              alt="card2"
              className="w-full h-full object-cover rounded-[40px] brightness-[.8]"
            />
            <div className="absolute flex flex-col justify-between inset-0 top-[27px] bottom-[27px] left-[30px]">
              <span className="font-[Italiana] text-[32px] text-white">
                (3) Share <br />
                your
                <br /> experience
              </span>
              <span className="text-white text-[13px] font-[Pretendard-ExtraLight]">
                Green-action을 실천했다면,
                <br /> community에 글을 업로드해보세요.
                <br /> 또한, 다른 greener의 게시글에 댓글을
                <br />
                달면 포인트를 드립니다.
              </span>
            </div>
          </div>
          {/* 360 카드 4 */}
          <div className="border-1.5 flex flex-col h-[346px] mb-[17px] justify-between bg-white rounded-[40px] py-[28px] px-[33px]">
            <span className="font-[Italiana] text-[32px] text-[#3A3A3A]">
              (4) <br /> Practice <br />
              in daily <br /> life
            </span>
            <span className="text-[#3A3A3A] text-[13px] font-[Pretendard-ExtraLight]">
              일상에서 꾸준히 실천한 당신. <br />
              자동으로 쌓인 포인트로 친환경 소재의
              <br />
              굿즈를 구매할 수 있습니다.
            </span>
          </div>
        </div>

        {/* last part - 하단 이미지, 'explore more' 버튼  */}
        <div className="relative text-center">
          <Image
            src={mainImg}
            alt="explore more image"
            className="w-[360px] h-[714px] mx-auto object-cover"
          />
          <span
            style={{ transform: `translateY(-${position / 30}vh` }}
            className="absolute font-[Italiana] text-white text-[24px] inset-0 top-[695px]"
          >
            Experience the earth <br /> breathing together <br /> in your daily
            life
          </span>
          <div
            style={{ transform: `translateY(-${position / 30}vh` }}
            className="absolute inset-x-0 bottom-[-195px] flex items-center justify-center text-white text-[15px] font-[Inter] font-semibold"
          >
            <Link
              href="/individualAction"
              className="flex items-center justify-center rounded-[24px] border-1 border-white w-[153px] h-[50px]"
            >
              Explore more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AboutMobileSize);
