import React from "react";
import Goods from "../_components/goods/Goods";

const GoodsPage = () => {
  return (
    <div className="w-[1920px] mx-auto mt-[165px] border-2 border-red-400">
      <div className="w-[1752px] mx-[85px] border-2">
        <p className="font-['Italiana'] text-[96px] mb-[11px]">
          ECO GOODS PRODUCT
        </p>
        <div className="text-[13px] text-[#929292]">
          <p>포인트를 쌓고 친환경소재로 제작된</p>
          <p>굿즈 상품을 구매해 보세요!</p>
        </div>
        <Goods />
      </div>
      <div className="mt-[530px] h-[708px] bg-[#D4D4D4] flex justify-between">
        <div className="mt-[353px] ml-[99px]">
          <div className="font-['Italiana'] text-[48px] mb-[70px]">ABOUT</div>
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
        <div className="border-blue-100 border-2 w-[1195px]">오</div>
      </div>
    </div>
  );
};

export default GoodsPage;
