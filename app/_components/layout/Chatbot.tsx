"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { Bubble } from "@typebot.io/nextjs";
import React from "react";

const Chatbot = () => {
  const { isMobile } = useResponsive();
  return (
    <Bubble
      typebot="green-action-gvt6uux"
      theme={{
        button: {
          backgroundColor: "#303235",
          size: `${80}px`,
          // size: `${isMobile ? 40 : 80}px`, mobile size일때 사이즈변화 회의필요
        },
      }}
    />
  );
};

export default React.memo(Chatbot);
