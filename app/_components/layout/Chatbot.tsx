"use client";
import { Bubble } from "@typebot.io/nextjs";
import React from "react";

const Chatbot = () => {
  return (
    <Bubble
      typebot="green-action-gvt6uux"
      theme={{ button: { backgroundColor: "#303235" } }}
    />
  );
};

export default React.memo(Chatbot);
