"use client";
import React, { useEffect, useRef } from "react";
// const { kakao } = window; // 에러

// const KAKAO_MAP_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
// &autoload=false 필수

const KakakoMap = ({ placeName }: { placeName?: string }) => {
  console.log("🐰 ~ KakakoMap ~ placeName : ", placeName);
  // 이름으로만 찾으면 여러 검색결과가 떠서, 정확도가 떨어짐  ? - 아니면은 useEffect 문제로 초반에 안뜨다가 새로고침시에 잘 뜨는 문제
  // 장소명으로 못찾는 경우 이전 데이터? 지도가 보여지는듯 / 혹은 기본 카카오회사 위치 (못찾는 경우 아예 안뜨게 해야?)
  const mapRef = useRef<HTMLDivElement>(null); // 보류

  useEffect(() => {
    // const kakaoMapScript = document.createElement("script");
    // kakaoMapScript.async = false;
    // kakaoMapScript.src = KAKAO_MAP_SDK_URL;

    // document.head.appendChild(kakaoMapScript);

    // Kakao 안됨?
    // window.kakao.maps.load(() => {
    //   const options = {
    //     //지도를 생성할 때 필요한 기본 옵션
    //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    //     level: 3, //지도의 레벨(확대, 축소 정도)
    //   };

    //   const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
    // });
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // z index 수정?

        var container = document.getElementById("map") as HTMLElement;
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
        var ps = new window.kakao.maps.services.Places();

        // 이 함수에서 location에 주소를 입력하면 위치를 새로 등록한다.
        ps.keywordSearch(placeName, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data: any, status: any, pagination: any) {
          console.log("🐰 ~ placesSearchCB ~ data : ", data);
          if (status === window.kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new window.kakao.maps.LatLngBounds();

            if (data.length) {
              displayMarker(data[0]);
              bounds.extend(new window.kakao.maps.LatLng(data[0].y, data[0].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
          }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place: any) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });

          // 마커에 클릭이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "click", function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.open(map, marker);
          });
        }
      });
    };

    onLoadKakaoAPI();
  }, [location]);

  return <div id="map" ref={mapRef} className="w-[500px] h-[400px]"></div>;
};

export default KakakoMap;
