"use client";

import { useResponsive } from "@/app/_hooks/responsive";
import { Button, Chip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import AlertModal from "../community/AlertModal";

import type {
  MapResultPropsType,
  MarkerMadeLocationRefType,
  PlaceDataType,
} from "@/app/_types/individualAction-add/individualAction-add";

const SearchMapResult: React.FC<MapResultPropsType> = ({
  searchKeyword,
  setActivityLocation,
  onClose,
  locationMapRef,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);
  const placeListRef = useRef<HTMLUListElement>(null);
  const placeItemRef = useRef<HTMLLIElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const [placeData, setPlaceData] = useState<PlaceDataType[]>();
  const [dongInfo, setDongInfo] = useState<string>();
  const [makeMarker, setMakeMarker] = useState(false); // 지도 위에 직접 클릭해 마커 생성 가능한지 여부
  const [currentLocation, setCurrentLocation] = useState(false); // 현재 위치 보기 상태 (true면 현재위치 뜸)
  const markerMadeLocationRef = useRef<MarkerMadeLocationRefType>(); // 직접 생성한 마커로 선택한 위치 좌표/지번주소

  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  // 지도 검색결과 장소명 클릭 시 '활동장소'에 자동 입력 + 해당 장소 좌표 useRef 에 담기 + 모달 닫기
  const handleActivityLocation = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    placeItem: PlaceDataType,
  ) => {
    const target = e.target as HTMLParagraphElement;
    const textContent = target.textContent;
    if (textContent) {
      setActivityLocation(textContent);
      locationMapRef.current = {
        x: placeItem.x,
        y: placeItem.y,
        placeId: placeItem.id,
        placeName: placeItem.place_name,
      };
      onClose();
    }
  };

  // 직접 마커 생성한 경우 - 선택한 마커 등록하기
  const handleActivityLocationByMarker = () => {
    const { x, y, address } =
      markerMadeLocationRef.current as MarkerMadeLocationRefType;
    setActivityLocation(address || "");
    locationMapRef.current = {
      x: x, // longitude 경도
      y: y, // latitude 위도
      placeId: "",
      placeName: address,
    };
    onClose();
  };

  // 마커를 담는 배열
  let markers: any[] = [];

  // SECTION
  useEffect(() => {
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        };

        // 지도를 생성
        const map = new window.kakao.maps.Map(
          mapContainerRef.current,
          mapOption,
        );

        // 장소 검색 객체를 생성
        const ps = new window.kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 주소-좌표 변환 객체를 생성합니다 (직접 마커 생성해서 좌표 얻어오기 위해)
        const geocoder = new kakao.maps.services.Geocoder();

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다 (현재 지도 중심의 행정동 주소 정보 띄우기)
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "idle", function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        // SECTION 1 좌표로 행정동 주소 정보 가져오기 위한 함수들
        function searchAddrFromCoords(coords: any, callback: any) {
          // 좌표로 행정동 주소 정보를 요청
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords: any, callback: any) {
          // 좌표로 법정동 상세 주소 정보를 요청
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출
        function displayCenterInfo(result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            for (let i = 0; i < result.length; i++) {
              if (result[i].region_type === "H") {
                setDongInfo(result[i].address_name);
                break;
              }
            }
          }
        }
        // SECTION 1 끝 -----

        // SECTION 2 geolocation 으로 현재 접속 위치 얻기
        if (currentLocation) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              const lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

              const locPosition = new kakao.maps.LatLng(lat, lon),
                message = '<div style="padding:5px;">현재 내 위치!</div>';

              displayMarker(locPosition, message);
            });
          } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
            const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
              message = "geolocation을 사용할수 없어요..";

            displayMarker(locPosition, message);
          }
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition: any, message: string) {
          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
          });

          const iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

          // 인포윈도우를 생성합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          // 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);

          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);
        }
        // SECTION 2 끝 -----

        // 키워드로 장소 검색
        searchPlaces();

        // NOTE 1. 키워드 검색을 요청하는 함수
        function searchPlaces() {
          let keyword = searchKeyword;
          // 장소검색 객체를 통해 키워드로 장소검색을 요청
          ps.keywordSearch(keyword, placesSearchCB); // 콘솔로 찍어도 undefined
        }

        // NOTE 2. 장소검색이 완료됐을 때 호출되는 콜백함수
        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출
            setPlaceData(data); // 데이터 렌더링 위해 set
            displayPlaces(data); // 검색 목록 표출
            displayPagination(pagination); // 페이지 번호를 표출
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            // alert("검색 결과가 존재하지 않습니다.");
            setPlaceData(data); // 빈배열
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            // 커스텀 모달
            setMessage("검색 결과 중 오류가 발생했습니다.");
            setIsOpenAlertModal(true);
            return;
          }
        }

        // NOTE 3. 검색 결과 목록과 마커를 표출하는 함수
        function displayPlaces(places: string | any[]) {
          const listEl = placeListRef.current,
            resultEl = searchResultRef.current,
            fragment = document.createDocumentFragment(),
            bounds = new window.kakao.maps.LatLngBounds();

          // 검색 결과 목록에 추가된 항목들을 제거

          // 지도에 표시되고 있는 마커를 제거 - 필요 (페이지변경시 기존 마커 없애기)
          removeMarker();

          for (let i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시
            let placePosition = new window.kakao.maps.LatLng(
                places[i].y,
                places[i].x,
              ),
              marker = addMarker(placePosition, i, undefined);
            // markerRef.current = marker;
            // itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성 // 이거 실행 안시켜야?
            const itemEl = placeItemRef.current;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해  LatLngBounds 객체에 좌표를 추가
            bounds.extend(placePosition); // 필요!

            // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시
            (function (marker, title) {
              window.kakao.maps.event.addListener(
                marker,
                "mouseover",
                function () {
                  displayInfowindow(marker, title);
                },
              );

              window.kakao.maps.event.addListener(
                marker,
                "mouseout",
                function () {
                  infowindow.close();
                },
              );

              if (itemEl) {
                itemEl.onmouseover = function () {
                  displayInfowindow(marker, title);
                };

                itemEl.onmouseout = function () {
                  infowindow.close();
                };
              }
            })(marker, places[i].place_name);

            itemEl && fragment.appendChild(itemEl);
          }

          // 검색결과 항목들을 검색결과 목록 Element에 추가 // 없어도 됨
          listEl && listEl.appendChild(fragment);
          if (resultEl) {
            resultEl.scrollTop = 0;
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }

        // NOTE 5. 마커를 생성하고 지도 위에 마커를 표시하는 함수
        function addMarker(position: any, idx: number, title: undefined) {
          const imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지
            imageSize = new window.kakao.maps.Size(36, 37),
            imgOptions = {
              spriteSize: new window.kakao.maps.Size(36, 691),
              spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imgOptions,
            ),
            marker = new window.kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage,
            });

          marker.setMap(map); // 지도 위에 마커를 표출
          markers.push(marker); // 배열에 생성된 마커를 추가

          return marker;
        }

        // NOTE 6. 지도 위에 표시되고 있는 마커를 모두 제거하는 함수 (페이지변경시 기존 마커 초기화)
        function removeMarker() {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }

        // NOTE 7. 검색결과 목록 하단에 페이지번호를 표시는 함수
        function displayPagination(pagination: {
          last: number;
          current: number;
          gotoPage: (arg0: number) => void;
        }) {
          const paginationEl = pageRef.current;
          let fragment = document.createDocumentFragment();
          let i;

          // 기존에 추가된 페이지번호를 삭제
          while (paginationEl?.hasChildNodes()) {
            paginationEl.lastChild &&
              paginationEl.removeChild(paginationEl.lastChild);
          }

          for (i = 1; i <= pagination.last; i++) {
            const el = document.createElement("a") as HTMLAnchorElement;
            el.href = "#";
            el.innerHTML = i.toString();

            if (i === pagination.current) {
              el.className = "on";
              el.style.fontWeight = "bold";
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i);
                };
              })(i);
            }

            fragment.appendChild(el);
          }
          paginationEl?.appendChild(fragment);
        }

        // NOTE 8. 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
        // 인포윈도우에 장소명을 표시
        function displayInfowindow(marker: any, title: string) {
          const content =
            '<div style="padding:5px; z-index:1; text-align: center; min-width: 170px; max-width: 250px;" >' +
            title +
            "</div>";

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }

        // NOTE 9. 검색결과 목록의 자식 Element를 제거하는 함수 - 없어도 됨
        function removeAllChildNods(el: HTMLElement) {
          while (el.hasChildNodes()) {
            el.lastChild && el.removeChild(el.lastChild);
          }
        }

        // SECTION
        const marker = new kakao.maps.Marker({
          position: map.getCenter(),
        });

        // NOTE 10. 지도에 클릭 이벤트 등록 - 지도에 직접 마커 생성하기
        if (makeMarker) {
          // makeMarker 가 true 일 때 클릭이벤트 -> 마커 생성 가능
          window.kakao.maps.event.addListener(
            map,
            "click",
            function (mouseEvent: any) {
              // 클릭한 위도, 경도 정보를 가져옵니다
              const latlng = mouseEvent.latLng;
              marker.setMap(map);
              marker.setPosition(latlng);

              // 좌표로 주소 얻어오기
              searchDetailAddrFromCoords(
                mouseEvent.latLng,
                function (result: any, status: any) {
                  if (status === kakao.maps.services.Status.OK) {
                    markerMadeLocationRef.current = {
                      x: latlng.getLng(),
                      y: latlng.getLat(),
                      address: result[0].address.address_name,
                    };

                    let detailAddr = !!result[0].road_address
                      ? "<div>도로명주소 : " +
                        result[0].road_address.address_name +
                        "</div>"
                      : "";
                    detailAddr +=
                      "<div>지번 주소 : " +
                      result[0].address.address_name +
                      "</div>";

                    const content =
                      '<div class="bAddr" style="font-size: x-small">' +
                      detailAddr +
                      "</div>";

                    // 마커를 클릭한 위치에 표시
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                  }
                },
              );
            },
          );
        }
        // SECTION -----
      }); //  window.kakao.maps.load ---
    };

    onLoadKakaoAPI();
  }, [searchKeyword, makeMarker, currentLocation]);

  return (
    <>
      {(isDesktop || isLaptop) && (
        <div className={`map-container w-full h-full flex`}>
          {/* 좌측 지도*/}
          <div
            ref={mapContainerRef}
            className={` 
                 desktop:w-[500px] desktop:h-[520px] m-0
                 laptop:w-[420px] laptop:h-[420px] laptop:mt-[0px]
              rounded-xl`}
          />
          <div
            className={`bg-gray-300/20 absolute z-10 p-2 rounded-lg bottom-[5%] desktop:left-[9%] laptop:left-[7%]`}
          >
            <span>현재 지도중심 행정동 │ </span>
            <span id="centerAddr">{dongInfo}</span>
          </div>

          {/* 우측 검색결과 섹션 */}
          <div
            ref={searchResultRef}
            className={`desktop:w-[500px] desktop:h-[568px] desktop:ml-[10px] 
                  w-[500px] laptop:h-[470px] laptop:ml-[30px] gap-[10px]
             flex flex-col`}
          >
            <div
              className={`absolute rounded-3xl flex gap-4 top-[3%] left-[12%]`}
            >
              <Button
                onClick={() => setCurrentLocation(!currentLocation)}
                className={` rounded-3xl bg-[#e2eee0] w-[100px]`}
              >
                {currentLocation ? `현재 위치 OFF` : `현재 위치 ON`}
              </Button>
              <Button
                onClick={() => {
                  setMakeMarker(!makeMarker);
                }}
                className={` rounded-3xl bg-[#e2eee0]  ${
                  makeMarker ? `w-[120px]` : `w-[175px]`
                }`}
              >
                {makeMarker
                  ? `위치 지정 취소하기`
                  : `지도에서 직접 위치 지정하기`}
              </Button>
            </div>
            {makeMarker && (
              <Button
                onClick={() => {
                  handleActivityLocationByMarker();
                }}
                className={` rounded-3xl bg-[#e2eee0] absolute top-[3%] right-[5%] font-semibold
                  text-[15px] w-[120px]
              }`}
              >
                지정한 위치 등록
              </Button>
            )}
            <div className="flex justify-center items-center">
              <Chip
                classNames={{
                  content: "w-[400px] flex justify-center gap-[20px]",
                }}
                className={`
              h-[40px] text-[20px]
               bg-[#e2eee0] 
          ${searchKeyword ? "" : "hidden"}`}
              >
                <p className="max-w-[245px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {searchKeyword}
                </p>
                <p>검색 결과</p>
              </Chip>
            </div>
            {/* 검색결과 목록 */}
            <div className="h-[560px] overflow-y-auto rounded-xl pl-5 py-2 bg-[#fcfcfc] ">
              <ul
                ref={placeListRef}
                className="flex flex-col gap-[10px] mt-[15px]"
              >
                {placeData?.length === 0 && searchKeyword && (
                  <div className="flex justify-center items-center h-[350px]">
                    검색 결과가 없습니다.
                  </div>
                )}
                {placeData &&
                  placeData.map((placeItem, index) => {
                    return (
                      <>
                        <li
                          key={placeItem.id}
                          ref={placeItemRef}
                          className="flex items-center gap-[50px] pb-2 border-b-2 border-gray-300"
                        >
                          <Chip
                            classNames={{
                              base: "bg-[#F2F2F2]",
                              content:
                                "text-[20px] w-[27px] text-center flex justify-center items-center ",
                            }}
                          >
                            {index + 1}
                          </Chip>
                          <div className="flex flex-col gap-[5px]">
                            <p
                              id="place-name"
                              className="font-bold cursor-pointer text-[16px] "
                              onClick={(e) =>
                                handleActivityLocation(e, placeItem)
                              }
                            >
                              {placeItem.place_name}
                            </p>
                            <div className="flex flex-col gap-[1px]">
                              {placeItem.road_address_name ? (
                                <div className="flex flex-col gap-[1px]">
                                  <p className="">
                                    {placeItem.road_address_name}
                                  </p>
                                  <div className=" flex gap-[5px]">
                                    <Chip size="sm">지번</Chip>
                                    <span className="">
                                      {placeItem.address_name}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="">
                                  {placeItem.address_name}
                                </span>
                              )}
                              {placeItem.phone && (
                                <div className="flex gap-[5px]">
                                  <Chip size="sm">Tel</Chip>
                                  <p className="">{placeItem.phone}</p>
                                </div>
                              )}
                              <a
                                href={placeItem.place_url}
                                target="_blank"
                                className="text-indigo-400 px-[10px]"
                              >
                                {` > 자세한 정보`}
                              </a>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
            {/* 페이지네이션 */}
            {placeData?.length !== 0 && (
              <div
                ref={pageRef}
                className="flex justify-center gap-[13px] pt-[13px] "
              />
            )}
          </div>
        </div>
      )}

      {/* SECTION 모바일 */}
      {isMobile && (
        <div
          className={`map-container w-full h-[500px] flex flex-col items-center`}
        >
          {/* 좌측 지도*/}
          <div
            ref={mapContainerRef}
            className={`w-[280px] h-[150px] rounded-xl mt-[8%]`}
          />
          <div
            className={`bg-gray-300/20 absolute z-10 p-2 rounded-lg bottom-[3%] left-[3%] text-[8px] h-[20px] flex justify-center items-center`}
          >
            <span>현재 지도중심 행정동 │ </span>
            <span id="centerAddr">{dongInfo}</span>
          </div>

          {/* 검색결과 섹션 (모바일 - 지도 아래)*/}
          <div
            ref={searchResultRef}
            className={`w-[280px] h-[200px] gap-[10px]
             flex flex-col mt-[5%]`}
          >
            <div
              className={`absolute rounded-3xl flex gap-1 top-[5%] left-[24%]`}
            >
              <Button
                onClick={() => setCurrentLocation(!currentLocation)}
                className={` rounded-3xl bg-[#e2eee0] w-[60px] h-[22px] text-[10px]`}
              >
                {currentLocation ? `현재 위치 OFF` : `현재 위치 ON`}
              </Button>
              <Button
                onClick={() => {
                  setMakeMarker(!makeMarker);
                }}
                className={`rounded-3xl bg-[#e2eee0] h-[22px] text-[10px] ${
                  makeMarker ? `w-[90px]` : `w-[125px]`
                }`}
              >
                {makeMarker
                  ? `위치 지정 취소하기`
                  : `지도에서 직접 위치 지정하기`}
              </Button>
            </div>
            {makeMarker && (
              <Button
                onClick={() => {
                  handleActivityLocationByMarker();
                }}
                className={`rounded-3xl bg-[#e2eee0] absolute bottom-[3%] right-[15%] font-semibold
                  text-[9px] w-[75px] h-[20px]
              }`}
              >
                지정한 위치 등록
              </Button>
            )}
            <div className="flex justify-center items-center">
              <Chip
                classNames={{
                  content: "w-[200px] flex justify-center gap-[20px]",
                }}
                className={`
              h-[22px] text-[11px]
               bg-[#e2eee0] 
          ${searchKeyword ? "" : "hidden"}`}
              >
                <p className="max-w-[245px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {searchKeyword}
                </p>
                <p>검색 결과</p>
              </Chip>
            </div>
            {/* 검색결과 목록 */}
            <div className="max-h-[560px] overflow-y-auto rounded-xl pl-5 py-2 bg-[#fcfcfc] ">
              <ul
                ref={placeListRef}
                className="flex flex-col gap-[10px] mt-[15px] text-[10px]"
              >
                {placeData?.length === 0 && searchKeyword && (
                  <div className="flex justify-center items-center h-[50px] pb-[20px]">
                    검색 결과가 없습니다.
                  </div>
                )}
                {placeData &&
                  placeData.map((placeItem, index) => {
                    return (
                      <>
                        <li
                          key={placeItem.id}
                          ref={placeItemRef}
                          className="flex items-center gap-[30px] pb-2 border-b-2 border-gray-300"
                        >
                          <Chip
                            classNames={{
                              base: "bg-[#F2F2F2]",
                              content:
                                "text-[10px] w-[27px] text-center flex justify-center items-center ",
                            }}
                          >
                            {index + 1}
                          </Chip>
                          <div className="flex flex-col gap-[2px]">
                            <p
                              id="place-name"
                              className="font-bold cursor-pointer text-[10px] "
                              onClick={(e) =>
                                handleActivityLocation(e, placeItem)
                              }
                            >
                              {placeItem.place_name}
                            </p>
                            <div className="flex flex-col gap-[1px]">
                              {placeItem.road_address_name ? (
                                <div className="flex flex-col gap-[1px]">
                                  <p className="">
                                    {placeItem.road_address_name}
                                  </p>
                                  <div className=" flex gap-[5px]">
                                    <Chip
                                      classNames={{
                                        base: "h-[15px]",
                                        content:
                                          "w-[7px] flex items-center justify-center",
                                      }}
                                      className="text-[8px]"
                                    >
                                      지번
                                    </Chip>
                                    <span className="">
                                      {placeItem.address_name}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="">
                                  {placeItem.address_name}
                                </span>
                              )}
                              {placeItem.phone && (
                                <div className="flex gap-[5px]">
                                  <Chip
                                    classNames={{
                                      base: "h-[15px]",
                                      content:
                                        "w-[7px] flex items-center justify-center",
                                    }}
                                    className="text-[8px]"
                                  >
                                    Tel
                                  </Chip>
                                  <p className="">{placeItem.phone}</p>
                                </div>
                              )}
                              <a
                                href={placeItem.place_url}
                                target="_blank"
                                className="text-indigo-400 px-[10px]"
                              >
                                {` > 자세한 정보`}
                              </a>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
            {/* 페이지네이션 */}
            {placeData?.length !== 0 && (
              <div
                ref={pageRef}
                className="flex justify-center gap-[13px] pt-[0px] text-[9px]"
              />
            )}
          </div>
        </div>
      )}

      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => setIsOpenAlertModal(false)}
          message={message}
        />
      )}
    </>
  );
};

export default SearchMapResult;
