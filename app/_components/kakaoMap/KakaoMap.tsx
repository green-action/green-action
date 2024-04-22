"use client";
import type { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";
import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
// const { kakao } = window; // 에러

const KakaoMap = ({
  placeInfo,
}: // activityLocationMap,
{
  placeInfo: placeCoordinateType;
  // activityLocationMap?: string;
}) => {
  const { x, y } = placeInfo as placeCoordinateType;
  // const position = { lat: Number(y), lng: Number(x) };

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const mapContainer = useRef<HTMLDivElement>(null); // 보류

  // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  // ${activityLocationMap} justify-content:center;
  let iwContent = `<div style="padding:6px; width:133px;">
    <a href="https://map.kakao.com/link/map/${placeInfo.placeName},${y},${x}" style = "font-size: 14px; color:#89997b" target = "_blank">큰지도보기</a> &emsp; <a href="https://map.kakao.com/link/to/${placeInfo.placeName},${y},${x}" style="font-size: 14px; color:#89997b;" target="_blank">길찾기</a></div>`;

  // const iwContent = `<div className="rounded">큰지도</div>`;
  // className - tailwind css 안먹힘

  const detailMapLink = `https://map.kakao.com/link/map/${placeInfo.placeName},${y},${x}`;
  const showDirectLink = `https://map.kakao.com/link/to/${placeInfo.placeName},${y},${x}`;

  useEffect(() => {
    setPosition({ lat: Number(y), lng: Number(x) });

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        // var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // z index 수정?

        var options = {
          center: new window.kakao.maps.LatLng(y, x),
          level: 5,
        };

        var map = new window.kakao.maps.Map(mapContainer.current, options);

        // 이미지 지도에서 마커가 표시될 위치
        var markerPosition = new window.kakao.maps.LatLng(y, x);

        // 이미지 지도에 표시할 마커
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // const iwPosition = new window.kakao.maps.LatLng(y, x); //인포윈도우 표시 위치입니다
        // const iwContent = `<div className="rounded">큰지도</div>`;
        // // 인포윈도우를 생성합니다
        // infowindow = new window.kakao.maps.InfoWindow({
        //   position: iwPosition,
        //   content: iwContent,
        // });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        // infowindow.open(map, marker);

        // 마커에 클릭이벤트를 등록 -> ?
        // window.kakao.maps.event.addListener(marker, "click", function () {
        //  마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        // infowindow.open(map, marker);
        // });

        // await displayMarker({ x, y });
        // var ps = new window.kakao.maps.services.Places(); // 검색용?

        // 보류 - 주소-좌표 변환 객체를 생성합니다
        // var geocoder = new window.kakao.maps.services.Geocoder();

        // 이 함수에서 location에 주소를 입력하면 위치를 새로 등록한다.
        // ps.keywordSearch(placeName, placesSearchCB);

        // 보류 -  키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data: any, status: any, pagination: any) {
          console.log("🐰 ~ placesSearchCB ~ data : ", data);
          if (status === window.kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new window.kakao.maps.LatLngBounds();

            if (data.length) {
              // displayMarker(data[0]);
              bounds.extend(new window.kakao.maps.LatLng(data[0].y, data[0].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
          }
        }

        // 보류 -지도에 마커를 표시하는 함수입니다
        function displayMarker({ x, y }: any) {
          //   // 마커를 생성하고 지도에 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(y, x),
          });

          // 마커에 클릭이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "click", function () {
            //  마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            // infowindow.open(map, marker);
          });
        }
      });
    };

    // onLoadKakaoAPI();
  }, [placeInfo, x, y]); // 원래는 placeCoordinate 의존성배열에 안넣어도 잘 뜨긴 함

  return (
    <>
      {/* <div id="map" ref={mapContainer} className="w-full h-full rounded-2xl" /> */}
      <Map center={position} level={4} className="w-full h-full rounded-2xl">
        {/* <MapMarker position={position} /> */}
        <CustomOverlayMap
          position={position} // 커스텀 오버레이가 나타날 위치
          // 공식문서등 전체 스타일도 주던데, 안됨
        >
          <div className="desktop:min-w-[170px] laptop:min-w-[100px] desktop:h-[60px] rounded-2xl bg-[#D2DED0]/90 mb-[150px] border-[2px] border-white p-2 flex flex-col items-center">
            {/* box shadow */}
            <p className="font-bold desktop:text-[15px] laptop:text-[14px]">
              {placeInfo.placeName}
            </p>
            <div className="flex desktop:gap-[30px] laptop:gap-[20px] desktop:text-[14.5px] laptop:text-[13.5px]">
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
          <MapMarker position={position} />
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default KakaoMap;
