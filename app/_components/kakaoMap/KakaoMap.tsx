"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import type { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";

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
        <CustomOverlayMap
          position={position} // 커스텀 오버레이가 나타날 위치
        >
          {isDesktop && (
            <div className="desktop:min-w-[170px] desktop:h-[60px] rounded-2xl bg-white/[88%] desktop:mb-[150px] border-[2px] border-[#5D5D5D]/[40%] p-2 flex flex-col items-center">
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
          )}
          {isLaptop && (
            <div className="min-w-[100px] h-[49px] mb-[123px] rounded-xl bg-[#D2DED0]/90 border-[2px] border-white p-2 flex flex-col items-center">
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
            <div className="min-w-[90px] h-[38px] mb-[115px] rounded-xl bg-[#D2DED0]/90 border-[2px] border-white p-1 flex flex-col items-center">
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
          <MapMarker position={position} />
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default KakaoMap;
