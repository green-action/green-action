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
            className="z-0 mt-[240px] flex flex-col w-[280px] items-center text-white text-[32px] font-semibold"
          >
            <p className="">환경을 위한 실천,</p>
            <p className="">내일을 향한 변화, 숨</p>
          </div>
        </div>
        <div className="mt-[350px] mb-[205px] flex flex-col items-center">
          <div className="w-[300px] flex flex-col justify-center text-center text-[20px] font-medium">
            <p>나의 그린 라이프 실천 내역을</p>
            <p>한눈에 보고 한번에 찾으세요.</p>
            <p>환경을 위한 첫걸음을 함께 쉽고 </p>
            <p>재밌게 할 수 있는 서비스.</p>
            <p>숨과 함께라면 당신의 일상이</p>
            <p>새로워질 거예요.</p>
          </div>
        </div>
        <div className="mx-auto w-[265px] h-[1445px] mb-[147px]">
          <div className="border-1.5 flex flex-col h-[346px] mb-[17px] justify-between bg-white rounded-[40px] py-[28px] px-[33px]">
            <div className="flex flex-col">
              <span className="flex gap-1 text-[#BFBFBF] text-[13px]">
                함께 실천 <p className="text-[#3A3A3A]">시작하기</p>
              </span>

              <span className="font-[Italiana] text-[32px] text-[#3A3A3A] mt-3">
                (1) Join us
              </span>
            </div>
            <span className="text-[#646464] text-[14px] mb-2">
              첫 방문이라면, 회원가입 후 로그인
              <br />
              하면 포인트를 적립할 수 있어요.
            </span>
          </div>
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
              <div className="flex flex-col">
                <span className="flex gap-1 text-[#BFBFBF] text-[13px]">
                  함께 실천 <p className="text-white">실행하기</p>
                </span>
                <span className="font-[Italiana] text-[32px] text-white mt-3">
                  (2) Take
                  <br /> green-action
                </span>
              </div>
              <span className="text-white text-[14px]">
                본인이 직접 실천 캠페인을 열어 함께
                <br /> 행동해보세요. 글 업로드 하여 포인트
                <br />를 받아보세요.
              </span>
            </div>
          </div>
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
              <div className="flex flex-col">
                <span className="flex gap-2 text-[#BFBFBF] text-[13px]">
                  함께 실천 <p className="text-white">나누기</p>
                </span>
                <span className="font-[Italiana] text-[32px] text-white mt-3">
                  (3) Share
                  <br /> experience
                </span>
              </div>
              <span className="text-white text-[14px]">
                일상에서 실천한 글을 업로드 해보세요.
                <br /> 다른 greener의 게시글에 댓글을 달아
                <br /> 포인트를 받아보세요.
              </span>
            </div>
          </div>
          <div className="border-1.5 flex flex-col h-[346px] mb-[17px] justify-between bg-white rounded-[40px] py-[28px] px-[33px]">
            <div className="flex flex-col">
              <span className="flex gap-2 text-[#BFBFBF] text-[13px]">
                함께 실천 <p className="text-[#3A3A3A]">지속하기</p>
              </span>
              <span className="font-[Italiana] text-[32px] text-[#3A3A3A] mt-3">
                (4) <br /> Practice in <br />
                daily life
              </span>
            </div>
            <span className="text-[#646464] text-[13px] mb-2">
              일상에서 꾸준히 실천하며 쌓은 포인트
              <br />
              로 친환경 소재로 만든 숨 굿즈를 구매
              <br />할 수 있어요.
            </span>
          </div>
        </div>

        <div className="relative text-center">
          <Image
            src={mainImg}
            alt="explore more image"
            className="w-[360px] h-[714px] mx-auto object-cover"
          />
          <span
            style={{ transform: `translateY(-${position / 30}vh` }}
            className="absolute  text-white text-[36px] inset-0 top-[1000px] font-semibold"
          >
            환경을 위한 첫걸음 <br /> 숨에서 쉽고 재밌게
          </span>
          <div
            style={{ transform: `translateY(-${position / 30}vh` }}
            className="absolute inset-x-0 bottom-[-455px] flex items-center justify-center text-white text-[15px] font-[Inter] font-semibold"
          >
            <Link
              href="/individualAction"
              className="flex items-center justify-center rounded-[24px] border-1 border-white w-[141px] h-[41px]"
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
