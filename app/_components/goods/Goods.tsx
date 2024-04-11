"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";
import ProductInfoModal from "./ProductInfoModal";
import { useGoods } from "@/app/_hooks/useQueries/goods";

const Goods = () => {
  const { data: goods, isLoading, isError } = useGoods();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  if (isError) return <div>Error fetching goods...</div>;

  return (
    <div className="border-2 border-blue-400 mt-[160px]">
      <div className="border-2">
        <div className="gap-[23px] grid grid-cols-5 md:grid-cols-5">
          {goods?.map((item) => {
            return (
              <div>
                <img
                  alt="Card background"
                  className="rounded-2xl h-[494px]"
                  src={item.img_url}
                />
                <div className="flex justify-between mt-[28px] mx-[33px]">
                  <div className="text-[15px] ">
                    <p>{item.product_name}</p>
                    <p className="text-[#929292]">
                      {item.point.toLocaleString()}P
                    </p>
                  </div>
                  <div>
                    <ProductInfoModal item={item} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Goods;
