"use client";
import React, { useEffect, useRef } from "react";
// const { kakao } = window; 에러
const KakakoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Kakao 안됨?
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
    });
  }, []);

  return <div id="map" ref={mapRef} className="w-[500px] h-[400px]"></div>;
};

export default KakakoMap;
