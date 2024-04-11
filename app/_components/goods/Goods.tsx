"use client";
import React from "react";
import { useGoods } from "@/app/_hooks/useQueries/goods";
import { CircularProgress } from "@nextui-org/react";
import ProductInfoModal from "./ProductInfoModal";

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
    <div className="desktop:mt-[160px]">
      <div>
        <div className="desktop:gap-[23px] grid desktop:grid-cols-5">
          {goods?.map((item) => {
            return (
              <div>
                <img
                  alt="Card background"
                  className="rounded-2xl desktop:h-[494px]"
                  src={item.img_url}
                />
                <div className="flex justify-between desktop:mt-[28px] desktop:mx-[33px]">
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
