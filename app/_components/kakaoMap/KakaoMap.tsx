"use client";

import { useEffect, useState } from "react";
import { useResponsive } from "@/app/_hooks/responsive";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import type {
  KakaoMapProps,
  PlaceCoordinateType,
} from "@/app/_types/individualAction-detail/individualAction-detail";

const KakaoMap: React.FC<KakaoMapProps> = ({ placeInfo }) => {
  const { x, y } = placeInfo as PlaceCoordinateType;
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const detailMapLink = `${
    placeInfo.placeId
      ? `https://map.kakao.com/link/map/${placeInfo.placeId}`
      : `https://map.kakao.com/link/map/${placeInfo.placeName},${y},${x}`
  } `;

  useEffect(() => {
    setPosition({ lat: Number(y), lng: Number(x) });
  }, [placeInfo, x, y]);

  return (
    <>
      <Map center={position} level={4} className="w-full h-full rounded-2xl">
        <MapMarker position={position} />
        <CustomOverlayMap position={position}>
          {isDesktop && (
            <div className="desktop:min-w-[170px] desktop:h-[75px] rounded-2xl bg-white/[88%] border-[2px] border-[#5D5D5D]/[40%] p-2 flex flex-col gap-[5px] justify-center items-center mt-[95px]">
              <p className="font-bold desktop:text-[15px]">
                {placeInfo.placeName}
              </p>
              <a
                href={detailMapLink}
                target="_blank"
                className="text-[#5D5D5D] hover:text-black font-semibold desktop:text-[14.5px]"
              >
                큰지도보기
              </a>
            </div>
          )}
          {isLaptop && (
            <div className="min-w-[100px] h-[49px] rounded-xl  bg-white/[88%] border-[2px]  border-[#5D5D5D]/[40%] p-2 flex flex-col justify-center items-center mt-[85px]">
              <p className="font-bold laptop:text-[13px]">
                {placeInfo.placeName}
              </p>
              <a
                href={detailMapLink}
                target="_blank"
                className="text-[#1E1E1E] hover:text-[#797979] laptop:text-[12.5px]"
              >
                큰지도보기
              </a>
            </div>
          )}
          {isMobile && (
            <div className="min-w-[95px] h-[43px] rounded-xl  bg-white/[88%] border-[2px]  border-[#5D5D5D]/[40%] p-1 flex flex-col items-center mt-[90px]">
              <p className="font-bold text-[11px]">{placeInfo.placeName}</p>
              <a
                href={detailMapLink}
                target="_blank"
                className="text-[#1E1E1E] hover:text-[#797979] text-[10.5px]"
              >
                큰지도보기
              </a>
            </div>
          )}
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default KakaoMap;
