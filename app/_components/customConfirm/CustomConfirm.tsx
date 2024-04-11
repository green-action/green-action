"use client";
import React, { useRef } from "react";

import { Button } from "@nextui-org/react";
import bookmarkFill from "/app/_assets/image/logo_icon/icon/mypage/Star 32.png";
import Image from "next/image";

interface CustomConfirmProps {
  text: string;
  buttonName?: string;
  mode?: string;
  okFunction: () => void;
}
// text : 안에 내용
// buttonName: button 이름 지정
// okFunction: ok를 누를때 실행해야하는 함수
// + mode : mode 에 따라 조건부 디자인

const CustomConfirm: React.FC<CustomConfirmProps> = ({
  text,
  buttonName,
  mode,
  okFunction,
}) => {
  const freezeLayerRef = useRef<HTMLDivElement>(null);
  const dialogContRef = useRef<HTMLDivElement>(null);

  const customConfirm = {
    callback: () => {},

    show: function (callback: () => void) {
      // 버튼 클릭 시
      if (dialogContRef.current) {
        // top: -50% -> 50%
        dialogContRef.current.style.top = "50%";
        // opacity: 0 -> 1
        dialogContRef.current.style.opacity = "1";
        // handleClick 할당
        this.callback = callback;
        // confirm 뒤에 배경 display:none -> display:black
        if (freezeLayerRef.current) {
          freezeLayerRef.current.style.display = "block";
        }
      }
    },

    okay: () => {
      // handleClick 시
      if (customConfirm.callback) {
        customConfirm.callback();
      }
      customConfirm.close();
    },

    close: () => {
      // 원상 복귀
      if (dialogContRef.current) {
        dialogContRef.current.style.top = "-50%";
        dialogContRef.current.style.opacity = "0";
        if (freezeLayerRef.current) {
          freezeLayerRef.current.style.display = "none";
        }
      }
    },
  };

  const handleClick = () => {
    okFunction();
  };

  return (
    <div>
      <div
        ref={freezeLayerRef}
        className="w-full h-full top-0 left-0 bg-black/30 z-[1] hidden absolute"
      ></div>

      {/* mode가 myBookmarks(마이페이지 찜한 action) 인 경우에 버튼 대신 북마크아이콘 */}
      {mode === "myBookmarks" ? (
        <button onClick={() => customConfirm.show(handleClick)}>
          <Image
            src={bookmarkFill}
            alt="북마크"
            className="w-[15px] h-[14px] mt-[3px] mr-[11px] "
          />
        </button>
      ) : (
        <Button
          color="primary"
          variant="ghost"
          onClick={() => {
            customConfirm.show(handleClick);
          }}
        >
          {buttonName}
        </Button>
      )}

      <div
        ref={dialogContRef}
        className="absolute top-[-50%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-[10px] w-full transition-all z-[2] opacity-0"
      >
        <div className="p-[10px] py-[50px] leading-7 bg-[#f5f5f2] text-center rounded-xl mb-[-20px]">
          {text}
        </div>
        <div className="text-center bg-[#f5f5f2] flex flex-row gap-3 justify-center py-5 rounded-xl">
          <Button
            onClick={customConfirm.okay}
            className="inline-block w-[100px] py-[5px]  cursor-pointer border border-[#999] bg-white hover:bg-[#f1f1f1]"
          >
            네
          </Button>
          <Button
            onClick={customConfirm.close}
            className="inline-block w-[100px] py-[5px]  cursor-pointer border border-[#999] bg-white hover:bg-[#f1f1f1]"
          >
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
