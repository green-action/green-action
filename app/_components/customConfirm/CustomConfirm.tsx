"use client";
import React, { useRef } from "react";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import bookmarkFill from "/app/_assets/image/logo_icon/icon/mypage/Star 32.png";

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
        className="w-full h-full top-0 left-0 bg-black/30 z-[1] hidden absolute rounded-2xl"
      ></div>

      {/* mode가 myBookmarks(마이페이지 찜한 action) 인 경우에 버튼 대신 북마크아이콘 */}
      {mode === "myBookmarks" ? (
        <button onClick={() => customConfirm.show(handleClick)}>
          <Image
            src={bookmarkFill}
            alt="북마크"
            className="desktop:w-[15px] laptop:w-[14px] desktop:h-[14px] laptop:h-[12px] desktop:mt-[2.6px] laptop:mt-[2.4px] mr-[4.5px] mb-[10px]"
            // laptop:h-[13px] mt-[2px] mr-[4px] mb-[2px]
            // desktop:w-[15px] laptop:w-[14px] desktop:h-[14px] laptop:h-[13px] mt-[2px] mr-[4px] mb-[2px]
          />
        </button>
      ) : (
        mode !== "community" && (
          <Button
            variant="ghost"
            className="text-gray-500 rounded-full !w-[140px] h-[33px] border border-gray-400 bg-[#EFEFEF]"
            onClick={() => {
              customConfirm.show(handleClick);
            }}
          >
            {buttonName}
          </Button>
        )
      )}
      {mode === "community" && (
        <button
          onClick={() => customConfirm.show(handleClick)}
          role="button"
          aria-label="Close"
          className="absolute appearance-none select-none top-1 right-1 p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      )}

      <div
        ref={dialogContRef}
        className="absolute top-[-50%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-[10px] w-full transition-all z-[50] opacity-0"
      >
        <div className="p-[10px] py-[50px] leading-7 bg-[#f5f5f2] text-center rounded-xl mb-[-20px] text-[10.5pt]">
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
