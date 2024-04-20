"use client";
import type { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";
import React, { useEffect, useRef } from "react";
// const { kakao } = window; // 에러

const KakakoMap = ({
  placeCoordinate,
}: {
  placeCoordinate: placeCoordinateType;
}) => {
  // 해당 장소를 x,y 좌표로 뜨게할지? - 이때 place_url 등도 함께 테이블에 넣어서 가져올지, 아니면 해당 url등은 장소 id 를 통해 api에서 바로 가져올 수 있을지

  const { x, y } = placeCoordinate;
  // 이름으로만 찾으면 여러 검색결과가 떠서, 정확도가 떨어짐  ? - 아니면은 useEffect 문제로 초반에 안뜨다가 새로고침시에 잘 뜨는 문제
  // 장소명으로 못찾는 경우 이전 데이터? 지도가 보여지는듯 / 혹은 기본 카카오회사 위치 (못찾는 경우 아예 안뜨게 해야?)
  const mapContainer = useRef<HTMLDivElement>(null); // 보류

  // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  let iwContent = `<div style="padding:5px;">제목 <br><a href="https://map.kakao.com/link/map/Hello World!,${y},${x}" style = "color:skyblue" target = "_blank" > 큰지도보기</a > <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:skyblue" target="_blank">길찾기</a></div >`;

  useEffect(() => {
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // z index 수정?

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

        const iwPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);

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
            infowindow.open(map, marker);
          });
        }
      });
    };

    onLoadKakaoAPI();
  }, [placeCoordinate]); // 원래는 placeCoordinate 의존성배열에 안넣어도 잘 뜨긴 함

  return (
    <div id="map" ref={mapContainer} className="w-full h-full"></div>
    // w-[387px] h-[239px]
  );
};

export default KakakoMap;
