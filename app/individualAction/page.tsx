"use client";
import React from "react";
import PageTap from "../_components/individualAction/PageTap";
import PageList from "../_components/individualAction/PageList";

const page = () => {
  return (
    <div className="w-[1280px] vh-auto mx-auto bg-black">
      <PageTap />
      <PageList />
    </div>
  );
};

export default page;
