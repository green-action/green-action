"use client";
import React from "react";
import Goods from "../_components/goods/Goods";
import { useResponsive } from "../_hooks/responsive";

const GoodsPage = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  return (
    <div className="desktop:mx-auto desktop:mt-[55px] laptop:mt-[90px]">
      <div className="desktop:w-[1752px] laptop:w-[1020px] laptop:px-[56px] mx-auto">
        <p className="font-['Italiana'] desktop:text-[96px] desktop:mb-[11px] laptop:text-[75px]">
          ECO GOODS PRODUCT
        </p>
        {isDesktop && (
          <div className="text-[13px] text-[#929292]">
            <p>포인트를 쌓고 친환경소재로 제작된</p>
            <p>굿즈 상품을 구매해 보세요!</p>
          </div>
        )}
        {isLaptop && (
          <div className="text-[13px] text-[#929292]">
            <p>포인트를 쌓고 친환경소재로 제작된 굿즈 상품을 구매해 보세요!</p>
          </div>
        )}
        <Goods />
      </div>
      {isDesktop && (
        <div className="bg-[#D4D4D4] mt-[530px] h-[706px]">
          <div className="flex justify-between w-[1920px] h-[706px] mx-auto pl-[99px]">
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
            <div className="border-blue-100 border-2 desktop:w-[1195px]">
              오
            </div>
          </div>
        </div>
      )}
      {isLaptop && (
        <div className="mt-[567px] h-[1026px]">
          <div className="ml-[85px] mb-[185px]">
            <div className="font-['Italiana'] text-[48px] h-[82px]">ABOUT</div>
            <div className="w-[465px] text-[13px] font-medium">
              <p>
                ECO GOODS는 SOOM에서 자체 개발한 상품으로 친환경 소재 업체와
                협력하여 제작
              </p>
              <p>
                되었습니다. SOOM 서비스 내에서 실행하는 적립 포인트로 구매가능한
                상품입니다.
              </p>
            </div>
          </div>
          <div className="border-blue-100 border-2 h-[706px]">오</div>
        </div>
      )}
    </div>
  );
};

export default GoodsPage;
