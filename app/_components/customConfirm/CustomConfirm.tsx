"use client";
import React, { useRef } from "react";

import { Button } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

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
        className="w-full h-full fixed top-0 left-0 bg-black/30 z-[1] hidden"
      ></div>

      {/* mode가 myBookmarks(마이페이지 찜한 action) 인 경우에 버튼 대신 북마크아이콘 */}
      {mode === "myBookmarks" ? (
        <button onClick={() => customConfirm.show(handleClick)}>
          <FaStar className="text-amber-300 text-[17px]  ml-[1.5px] mb-10 " />
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
        className="fixed top-[-50%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-[10px] w-[30%] rounded-xl transition-all z-[2] opacity-0"
      >
        <div className="p-[10px] py-[20px] font-bold bg-[#575757] text-[#f6f7f8]"></div>
        <div className="p-[10px] py-[30px] leading-7 bg-white text-center">
          {text}
        </div>
        <div className="text-center bg-[#f5f5f2] flex flex-row gap-3 justify-center py-5">
          <Button
            color="primary"
            onClick={customConfirm.okay}
            className="inline-block w-[100px] py-[5px]  cursor-pointer"
          >
            네
          </Button>
          <Button
            color="danger"
            onClick={customConfirm.close}
            className="inline-block w-[100px] py-[5px]  cursor-pointer"
          >
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
