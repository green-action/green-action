"use client";
import React from "react";
import PageTap from "../_components/individualAction/PageTap";
import TopButton from "../_components/TopButton";

const page = () => {
  return (
    <div>
      <div className=" mx-auto vh-auto desktop:w-[79%] laptop:w-[92%]">
        <TopButton />
        <PageTap />
      </div>
    </div>
  );
};

export default page;
