"use client";
import React from "react";

const page = () => {
  return (
    <div className="mt-10 gap-5 grid p-2 desktop:grid-cols-4 laptop:grid-cols-3 desktop:w-[1510px] laptop:w-[920px] mx-auto "></div>
  );
};

export default React.memo(page);

// {[...Array(8)].map((_, index) => (
//   <CommunitySkeleton key={index} />
// ))}
