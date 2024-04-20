"use client";
import React from "react";
import PageTap from "../_components/individualAction/PageTap";
import TopButton from "../_components/TopButton";

const page = () => {
  return (
    <div>
      <div className=" mx-auto vh-auto">
        <TopButton />
        <PageTap />
      </div>
    </div>
  );
};

export default page;
