"use client";
import { Button } from "@nextui-org/react";
import React, { useRef } from "react";

interface CustomConfirmProps {
  text: string;
  buttonName: string;
  okFunction: () => void;
}
// text : 안에 내용
// buttonName: button 이름 지정
// okFunction: ok를 누를때 실행해야하는 함수

const CustomConfirm: React.FC<CustomConfirmProps> = ({
  text,
  buttonName,
  okFunction,
}) => {
  const freezeLayerRef = useRef<HTMLDivElement>(null);
  const dialogContRef = useRef<HTMLDivElement>(null);

  const customConfirm = {
    callback: () => {},

    show: function (msg: string, callback: () => void) {
      if (dialogContRef.current) {
        dialogContRef.current.style.top = "50%";
        dialogContRef.current.style.opacity = "1";
        const digBody = dialogContRef.current.querySelector("#digBody");
        if (digBody) {
          digBody.textContent = msg;
        }
        this.callback = callback;
        if (freezeLayerRef.current) {
          freezeLayerRef.current.style.display = "block";
        }
      }
    },

    okay: () => {
      if (customConfirm.callback) {
        customConfirm.callback();
      }
      customConfirm.close();
    },

    close: () => {
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
      <Button
        color="primary"
        variant="ghost"
        onClick={() => {
          customConfirm.show(`${text}`, handleClick);
        }}
      >
        {buttonName}
      </Button>
      <div
        ref={dialogContRef}
        className="absolute top-[-50%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-[10px] w-[30%] rounded-xl transition-all z-[2] opacity-0"
      >
        <div className="p-[10px] py-[20px] font-bold bg-[#575757] text-[#f6f7f8]"></div>
        <div
          id="digBody"
          className="p-[10px] py-[30px] leading-7 bg-white text-center"
        >
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
