"use client";
import setbox from "@/app/_assets/image/goods/setbox.png";
import Image from "next/image";
import TopButton from "../_components/TopButton";
import Goods from "../_components/goods/Goods";
import { useResponsive } from "../_hooks/responsive";

const GoodsPage = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  return (
    <div className="desktop:mx-auto desktop:mt-[55px] laptop:mt-[90px] mt-[70px]">
      <TopButton />
      <div className="desktop:w-[1752px] laptop:w-[1020px] w-[296px] mx-auto">
        <p className="font-['Italiana'] desktop:text-[96px] desktop:mb-[11px] desktop:ml-0 laptop:text-[75px] laptop:mx-[56px] text-[36px] mb-[13px]">
          ECO GOODS PRODUCT
        </p>
        {isDesktop && (
          <div className="text-[13px] text-[#929292]">
            <p>포인트를 쌓고 친환경소재로 제작된</p>
            <p>굿즈 상품을 구매해 보세요!</p>
          </div>
        )}
        {isLaptop && (
          <div className="text-[13px] text-[#929292] mx-[56px]">
            <p>포인트를 쌓고 친환경소재로 제작된 굿즈 상품을 구매해 보세요!</p>
          </div>
        )}
        {isMobile && (
          <div className="text-[11px] text-[#929292] mx-[5px]">
            <p>포인트를 쌓고 친환경소재로 제작된</p>
            <p>굿즈 상품을 구매해 보세요!</p>
          </div>
        )}
        <Goods />
      </div>
      {isDesktop && (
        <div className="bg-[#D4D4D4] mt-[530px] h-[708px]">
          <div className="flex justify-between w-[1920px] h-[708px] mx-auto pl-[99px]">
            <div className="mt-[353px]">
              <div className="font-['Italiana'] text-[48px] desktop:mb-[70px]">
                ABOUT
              </div>
              <div className="w-[465px] text-[13px] font-medium text-[#929292]">
                <p>
                  ECO GOODS는 SOOM에서 자체 개발한 상품으로 친환경 소재 업체와
                  협력하여 제작
                </p>
                <p>
                  되었습니다. SOOM 서비스 내에서 실행하는 적립 포인트로
                  구매가능한 상품입니다.
                </p>
              </div>
            </div>
            <div className="desktop:w-[1195px]">
              <Image
                src={setbox}
                alt="제품전체사진"
                className="w-[1325px] h-[708px] object-cover"
              />
            </div>
          </div>
        </div>
      )}
      {isLaptop && (
        <div>
          <div className="w-[1020px] mt-[567px] mx-auto">
            <div className="ml-[85px] mb-[185px] w-[500px]">
              <div className="font-['Italiana'] text-[48px] h-[82px]">
                ABOUT
              </div>
              <div className="w-[465px] text-[13px] font-medium">
                <p>
                  ECO GOODS는 SOOM에서 자체 개발한 상품으로 친환경 소재 업체와
                  협력하여 제작
                </p>
                <p>
                  되었습니다. SOOM 서비스 내에서 실행하는 적립 포인트로
                  구매가능한 상품입니다.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#d4d4d4]">
            <Image
              src={setbox}
              alt="제품전체사진"
              className="w-[1020px] h-[706px] mx-auto object-cover"
            />
          </div>
        </div>
      )}
      {isMobile && (
        <div className="bg-[#D9D9D9] w-[360px] h-[740px] mt-[65px] mx-auto">
          <div className="mx-auto">
            <div className="ml-[41px] mb-[140px] pt-[80px]">
              <div className="font-['Italiana'] text-[40px] h-[82px]">
                ABOUT
              </div>
              <div className="w-[258px] text-[12px] font-medium text-[#929292]">
                <p>ECO GOODS는 SOOM에서 자체 개발한 상품으로</p>
                <p>친환경 소재 업체와 협력하여 제작되었습니다.</p>
                <p>SOOM 서비스 내에서 실행하는 적립 포인트로 구매</p>
                <p>가능한 상품입니다.</p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={setbox}
              alt="제품전체사진"
              className="w-[360px] h-[261px] mx-auto object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodsPage;
