"use client";

import { Button, Chip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import AlertModal from "../community/AlertModal";

import type {
  mapResultPropsType,
  placeDataType,
} from "@/app/_types/individualAction-add/individualAction-add";

const SearchMapResult: React.FC<mapResultPropsType> = ({
  searchKeyword,
  setActivityLocation,
  onClose,
  locationMapRef,
}) => {
  interface markerMadeLocationRefType {
    // 직접 지정한 마커 위치 정보 (좌표, 지번이름) 타입
    x: string;
    y: string;
    address: string;
  }

  // DOM API -> useRef 로 변경
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);
  const placeListRef = useRef<HTMLUListElement>(null);
  const placeItemRef = useRef<HTMLLIElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const [placeData, setPlaceData] = useState<placeDataType[]>();
  const [dongInfo, setDongInfo] = useState<string>();
  const [makeMarker, setMakeMarker] = useState(false); // 지도 위에 직접 클릭해 마커 생성 가능한지 여부
  const [currentLocation, setCurrentLocation] = useState(false); // 현재 위치 보기 상태 (true면 현재위치 뜸)
  const markerMadeLocationRef = useRef<markerMadeLocationRefType>(); // 직접 생성한 마커로 선택한 위치 좌표/지번주소

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  // 지도 검색결과 장소명 클릭 시 '활동장소'에 자동 입력 + 해당 장소 좌표 useRef 에 담기 + 모달 닫기 (?)
  const handleActivityLocation = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    placeItem: placeDataType,
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
      markerMadeLocationRef.current as markerMadeLocationRefType;
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
  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        // 써야 에러 X
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
        var geocoder = new kakao.maps.services.Geocoder();

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다 (현재 지도 중심의 행정동 주소 정보 띄우기)
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "idle", function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        // SECTION 1 좌표로 행정동 주소 정보 가져오기 위한 함수들
        function searchAddrFromCoords(coords: any, callback: any) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords: any, callback: any) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === "H") {
                setDongInfo(result[i].address_name);
                break;
              }
            }
          }
        }
        // SECTION 1 끝 -----

        // SECTION 2 geolocation 으로 현재 접속 위치 얻기
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (currentLocation) {
          // currentLocation이 true일 때
          if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
              var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

              var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">현재 내 위치!</div>'; // 인포윈도우에 표시될 내용입니다

              // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);
            });
          } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
              message = "geolocation을 사용할수 없어요..";

            displayMarker(locPosition, message);
          }
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition: any, message: string) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
          });

          var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
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
          // const listEl = document.getElementById("places-list"),
          // resultEl = document.getElementById("search-result"),
          const listEl = placeListRef.current,
            resultEl = searchResultRef.current,
            fragment = document.createDocumentFragment(),
            bounds = new window.kakao.maps.LatLngBounds();

          // 검색 결과 목록에 추가된 항목들을 제거
          // listEl && removeAllChildNods(listEl); // 재검색시 에러 -> 없애면 잘 작동 (데이터 map으로 돌려서 이렇게 할 필요 x?)

          // 지도에 표시되고 있는 마커를 제거 - 필요 (페이지변경시 기존 마커 없애기)
          removeMarker();

          for (var i = 0; i < places.length; i++) {
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

              // console.log("🐰 ~ displayPlaces ~ itemEl : ", itemEl);

              if (itemEl) {
                // 없어도됨 하지만 기능 부실? ㅠㅠ
                itemEl.onmouseover = function () {
                  displayInfowindow(marker, title);
                };

                itemEl.onmouseout = function () {
                  infowindow.close();
                };
              }
            })(marker, places[i].place_name);

            itemEl && fragment.appendChild(itemEl); //  없어도 됨 ?
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
            imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
            imgOptions = {
              spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
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
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }

        // NOTE 7. 검색결과 목록 하단에 페이지번호를 표시는 함수
        // pagination = {totlaCount: 45, hasNextPage : true, .., first:1, current: 1, last: 3, perPage:15,..}
        function displayPagination(pagination: {
          last: number;
          current: number;
          gotoPage: (arg0: number) => void;
        }) {
          // const paginationEl = document.getElementById(
          //   "pagination",
          // ) as HTMLElement;
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
        // TODO 인포윈도우 말고 커스텀 오버레이 사용하기?
        function displayInfowindow(marker: any, title: string) {
          // '<div style="padding:5px;z-index:1;" class="marker-title">' +
          //   title +
          //   "</div>";
          // className="text-center p-10" tailwind 안먹힘
          // style 속성도 패딩은 먹히는데, text-align: center; min-width: 되긴하는데 잘 안먹힘.
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
        // 지도를 클릭한 위치에 표출할 마커입니다
        const marker = new kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: map.getCenter(),
        });

        // console.log(makeMarker);

        // NOTE 10. 지도에 클릭 이벤트 등록 - 지도에 직접 마커 생성하기
        if (makeMarker) {
          // makeMarker 가 true 일 때 클릭이벤트 -> 마커 생성 가능
          window.kakao.maps.event.addListener(
            map,
            "click",
            function (mouseEvent: any) {
              // 클릭한 위도, 경도 정보를 가져옵니다
              const latlng = mouseEvent.latLng;

              // 클릭할떄마다 마커를 새로 생성하면 안됨 (중복 문제)

              // 지도에 마커를 표시합니다
              marker.setMap(map);

              // 마커 위치를 클릭한 위치로 옮깁니다
              marker.setPosition(latlng);

              // 좌표로 주소 얻어오기
              searchDetailAddrFromCoords(
                mouseEvent.latLng,
                function (result: any, status: any) {
                  if (status === kakao.maps.services.Status.OK) {
                    // 도로명 주소 없을 수도 있음, 지번 주소는 항상 존재
                    // ref에 지정한 마커 위치 좌표/주소 담기
                    markerMadeLocationRef.current = {
                      x: latlng.getLng(),
                      y: latlng.getLat(),
                      address: result[0].address.address_name,
                    };

                    var detailAddr = !!result[0].road_address
                      ? "<div>도로명주소 : " +
                        result[0].road_address.address_name +
                        "</div>"
                      : "";
                    detailAddr +=
                      "<div>지번 주소 : " +
                      result[0].address.address_name +
                      "</div>";

                    var content =
                      '<div class="bAddr">' +
                      // '<span class="title">법정동 주소정보</span>' +
                      detailAddr +
                      "</div>";

                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
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
  }, [searchKeyword, makeMarker, currentLocation]); // 의존성에 꼭 makeMarker 넣기 !

  return (
    <>
      <div className="map-container w-full h-full flex">
        {/* <div className="flex justify-center items-center w-full h-full"> */}

        {/* 좌측 지도*/}
        <div
          ref={mapContainerRef}
          className="desktop:w-[500px] desktop:h-[500px] laptop:w-[420px] laptop:h-[420px] fixed desktop:m-0 laptop:mt-[15px] laptop:ml-[30px] rounded-xl"
        />
        {/* </div> */}
        {/* 우측 검색결과 섹션 */}

        <div
          ref={searchResultRef}
          className="w-[500px] desktop:h-[480px] laptop:h-[440px] ml-[525px] flex flex-col gap-[10px]" // h-[300px]
        >
          <div className="bg-gray-100">
            <span>지도중심기준 행정동 주소정보 │ </span>
            <span id="centerAddr">{dongInfo}</span>
          </div>
          <Button
            onClick={() => {
              setMakeMarker(!makeMarker);
            }}
            className="w-[170px]"
          >
            {makeMarker ? `마커 생성 취소하기` : `지도에서 직접 마커 생성하기`}
          </Button>
          <Button
            onClick={() => setCurrentLocation(!currentLocation)}
            className="w-[100px]"
          >
            {currentLocation ? `현재 위치 OFF` : `현재 위치 ON`}
          </Button>
          {makeMarker && (
            <Button
              onClick={() => {
                handleActivityLocationByMarker();
              }}
              className="w-[150px]"
            >
              선택한 마커 등록
            </Button>
          )}
          <div className="flex justify-center items-center">
            <Chip
              classNames={{
                // base: "w-[100px]",
                content: "w-[400px] flex justify-center gap-[20px]",
              }}
              className={`h-[40px] text-[20px] bg-[#e2eee0] shadow-md 
          ${searchKeyword ? "" : "hidden"}`}
            >
              <p className="max-w-[245px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {searchKeyword}
              </p>
              <p>검색 결과</p>
            </Chip>
          </div>
          {/* 검색결과 목록 */}
          <div className="h-[400px] overflow-y-auto rounded-xl pl-5 py-2 bg-[#f3f5f1] ">
            <ul
              ref={placeListRef}
              className="flex flex-col gap-[10px] mt-[15px]"
            >
              {/* map placeData[0]?.address_name*/}

              {placeData?.length === 0 && searchKeyword && (
                <div className="flex justify-center items-center h-[350px]">
                  검색 결과가 없습니다.
                </div>
              )}
              {placeData &&
                placeData.map((placeItem, index) => {
                  // console.log("🐰 ~ placeItem : ", placeItem);
                  return (
                    <>
                      <li
                        key={placeItem.id}
                        ref={placeItemRef}
                        className="flex items-center gap-[50px] pb-2 border-b-2 border-gray-300"
                        // onMouseOver={() => displayInfowindow()}
                      >
                        <Chip
                          classNames={{
                            base: "bg-[#d7e6d5]",
                            content:
                              "text-[20px] w-[27px] text-center flex justify-center items-center ",
                          }}
                        >
                          {index + 1}
                        </Chip>
                        {/* <span className="text-[20px]">{index + 1}</span> */}
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
                              <span className="">{placeItem.address_name}</span>
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
            <div ref={pageRef} className="flex justify-center gap-[10px] " />
          )}
        </div>
      </div>
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
