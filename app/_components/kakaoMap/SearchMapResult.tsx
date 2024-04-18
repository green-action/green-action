import { useEffect, useRef, useState } from "react";

// head에 작성한 window.Kakao API 불러오기
// const { window.kakao } = window as any; 에러남

interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}

export interface propsType {
  searchKeyword: string;
  setActivityLocation: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

interface placeDataType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const SearchMapResult = ({
  searchKeyword,
  setActivityLocation,
  onClose,
}: propsType) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const searchResult = useRef<HTMLDivElement>(null);
  const placeList = useRef<HTMLUListElement>(null);

  const [placeData, setPlaceData] = useState<placeDataType[]>();

  // 지도 검색결과 장소명 클릭 시 '활동장소'에 자동 입력
  const handleActivityLocation = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLParagraphElement;
    const textContent = target.textContent;
    if (textContent) {
      setActivityLocation(textContent);
      onClose();
    }
  };

  // 마커를 담는 배열
  let markers: any[] = [];

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  // 전부 useEffect 안이라서 getElementById 등으로 접근해야하는지? / useRef 사용?
  // DOM API -> useRef 로 변경하기
  useEffect(() => {
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        // 써야 에러 X
        // const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        // 지도를 생성
        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

        // 장소 검색 객체를 생성
        const ps = new window.kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
        // z index 필요?  원래  zIndex: 1
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 키워드로 장소 검색
        searchPlaces();

        // NOTE 1. 키워드 검색을 요청하는 함수
        function searchPlaces() {
          let keyword = searchKeyword;
          // 장소검색 객체를 통해 키워드로 장소검색을 요청
          ps.keywordSearch(keyword, placesSearchCB); // 콘솔로 찍어도 undefined
          // console.log(
          //   "ps.keywordSearch(keyword, placesSearchCB) : ",
          //   ps.keywordSearch(keyword, placesSearchCB),
          // );
        }

        // NOTE 2. 장소검색이 완료됐을 때 호출되는 콜백함수
        function placesSearchCB(data: any, status: any, pagination: any) {
          // REVIEW 이 함수에 어떻게 인자가 들어가는 것인지?
          // console.log("🐰 ~ placesSearchCB ~ pagination : ", pagination);
          // pagination = {totlaCount: 45, hasNextPage : true, .., first:1, current: 1, last: 3, perPage:15,..}
          // console.log("🐰 ~ placesSearchCB ~ data : ", data); // data-
          // data.place_name 장소명 ,   data.

          if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출
            // 추가
            setPlaceData(data);
            // 검색 목록 표출
            displayPlaces(data);
            // 페이지 번호를 표출
            displayPagination(pagination);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        }

        // NOTE 3. 검색 결과 목록과 마커를 표출하는 함수
        function displayPlaces(places: string | any[]) {
          const listEl = document.getElementById("places-list"),
            // const listEl = placeList.current,
            resultEl = document.getElementById("search-result"),
            // resultEl = searchResult.current,
            fragment = document.createDocumentFragment(),
            bounds = new window.kakao.maps.LatLngBounds();

          // 검색 결과 목록에 추가된 항목들을 제거
          listEl && removeAllChildNods(listEl);

          // 지도에 표시되고 있는 마커를 제거
          removeMarker();

          for (var i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시
            let placePosition = new window.kakao.maps.LatLng(
                places[i].y,
                places[i].x,
              ),
              marker = addMarker(placePosition, i, undefined),
              itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성 // 이거 실행 안시켜야?

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시
            // mouseout 했을 때는 인포윈도우를 닫기
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

              itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
              };

              itemEl.onmouseout = function () {
                infowindow.close();
              };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
          }

          // 검색결과 항목들을 검색결과 목록 Element에 추가
          listEl && listEl.appendChild(fragment);
          if (resultEl) {
            resultEl.scrollTop = 0;
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }

        // 여기 문제 해결하기. (다시 검색시 안뜸. 아래함수 실행 x해야?)
        // NOTE 4. 검색결과 항목을 Element로 반환하는 함수
        function getListItem(index: number, places: placeType) {
          const el = document.createElement("li");
          // const placeName = document.getElementById("place-name");
          const info = document.getElementsByClassName("info");
          // const placeNames = document.querySelector("place-name");

          // if (placeNames) {
          // info.onclick = (
          //   // e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
          //   e: any,
          // ) => {
          //   const placeNames = document.getElementsByClassName("place-name")[0];
          //   console.log("🐰 ~ getListItem ~ info : ", info);

          //   const target = e.target;
          //   //  as HTMLParagraphElement;
          //   const textContent = target.textContent;
          //   if (textContent) {
          //     setActivityLocation(textContent);
          //   }
          // };
          // }
          // placeName.onclick = (
          //   e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
          // ) => {
          //   const target = e.target as HTMLParagraphElement;
          //   const textContent = target.textContent;
          //   if (textContent) {
          //     setActivityLocation(textContent);
          //   }
          // };

          // function uploader(e: any) {
          //   var classe = e.getAttribute("class");
          //   console.log("🐰 ~ uploader ~ classe : ", classe);
          // }

          // el.onclick = uploader(this);

          // let itemStr = `
          // <div class="info mt-[20px]">
          //   <span class="marker marker_${index + 1}">
          //     ${index + 1}
          //   </span>
          //     <p id="place-name" class="info-item place-name font-bold">${
          //       places.place_name
          //     }</p>
          //     ${
          //       places.road_address_name
          //         ? `<span class="info-item road-address-name">
          //           ${places.road_address_name}
          //          </span>
          //          <br/>
          //          <span class="info-item address-name">
          //        	 ${places.address_name}
          //      	   </span>`
          //         : `<span class="info-item address-name">
          //    	     ${places.address_name}
          //         </span>`
          //     }
          //     <br/>
          //     <span class="info-item tel">
          //       ${places.phone}
          //     </span>
          //     <br/>
          //     <a href="${places.place_url}" target="_blank">링크 열기</a>
          // </div>
          // `;

          // el.innerHTML = itemStr;
          el.className = "item";

          return el;
        }

        // NOTE 5. 마커를 생성하고 지도 위에 마커를 표시하는 함수
        function addMarker(position: any, idx: number, title: undefined) {
          var imageSrc =
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

        // NOTE 6. 지도 위에 표시되고 있는 마커를 모두 제거하는 함수
        function removeMarker() {
          for (var i = 0; i < markers.length; i++) {
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
          const paginationEl = document.getElementById(
            "pagination",
          ) as HTMLElement;
          let fragment = document.createDocumentFragment();
          let i;

          // 기존에 추가된 페이지번호를 삭제
          while (paginationEl.hasChildNodes()) {
            paginationEl.lastChild &&
              paginationEl.removeChild(paginationEl.lastChild);
          }

          for (i = 1; i <= pagination.last; i++) {
            const el = document.createElement("a") as HTMLAnchorElement;
            el.href = "#";
            el.innerHTML = i.toString();

            if (i === pagination.current) {
              el.className = "on";
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i);
                };
              })(i);
            }

            fragment.appendChild(el);
          }
          paginationEl.appendChild(fragment);
        }

        // NOTE 8. 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
        // 인포윈도우에 장소명을 표시
        function displayInfowindow(marker: any, title: string) {
          const content =
            '<div style="padding:5px;z-index:1;" class="marker-title">' +
            title +
            "</div>";

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }

        // NOTE 9. 검색결과 목록의 자식 Element를 제거하는 함수
        function removeAllChildNods(el: HTMLElement) {
          while (el.hasChildNodes()) {
            el.lastChild && el.removeChild(el.lastChild);
          }
        }
      });
    };

    onLoadKakaoAPI();
  }, [searchKeyword]);

  return (
    // id, className 으로 dom api 접근 x -> useRef로 변경하기
    <div className="map-container w-[700px] flex gap-5">
      <div
        ref={mapContainer}
        id="map"
        className="map w-[300px] h-[500px]"
      ></div>
      <div
        ref={searchResult}
        id="search-result"
        className="w-[200px] h-[100px]"
      >
        <p className="result-text">
          <span className="result-keyword">{searchKeyword}</span>
          검색 결과
        </p>
        <div className="scroll-wrapper">
          <ul ref={placeList} id="places-list">
            {/* map placeData[0]?.address_name*/}
            {placeData &&
              placeData.map((placeItem, index) => {
                return (
                  <div key={placeItem.id} className="mt-[20px]">
                    <span className="">{index + 1}</span>
                    <p
                      id="place-name"
                      className="font-bold cursor-pointer"
                      onClick={handleActivityLocation}
                    >
                      {placeItem.place_name}
                    </p>
                    {placeItem.road_address_name ? (
                      <>
                        <span className="">{placeItem.road_address_name}</span>
                        <br />
                        <span className="">{placeItem.address_name}</span>
                      </>
                    ) : (
                      <span className="">{placeItem.address_name}</span>
                    )}
                    <br />
                    <span className="">{placeItem.phone}</span>
                    <br />
                    <a href={placeItem.place_url} target="_blank">
                      링크 열기
                    </a>
                  </div>
                );
              })}
          </ul>
        </div>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default SearchMapResult;
