"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import type { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";
import React, { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ placeInfo }: { placeInfo: placeCoordinateType }) => {
  const { x, y } = placeInfo as placeCoordinateType;
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const detailMapLink = `https://map.kakao.com/link/map/${placeInfo.placeName},${y},${x}`;
  const showDirectLink = `https://map.kakao.com/link/to/${placeInfo.placeName},${y},${x}`;

  useEffect(() => {
    setPosition({ lat: Number(y), lng: Number(x) });
  }, [placeInfo, x, y]);

  return (
    <>
      {/* 카카오맵 api - react sdk 라이브러리 사용 */}
      <Map center={position} level={4} className="w-full h-full rounded-2xl">
        <MapMarker position={position} />
        <CustomOverlayMap position={position}>
          {isDesktop && (
            // <div className="absolute z-10 right-[13%] bottom-[15%]"> 이렇게 하니 화면크기에따라 위치 많이 바뀜
            <div className="desktop:min-w-[170px] desktop:h-[75px] rounded-2xl bg-white/[88%] border-[2px] border-[#5D5D5D]/[40%] p-2 flex flex-col gap-[5px] justify-center items-center mt-[95px]">
              <p className="font-bold desktop:text-[15px]">
                {placeInfo.placeName}
              </p>
              <div className="flex desktop:gap-[30px] desktop:text-[14.5px]">
                <a
                  href={detailMapLink}
                  target="_blank"
                  className="text-[#5D5D5D] hover:text-black font-semibold"
                >
                  큰지도보기
                </a>
                <a
                  href={showDirectLink}
                  target="_blank"
                  className="text-[#5D5D5D] hover:text-black font-semibold"
                >
                  길찾기
                </a>
              </div>
            </div>
            // </div>
          )}
          {isLaptop && (
            <div className="min-w-[100px] h-[49px] rounded-xl  bg-white/[88%] border-[2px]  border-[#5D5D5D]/[40%] p-2 flex flex-col justify-center items-center mt-[85px]">
              <p className="font-bold laptop:text-[13px]">
                {placeInfo.placeName}
              </p>
              <div className="flex laptop:gap-[20px] laptop:text-[12.5px]">
                <a
                  href={detailMapLink}
                  target="_blank"
                  className="text-[#1E1E1E] hover:text-[#797979]"
                >
                  큰지도보기
                </a>
                <a
                  href={showDirectLink}
                  target="_blank"
                  className="text-[#1E1E1E] hover:text-[#797979]"
                >
                  길찾기
                </a>
              </div>
            </div>
          )}
          {isMobile && (
            <div className="min-w-[95px] h-[43px] rounded-xl  bg-white/[88%] border-[2px]  border-[#5D5D5D]/[40%] p-1 flex flex-col items-center mt-[90px]">
              <p className="font-bold text-[11px]">{placeInfo.placeName}</p>
              <div className="flex gap-[6px] text-[10.5px]">
                <a
                  href={detailMapLink}
                  target="_blank"
                  className="text-[#1E1E1E] hover:text-[#797979]"
                >
                  큰지도보기
                </a>
                <a
                  href={showDirectLink}
                  target="_blank"
                  className="text-[#1E1E1E] hover:text-[#797979]"
                >
                  길찾기
                </a>
              </div>
            </div>
          )}
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default KakaoMap;
