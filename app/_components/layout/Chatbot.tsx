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
          size: `${isMobile ? 50 : 80}px`,
        },
      }}
    />
  );
};

export default React.memo(Chatbot);
