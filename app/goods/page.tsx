import React from "react";
import Goods from "../_components/goods/Goods";

const GoodsPage = () => {
  return (
    <div className="flex flex-col w-[1200px] h-auto mx-auto m-5">
      <h1 className="font-semibold text-6xl">ECO GOODS</h1>
      <Goods />
    </div>
  );
};

export default GoodsPage;
