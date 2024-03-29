import React from "react";

const AddAction = () => {
  // 현재 로그인한 유저의 id가져오기
  // 임시 user_uid로 일단 테스트하기
  const currentUserUId = "55e7ec4c-473f-4754-af5e-9eae5c587b81";

  // id와 입력값들 insert api로 보내기
  // (입력값들을 formData로 관리할지?)

  return (
    <>
      {/* 헤더 */}
      <div className="w-full h-28 bg-slate-400 mb-14">Header</div>
      {/* 이미지 업로드 */}
      <div className="flex justify-center">
        <div className="w-1/2 h-96 bg-slate-400 mb-14">이미지업로드</div>
      </div>
      {/* 입력창 */}
      <div className="flex flex-col item-center justify-center ml-80 mb-20">
        <div className="flex gap-16">
          <p>활동 날짜 |</p>
          <p>시작일 :</p>
          <p>종료일 :</p>
        </div>
        <div className="flex gap-16">
          <p>활동 제목 |</p>
          <p>우리랑 같이 모여요</p>
        </div>
        <div className="flex gap-16">
          <p>활동 내용 소개 |</p>
          <p>우리랑 같이 모이면 어떤걸 할거냐면요 블라블라</p>
        </div>
        <div className="flex gap-16">
          <p>활동 장소 |</p>
          <p>서울시 어쩌구</p>
          <p>최대 모집 인원 | </p>
          <p>8명</p>
        </div>
        <div className="flex gap-16">
          <p>오픈카톡링크 |</p>
          <p>http://kakao.blahblah</p>
        </div>
      </div>
      {/* 등록버튼 */}
      <div className="flex justify-end mr-40">
        <button>등록완료</button>
      </div>
    </>
  );
};

export default AddAction;
