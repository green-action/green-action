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
            className="z-0 flex flex-col items-center text-white text-[59px] font-semibold desktop:mt-[300px] laptop:w-[100%] laptop:mt-[335px]"
          >
            <p className="font-['Pretendard']">
              {isDesktop ? "환경을 위한 실천," : "환경을 위한 실천,"}
            </p>
            <p className="font-['Pretendard']">
              {isDesktop ? "내일을 향한 변화, 숨" : "내일을 향한 변화, 숨"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center desktop:mt-[700px] laptop:mt-[505px]">
          <div className="flex flex-col justify-center text-center  mx-auto font-bold desktop:text-[36px] desktop:mb-[420px] desktop:w-[1426px] laptop:text-[30px] laptop:mb-[330px] w-[852px]">
            <p>나의 그린 라이프 실천 내역을 한눈에 보고 한번에 찾으세요.</p>
            <p>환경을 위한 첫걸음을 함께 쉽고 재밌게 할 수 있는 서비스</p>
            <p>숨과 함께라면 당신의 일상이 새로워질 거예요.</p>
          </div>
        </div>
        {/* third part - 카드 4장 */}
        <div className="flex flex-col  mx-auto items-center desktop:w-[80%] desktop:h-[1344px] desktop:mb-[730px] laptop:w-[885px] laptop:h-[1317px] laptop:mb-[500px]">
          <div>
            <div className={`flex ${isLaptop && "justify-end"}`}>
              {/* 카드 1 */}
              <div className="flex flex-col justify-between bg-white rounded-[40px] border-1.5 desktop:w-[450px] desktop:h-[590px] desktop:mb-[170px] desktop:mr-[40px] desktop:py-[45px] desktop:px-[60px] laptop:w-[434px] laptop:h-[572px] laptop:mb-[173px] laptop:mr-[18px] laptop:py-[45px] laptop:px-[60px]">
                <div className="flex flex-col">
                  <span className="flex gap-2 text-[#BFBFBF] text-[18px]">
                    함께 실천 <p className="text-[#3A3A3A]">시작하기</p>
                  </span>

                  <span className="font-[Italiana] text-[40px] text-[#3A3A3A] mt-5">
                    (1) Join us
                  </span>
                </div>
                <span className="text-[#646464] desktop:text-[22px] laptop:text-[20px] mt-56 mb-5">
                  첫 방문이라면, 회원가입 후 로그인
                  <br />
                  하면 포인트를 적립할 수 있어요.
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
                  <div className="flex flex-col">
                    <span className="flex gap-2 text-[#BFBFBF] text-[18px]">
                      함께 실천 <p className="text-white">실행하기</p>
                    </span>
                    {/* font-[Pretendard-ExtraLight] */}
                    <span className="font-[Italiana] text-[40px] text-white mt-5">
                      (2) Take
                      <br /> green-action
                    </span>
                  </div>
                  <span className="text-white desktop:text-[22px] laptop:text-[20px]">
                    본인이 직접 실천 캠페인을 열어 함께
                    <br /> 행동해보세요. 글 업로드 하여 포인트
                    <br />를 받아보세요.
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
                  <div className="flex flex-col">
                    <span className="flex gap-2 text-[#BFBFBF] text-[18px]">
                      함께 실천 <p className="text-white">나누기</p>
                    </span>
                    <span className="font-[Italiana] text-[40px] text-white mt-5">
                      (3) Share
                      <br />
                      experience
                    </span>
                  </div>
                  <span className="text-white desktop:text-[22px] laptop:text-[20px]">
                    일상에서 실천한 글을 업로드 해보세요.
                    <br /> 다른 greener의 게시글에 댓글을 달아
                    <br /> 포인트를 받아보세요.
                  </span>
                </div>
              </div>
              {/* 카드 4 */}
              <div className="flex flex-col justify-between bg-white border-1.5 rounded-[40px] desktop:w-[450px] desktop:h-[590px]  desktop:py-[53px] desktop:px-[60px] laptop:w-[434px] laptop:h-[572px] laptop:py-[45px] laptop:px-[54px]">
                <div className="flex flex-col">
                  <span className="flex gap-2 text-[#BFBFBF] text-[18px]">
                    함께 실천 <p className="text-[#3A3A3A]">지속하기</p>
                  </span>
                  <span className="font-[Italiana] text-[40px] text-[#3A3A3A] mt-5">
                    (4) Practice in <br />
                    daily life
                  </span>
                </div>
                <span className="text-[#646464]  desktop:text-[22px] laptop:text-[20px] mt-55">
                  일상에서 꾸준히 실천하며 쌓은 포인트
                  <br />
                  로 친환경 소재로 만든 숨 굿즈를 구매
                  <br />할 수 있어요.
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
            className="absolute font-semibold text-white desktop:text-[59px] laptop:text-[48px] inset-0 desktop:top-[700px] laptop:top-[550px]"
          >
            환경을 위한 첫걸음 <br />
            숨에서 쉽고 재밌게
          </span>
          <div
            style={{ transform: `translateY(-${position / 100}vh` }}
            className="absolute inset-x-0 desktop:bottom-[-120px] laptop:bottom-[70px] flex items-center justify-center text-white text-[20px] font-[Inter]"
          >
            <Link
              href="/individualAction"
              className="flex items-center justify-center rounded-full border-1 border-white desktop:w-[200px] laptop:w-[168px] h-[50px] laptop:text-[15px]"
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
